import { Component, OnInit } from '@angular/core';
import { DashboardService, SensorsData } from '../dasboard.service';
import { MatDialog } from '@angular/material/dialog';
import {
  ChartSensorData,
  CreateChartDialogComponent,
} from '../create-chart-dialog/create-chart-dialog.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  data: Array<SensorsData> = [];
  idxGenerate = 0; // index for generate unique chart id

  constructor(
    private dashBoardService: DashboardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.data = this.dashBoardService.getData();
  }

  onClickAddChart(): void {
    const dialogRef = this.dialog.open(CreateChartDialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: ChartSensorData) => {
      if (!result) {
        return; // if cancel btn was clicked or outside dialog click
      }
      this.data = this.dashBoardService.generateSeriesChartData(
        result.name,
        result.count
      );
    });
  }

  onDeleteSeries($event: string): void {
    this.data = this.dashBoardService.deleteSeries($event);
  }
}
