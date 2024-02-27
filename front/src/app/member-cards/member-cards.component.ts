import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-cards',
  templateUrl: './member-cards.component.html',
  styleUrls: ['./member-cards.component.css'],
})
export class MemberCardsComponent implements OnInit{

  @Input() member : Member | undefined;

  constructor(private memberService : MembersService, private toastr : ToastrService)
  {

  }

  ngOnInit(): void {
    
  }

  addRequest(member : Member)
  {
    this.memberService.addRequest(member.email).subscribe({
      next : () => this.toastr.success('You Have Send Blood Request to '+ member.userName)
    })
  }

}
