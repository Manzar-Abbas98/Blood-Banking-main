import { Component, Input } from '@angular/core';
import { Member } from '../_models/member';

@Component({
  selector: 'app-member-cards',
  templateUrl: './member-cards.component.html',
  styleUrls: ['./member-cards.component.css'],
})
export class MemberCardsComponent {

  @Input() member : Member | undefined;

}
