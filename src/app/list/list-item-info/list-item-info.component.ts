import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item-info',
  templateUrl: './list-item-info.component.html',
  styleUrls: ['./list-item-info.component.scss'],
})
export class ListItemInfoComponent {
  @Input() img: string;
  @Input() info: string;
}