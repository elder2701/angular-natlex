import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: 'date-range-picker.component.html',
  styleUrls: ['date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit {
  range: FormGroup;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Output() getDatesRange = new EventEmitter<any>();

  ngOnInit(): void {
    this.range = new FormGroup({
      start: new FormControl(this.minDate),
      end: new FormControl(this.maxDate),
    });
  }

  closedStreem(): void {
    this.getDatesRange.emit(this.range.value);
  }
}
