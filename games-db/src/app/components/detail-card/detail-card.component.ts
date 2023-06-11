import { Component, Input } from '@angular/core';
import { DetailCard } from 'src/app/models/detail-card';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss'],
})
export class DetailCardComponent {
  @Input() detail!: DetailCard;
}
