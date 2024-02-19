import Typed from 'typed.js';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})


export class HeroComponent implements OnInit {
  ngOnInit(): void {
    const options = {
      strings: [
        'Thalassemia Patient',
        'Cancer Warriors',
        'Critical Needers',
        'Blood Disorder',
      ],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1000,
      showCursor: false,
      loop: true,
    };
    const typed = new Typed('.multiple-text', options);
  }
 
}


