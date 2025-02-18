import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href); // Prevents back navigation
    };
  }

  logout() {
    this.router.navigate(['/']).then(() => {
      window.location.reload(); // Ensure user is redirected after logout
    });
  }
}