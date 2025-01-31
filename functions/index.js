const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendAdminNotification = functions.firestore
    .document("mockup/{mockupId}")
    .onCreate(async (snap, context) => {
      const data = snap.data();
      const adminTokensRef = admin.firestore().collection("admins");
      const adminTokensSnapshot = await adminTokensRef.get();

      // Extract tokens, filtering out empty ones
      const adminTokens = adminTokensSnapshot.docs
          .map((doc) => doc.data().token)
          .filter((token) => token);

      if (adminTokens.length === 0) {
        console.warn("No admin tokens found, skipping notification.");
        return null; // Return null to properly end the function
      }

      const message = {
        notification: {
          title: "New Mockup Submission",
          body: `A new mockup has been submitted by ${data.from_name}`,
        },
      };

      try {
        // Firebase limits to 500 tokens per `sendMulticast` request
        const chunkSize = 500;
        for (let i = 0; i < adminTokens.length; i += chunkSize) {
          const tokenChunk = adminTokens.slice(i, i + chunkSize);
          const response = await admin.messaging().sendMulticast({
            ...message,
            tokens: tokenChunk,
          });

          console.log(
              `Notifications sent to ${tokenChunk.length} admins.`,
          );

          // Identify and remove invalid tokens
          const failedTokens = response.responses
              .map((res, idx) => (!res.success ? tokenChunk[idx] : null))
              .filter(Boolean); // Remove null values

          if (failedTokens.length > 0) {
            console.warn(
                `Removing ${failedTokens.length} invlid token ...`,
            );

            const batch = admin.firestore().batch();
            const invalidDocs = await adminTokensRef
                .where("token", "in", failedTokens)
                .get();

            invalidDocs.forEach((doc) => batch.delete(doc.ref));

            await batch.commit();
            console.log("Invalid tokens removed from Firestore.");
          }
        }
        return null; // End function after successfully processing
      } catch (error) {
        console.error("Error sending admin notification:", error);
        return null; // Ensure function exits after error
      }
    });
