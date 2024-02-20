import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css'],
})
export class DonorsComponent {
  httpClient = inject(HttpClient);
  donors: any[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
      .get('http://localhost:3000/donors')
      .subscribe((donors: any) => {
        console.log(donors);
        this.donors = donors;
      });
  }
}
