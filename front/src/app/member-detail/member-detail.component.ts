import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent {

  member: Member | undefined;

  constructor(private memberService: MembersService, private route: ActivatedRoute){}


  ngOnInit() : void{
    this.loadMember();
  }

  loadMember()
  {
    var email = this.route.snapshot.paramMap.get('email');
    if(!email) return;

    this.memberService.getMember(email).subscribe({
      next: member => this.member = member
    })
  }

}
