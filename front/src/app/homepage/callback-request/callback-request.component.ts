import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-callback-request',
  templateUrl: './callback-request.component.html',
  styleUrls: ['./callback-request.component.css'],
})
export class CallbackRequestComponent {
  name: string = '';
  email: string = '';
  contactNumber: string = '';

  constructor(private http: HttpClient) {}

  submitForm(): void {
   
    const formData = {
      name: this.name,
      email: this.email,
      contactNumber: this.contactNumber,
    };
  
    // Send form data to backend API
    this.http.post<any>('BACKEND_API_ENDPOINT', formData).subscribe(
      (response) => {
        // Handle success response
        console.log('submitted successfully!', response);
      },
      (error) => {
        // Handle error response
        console.error('Error', error);
      }
    );
  }
}
