import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements AfterViewInit {
  images = [
    { src: '/designs/Decks.png', alt: 'Project 1' },
    { src: '/designs/acAndHeating.jpg', alt: 'Project 2' },
    { src: '/designs/bathroom.png', alt: 'Project 3' },
    { src: '/designs/Electrician.jpg', alt: 'Project 4' },
    { src: '/designs/Fencing.jpg', alt: 'Project 5' },
    { src: '/designs/Flooring.jpg', alt: 'Project 6' },
    { src: '/designs/garageDoors.jpg', alt: 'Project 7' },
    { src: '/designs/Kitchen.jpg', alt: 'Project 8' },
    { src: '/designs/lawnMover.png', alt: 'Project 9' },
    { src: '/designs/pest.jpg', alt: 'Project 10' },
    { src: '/designs/Plumbing.jpg', alt: 'Project 11' },
    { src: '/designs/roofing.png', alt: 'Project 12' },
  ];

  selectedImage: { src: string; alt: string } | null = null;
  isModalOpen = false;
  zoomLevel = 1;
  zoomStep = 0.2;
  maxZoomLevel = 4;
  minZoomLevel = 1;
  isDragging = false;
  initialMousePosition = { x: 0, y: 0 };
  imagePosition = { x: 0, y: 0 };
  zoomOrigin = { x: 50, y: 50 }; // Default zoom origin (center of the image)

  ngAfterViewInit(): void {
    this.lazyLoadImages(); // Lazy load images after the view is initialized
  }

  // Lazy loading functionality
  lazyLoadImages(): void {
    const images = document.querySelectorAll('img.lazy-image');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.getAttribute('data-src')!;
          observer.unobserve(img); // Stop observing once the image has been loaded
        }
      });
    });

    images.forEach((img) => {
      observer.observe(img); // Start observing each image
    });
  }

  // Open modal functionality
  openModal(image: { src: string; alt: string }): void {
    this.selectedImage = image;
    this.isModalOpen = true;
    this.zoomLevel = 1;
    this.imagePosition = { x: 0, y: 0 };
    this.zoomOrigin = { x: 50, y: 50 }; // Reset to the center zoom origin
  }

  // Close modal functionality
  closeModal(): void {
    this.selectedImage = null;
    this.isModalOpen = false;
  }

// Handle double-click to zoom
zoomOnDoubleClick(event: MouseEvent): void {
  // // Calculate the mouse position relative to the image
  // const imageElement = event.target as HTMLImageElement;
  // const rect = imageElement.getBoundingClientRect();
  // const offsetX = event.clientX - rect.left;
  // const offsetY = event.clientY - rect.top;

  // // Toggle zoom level
  // if (this.zoomLevel === 1) {
  //   this.zoomLevel = 2; // Zoom in
  // } else {
  //   this.zoomLevel = 1; // Zoom out
  // }

  // // Set the transform origin to the click position (center the zoom on the click location)
  // this.zoomOrigin = {
  //   x: (offsetX / rect.width) * 100,
  //   y: (offsetY / rect.height) * 100,
  // };

  // this.updateZoom();
}

// Get style for the image wrapper for dynamic adjustments
getImageStyle() {
  return {
    transform: `translate(${this.imagePosition.x}px, ${this.imagePosition.y}px) scale(${this.zoomLevel})`,
    transformOrigin: `${this.zoomOrigin.x}% ${this.zoomOrigin.y}%`, // Adjust transform-origin dynamically
  };
}

// Handle image drag functionality
onMouseDown(event: MouseEvent): void {
  if (this.zoomLevel > 1) {  // Allow drag only when zoomed in
    this.isDragging = true;
    this.initialMousePosition = { x: event.clientX, y: event.clientY };
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }
}

// Handle mousemove event for dragging
onMouseMove(event: MouseEvent): void {
  if (this.isDragging && this.selectedImage) {
    const deltaX = event.clientX - this.initialMousePosition.x;
    const deltaY = event.clientY - this.initialMousePosition.y;

    const imageElement = document.querySelector('.modal-image') as HTMLImageElement;
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();

      // Calculate boundaries for dragging, taking zoom into account
      const maxOffsetX = (rect.width * this.zoomLevel - rect.width) / 2;
      const maxOffsetY = (rect.height * this.zoomLevel - rect.height) / 2;

      // Update image position within boundaries
      this.imagePosition.x = Math.max(-maxOffsetX, Math.min(maxOffsetX, this.imagePosition.x + deltaX));
      this.imagePosition.y = Math.max(-maxOffsetY, Math.min(maxOffsetY, this.imagePosition.y + deltaY));

      this.initialMousePosition = { x: event.clientX, y: event.clientY };
    }
  }
}

  
  // Stop dragging when mouse is released
  onMouseUp(): void {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  // Download image functionality
  downloadImage(): void {
    if (this.selectedImage) {
      const link = document.createElement('a');
      link.href = this.selectedImage.src;
      link.download = this.selectedImage.alt;
      link.click();
    }
  }

  // Handle image error (fallback image)
  handleImageError(image: { src: string; alt: string }): void {
    image.src = '/path/to/default-image.jpg'; // Handle image error
    console.warn(`Image failed to load: ${image.alt}`);
  }

  preventContextMenu(event: MouseEvent): void {
    event.preventDefault();
  }

  nextImage(): void {
    // const currentIndex = this.images.findIndex((img) => img.src === this.selectedImage?.src);
    // const nextIndex = (currentIndex + 1) % this.images.length; // Loop back to the first image
    // this.selectedImage = this.images[nextIndex];
    // this.resetZoom(); // Reset zoom and position
  }
  
  // Navigate to previous image
  previousImage(): void {
    // const currentIndex = this.images.findIndex((img) => img.src === this.selectedImage?.src);
    // const prevIndex = (currentIndex - 1 + this.images.length) % this.images.length; // Loop back to the last image
    // this.selectedImage = this.images[prevIndex];
    // this.resetZoom(); // Reset zoom and position
  }

  resetZoom(): void {
    this.zoomLevel = 1;
    this.imagePosition = { x: 0, y: 0 };
    this.zoomOrigin = { x: 50, y: 50 }; // Reset to center
    const imageElement = document.querySelector('.modal-image') as HTMLImageElement;
    if (imageElement) {
      imageElement.style.setProperty('--zoom-level', '1');
      imageElement.classList.remove('zoomed'); // Remove zoomed class
      imageElement.style.transform = 'translate(0, 0) scale(1)';
    }
  }

  updateZoom(): void {
    const imageElement = document.querySelector('.modal-image') as HTMLImageElement;
    if (imageElement) {
      // Update the zoom level using the style property
      imageElement.style.transform = `translate(-50%, -50%) scale(${this.zoomLevel})`;
      imageElement.style.transition = 'transform 0.1s ease-in-out'; // Smooth zoom effect
    }
  }
  
  
}
