import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  menuItems = [
    {
      name: 'Home',
    },
    {
      name: 'Gallery',
    },
    {
      name: 'About Us',
    },
    {
      name: 'Contact Us',
    },
  ];
}
