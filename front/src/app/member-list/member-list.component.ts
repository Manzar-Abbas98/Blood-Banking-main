import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { Observable, take } from 'rxjs';
import { Pagination } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { MyUser } from '../_models/MyUser';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {

  members: Member[] = [];
  // members$ : Observable<Member[]> | undefined;
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  // user: MyUser | undefined;
  bloodGroupList = [{ value: 'A Positive', display: 'A Positive' }, { value: 'B Positive', display: 'B Positive' }, { value: 'A Negative', display: 'A Negative' }, { value: 'B Negative', display: 'B Negative' }, { value: 'O Negative', display: 'O Negative' }, { value: 'AB Positive', display: 'AB Positive' }, { value: 'AB Negative', display: 'AB Negative' },]


  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }


  ngOnInit(): void {
    // this.loadMembers();
    // this.members$ = this.memberService.getMembers();
    this.loadMembers();
  }

  // loadMembers()
  // {
  //   this.memberService.getMembers().subscribe({
  //     next: members => this.members = members

  //   })
  // }

  loadMembers() {
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }
  }

  resetFilters() {
      this.userParams = this.memberService.resetUserParams();
      this.loadMembers();
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }

}
