import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent {
  packages = [
    {
      title: 'Start Up Website Package',
      price: '$199',
      period: '/month',
      description: 'Description for startup package',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
        'Feature 6',
        'Feature 7',
        'Feature 8',
        'Feature 9',
        'Feature 10',
        'Feature 11',
        'Feature 12',
        'Feature 13',
        'Feature 14',
        'Feature 15',
      ],
    },
    {
      title: 'Professional Website Package',
      price: '$399',
      period: '/month',

      description: 'Description for professional package',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
        'Feature 6',
        'Feature 7',
        'Feature 8',
        'Feature 9',
        'Feature 10',
        'Feature 11',
        'Feature 12',
        'Feature 13',
        'Feature 14',
        'Feature 15',
      ],
    },
    {
      title: 'Business Pro Website Package',
      price: '$949',
      period: '/month',
      description: 'Description for business pro package',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
        'Feature 6',
        'Feature 7',
        'Feature 8',
        'Feature 9',
        'Feature 10',
        'Feature 11',
        'Feature 12',
        'Feature 13',
        'Feature 14',
        'Feature 15',
      ],
    },
    {
      title: 'Ecommerce Website Package',
      price: '$1299',
      period: '/month',
      description: 'Description for ecommerce package',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
        'Feature 6',
        'Feature 7',
        'Feature 8',
        'Feature 9',
        'Feature 10',
        'Feature 11',
        'Feature 12',
        'Feature 13',
        'Feature 14',
        'Feature 15',
      ],
    },
    {
      title: 'Pro Ecommerce Website Package',
      price: '$1549',
      period: '/month',
      description: 'Description for pro ecommerce package',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
        'Feature 6',
        'Feature 7',
        'Feature 8',
        'Feature 9',
        'Feature 10',
        'Feature 11',
        'Feature 12',
        'Feature 13',
        'Feature 14',
        'Feature 15',
      ],
    },
    {
      title: 'Silver Website Package',
      price: '$1599',
      period: '/month',
      description: 'Description for silver package',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
        'Feature 6',
        'Feature 7',
        'Feature 8',
        'Feature 9',
        'Feature 10',
        'Feature 11',
        'Feature 12',
        'Feature 13',
        'Feature 14',
        'Feature 15',
      ],
    },
    {
      title: 'Interactive Web Portal',
      price: '$4999',
      period: '/month',
      description: 'Description for interactive web portal',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
        'Feature 6',
        'Feature 7',
        'Feature 8',
        'Feature 9',
        'Feature 10',
        'Feature 11',
        'Feature 12',
        'Feature 13',
        'Feature 14',
        'Feature 15',
      ],
    },
    {
      title: 'Interactive E-Commerce',
      price: '$6999',
      period: '/month',
      description: 'Description for interactive e-commerce',
      features: [
       'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
        'Feature 6',
        'Feature 7',
        'Feature 8',
        'Feature 9',
        'Feature 10',
        'Feature 11',
        'Feature 12',
        'Feature 13',
        'Feature 14',
        'Feature 15',
      ],
    },
  ];
}
