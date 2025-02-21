import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; // ✅ Import saveAs

@Component({
  selector: 'app-clientform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientform.component.html',
  styleUrl: './clientform.component.css'
})
export class ClientformComponent {
  clientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      businessName: ['', Validators.required],
      businessDescription: ['', Validators.required],
      targetAudience: ['', Validators.required],
      mainGoal: ['', Validators.required],
      sellProducts: ['', Validators.required],
      visitorActions: [''],
      brandStyle: [''],
      preferredWebsites: [''],
      designPreferences: [''],
      layout: ['Single Page'],
      contentType: ['', Validators.required],
      contentReady: ['', Validators.required],
      contentHelp: ['', Validators.required],
      highQualityImages: ['', Validators.required],
      requiredFeatures: [''],
      integrationsNeeded: [''],
      specialFunctionality: ['No'],
      seoOptimization: ['No'],
      googleAnalytics: ['No'],
      domainName: ['No'],
      hostingRecommendations: ['No'],
      preferredCMS: [''],
      timeline: ['', Validators.required],
      budget: ['', Validators.required],
      ongoingMaintenance: ['No'],
      futureUpdates: ['No'],
      competitors: [''],
      differentiation: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      console.log('✅ Form Data:', this.clientForm.value);
      this.exportToExcel();
    } else {
      alert("Please fill all required fields.");
    }
  }

  exportToExcel() {
    const formData = [this.clientForm.value];
    const worksheet = XLSX.utils.json_to_sheet(formData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Client Data');

    // ✅ Generate and Download Excel File
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(data, `ClientData_${new Date().toISOString()}.xlsx`);
  }
}
