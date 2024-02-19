import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @ViewChild('navLinks') navLinksRef!: ElementRef;




  public isSidebarOpen = false;
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
