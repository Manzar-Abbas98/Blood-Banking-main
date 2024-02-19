import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/_services/core.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  donorsForm: FormGroup;

  Bloodtype: string[] = ['A+', 'B+', 'A-', 'O+', 'O-'];

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.donorsForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      Bloodtype: '',
      company: '',
      city: '',
      contact: '',
      area: '',
    });
  }

  ngOnInit(): void {
    this.donorsForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.donorsForm.valid) {
      if (this.data) {
        this._userService
          .updateUser(this.data.id, this.donorsForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('User Successfully updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._userService.addUser(this.donorsForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('User added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
