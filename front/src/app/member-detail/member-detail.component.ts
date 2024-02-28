import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageService } from '../_services/message.service';
import { Message } from '../_models/message';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent {
  @ViewChild('memberTabs', {static: true}) memberTabs? : TabsetComponent;
  activeTab?: TabDirective;
  messages: Message[] = [];

  member: Member = {} as Member;

  constructor(private memberService: MembersService, private route: ActivatedRoute, private messageService: MessageService, private toastr: ToastrService){}


  ngOnInit() : void{
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })
  }

  onTabActivated(data: TabDirective)
  {
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages')
    {
      this.loadMessages();
    }
  }

  loadMessages()
  {
    if(this.member)
    {
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: message => this.messages = message
      })
    }
  }

  addRequest(member : Member)
  {
    this.memberService.addRequest(member.email).subscribe({
      next : () => this.toastr.success('You Have Send Blood Request to '+ member.userName)
    })
  }

  // loadMember()
  // {
  //   var email = this.route.snapshot.paramMap.get('email');
  //   if(!email) return;

  //   this.memberService.getMember(email).subscribe({
  //     next: member => {
  //       this.member = member
  //     }
  //   })
  // }

  selectTab(heading: string)
  {
    if(this.memberTabs)
    {
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

}
