import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../_services/user.service';
import { CoreService } from '../_services/core.service';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'age',
    'gender',
    'Bloodtype',
    'city',
    'contact',
    'area',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: UserService,
    private _coreService: CoreService,
    private _accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDonorList();
  }

  openAddEditForm() {
    const dialogRef = this._dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDonorList();
        }
      },
    });
  }

  getDonorList() {
    this._empService.getUserList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteDonor(id: number) {
    this._empService.deleteUser(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('User  Successfully  deleted!', 'done');
        this.getDonorList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDonorList();
        }
      },
    });
  }
  logout() {
    console.log('Admin Successfully log out ');
    this.router.navigate(['/homepage']);
  }
}
