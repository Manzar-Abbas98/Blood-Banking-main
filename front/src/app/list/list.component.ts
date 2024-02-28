import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { Pagination } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  members : Member[] | undefined;
  predicate = 'liked';
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;


  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadRequest();
  }

  loadRequest()
  {
    this.memberService.getRequest(this.predicate).subscribe({
      next : response => {
        this.members = response
      }
    })
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }

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

}
