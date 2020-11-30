import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cloneDeep } from 'lodash';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  highcharts = Highcharts;
  // can not use Highcharts.Options type,
  // because { name: string; data: number[][]; }[]' is not assignable by Options.SeriesOptionsType
  options: any;
  updateFlag = false;
  checkedToggle = false;

  @Input() data: number[][][];
  @Input() name: string;
  @Input() unit: string;
  @Input() startSeriesDate: number;
  @Input() endSeriesDate: number;
  @Output() closeChart = new EventEmitter<string>();

  chartTypes = ['line', 'bar'];
  selectedType = 'line';

  constructor() {}

  ngOnInit(): void {
    const data = cloneDeep(this.data); // need clone object. otherwise this.option.series will have link on this object
    this.options = {
      series: data.map((item: number[][], index: number) => {
        return {
          name: `${this.name}${index}`,
          data: item,
        };
      }),
      chart: {
        type: this.selectedType,
      },
      title: {
        text: this.name,
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: this.unit,
        },
      },
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
      },

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 600,
            },
            chartOptions: {
              legend: {
                enabled: false,
              },
            },
          },
        ],
      },
    };
  }

  onChangeTypeChart(): void {
    this.options.chart.type = this.selectedType;
    this.updateFlag = true;
  }

  getDatesRange($event: any): void {
    if ($event.start && $event.end) {
      const startDate = new Date($event.start).getTime();
      const endDateWithHours = new Date($event.end).setHours(23);
      const endDateWhithHoursMin = new Date(endDateWithHours).setMinutes(59); // full end date: dd:23:59 value
      const data = cloneDeep(this.data); // need clone object. otherwise this.option.series will have link on this object
      this.options.series = data.map((item: number[][], index: number) => {
        return {
          name: `${this.name}${index}`,
          data: item.filter((pair: number[]) => {
            return pair[0] >= startDate && endDateWhithHoursMin >= pair[0];
          }),
        };
      });
      this.updateFlag = true;
    }
  }

  onClickClose(): void {
    this.closeChart.emit(this.name);
  }

  onChangeModelToggle(): void {
    if (this.checkedToggle) {
      this.selectedType = 'line';
      this.options.chart.type = 'area';
    } else {
      this.options.chart.type = 'line';
    }
    this.updateFlag = true;
  }
}
