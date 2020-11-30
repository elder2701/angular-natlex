import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListData } from '../list.sevice';

@Component({
  selector: 'app-single-selection-list',
  templateUrl: './single-selection-list.component.html',
  styleUrls: ['./single-selection-list.component.scss'],
})
export class SingleSelectionListComponent {
  @Input() data: ListData[];
  @Output() getId = new EventEmitter<{ title: string; url: string }>();

  getIdFromList($event: any): void {
    const { title, url } = $event.options[0].value;
    this.getId.emit({ title, url });
  }
}
