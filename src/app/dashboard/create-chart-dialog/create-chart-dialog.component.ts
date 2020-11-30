import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export interface ChartSensorData {
  name: string;
  count: number;
}

@Component({
  selector: 'app-create-chart-dialog',
  templateUrl: './create-chart-dialog.component.html',
  styleUrls: ['./create-chart-dialog.component.scss'],
})
export class CreateChartDialogComponent {
  count = new FormControl(1, [
    Validators.required,
    Validators.min(1),
    Validators.max(4),
  ]);

  name = 'temperature';

  constructor(public dialogRef: MatDialogRef<CreateChartDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDataModel(): ChartSensorData {
    return {
      name: this.name,
      count: this.count.value,
    };
  }

  getErrorCountMessage(): string {
    if (this.count.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.count.hasError('min')) {
      return 'Value must be more than 0';
    }
    if (this.count.hasError('max')) {
      return 'Value must be less than 5';
    }
    return '';
  }
}
