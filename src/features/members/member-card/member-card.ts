import { Component, input } from '@angular/core';
import { member } from '../../../types/member';
import { RouterLink } from "@angular/router";
import { PipeagePipe } from '../../../app/src/core/pipeage-pipe';


@Component({
  selector: 'app-member-card',
  imports: [RouterLink,PipeagePipe],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})
export class MemberCard {
  member = input.required<member>();
}
