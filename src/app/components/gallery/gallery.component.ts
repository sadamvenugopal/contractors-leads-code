import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';

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

  // Zoom-in functionality
  zoomIn(): void {
    if (this.zoomLevel < this.maxZoomLevel) {
      this.zoomLevel += this.zoomStep;
      this.updateZoom();
    }
  }

  // Zoom-out functionality
  zoomOut(): void {
    if (this.zoomLevel > this.minZoomLevel) {
      this.zoomLevel -= this.zoomStep;
      this.updateZoom();
    }
  }

  // Reset zoom functionality
  resetZoom(): void {
    this.zoomLevel = 1;
    this.imagePosition = { x: 0, y: 0 }; // Reset position when zoom resets
    this.updateZoom();
  }

  updateZoom(): void {
    const imageElement = document.querySelector('.modal-image') as HTMLImageElement;
    imageElement.style.setProperty('--zoom-level', this.zoomLevel.toString());
    imageElement.classList.add('zoomed');
  }

  // Open modal functionality
  openModal(image: { src: string; alt: string }): void {
    this.selectedImage = image;
    this.isModalOpen = true;
    this.zoomLevel = 1;
    this.imagePosition = { x: 0, y: 0 };
  }

  // Close modal functionality
  closeModal(): void {
    this.selectedImage = null;
    this.isModalOpen = false;
  }

  // Get style for the image wrapper for dynamic adjustments
  getImageStyle() {
    return {
      transform: `translate(${this.imagePosition.x}px, ${this.imagePosition.y}px) scale(${this.zoomLevel})`
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
    if (this.isDragging) {
      const deltaX = event.clientX - this.initialMousePosition.x;
      const deltaY = event.clientY - this.initialMousePosition.y;

      this.imagePosition.x += deltaX;
      this.imagePosition.y += deltaY;

      this.initialMousePosition = { x: event.clientX, y: event.clientY };
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
}
