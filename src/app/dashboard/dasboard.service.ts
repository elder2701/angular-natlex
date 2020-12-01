import { Injectable } from '@angular/core';

export interface SensorsData {
  name: string;
  unit: string;
  series: number[][][];
  startSeriesDate: Date;
  endSeriesDate: Date;
}

@Injectable()
export class DashboardService {

  data: SensorsData[] = [];
  seriesIndex = 0;

  /*Generate Data common functions*/
  generateRandomNumber(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  generateDataWithDates(countData: number, datesSet: number[]): number[][] {
    const dataSet = this.generateRandomData(countData);
    const commonData: number[][] = [];
    for (let i = 0; i < countData; i++) {
      commonData.push([datesSet[i], dataSet[i]]);
    }
    return commonData;
  }

  generateRandomData(countData: number): number[] {
    const dataset: number[] = [];
    for (let i = 0; i < countData; i++) {
      dataset.push(this.generateRandomNumber(100));
    }
    return dataset;
  }

  generateRandomDates(countData: number): number[] {
    const randomNumberDay = this.generateRandomNumber(10);
    let date = new Date().setDate(randomNumberDay);
    const dateSet: number[] = [];
    dateSet.push(date);
    for (let i = 0; i < countData - 1; i++) {
      date += 86400000; // step is one day;
      dateSet.push(date);
    }
    return dateSet;
  }

  generateCountSensorsData(
    countSensor: number,
    countData: number
  ): number[][][] {
    const datesSet = this.generateRandomDates(countData);
    const series: number[][][] = [];
    for (let i = 0; i < countSensor; i++) {
      series.push(this.generateDataWithDates(countData, datesSet));
    }
    return series;
  }
  /**/

  generateSeriesChartData(sensorType: string, countSensors: number): SensorsData[] {
    const generateData = this.generateCountSensorsData(countSensors, 8);
    const startSeriesDate = new Date(generateData[0][0][0]);
    const endSeriesDate = new Date(
      generateData[0][generateData[0].length - 1][0]
    );
    this.data.push({
      name: `Series-${sensorType}-${this.seriesIndex}`,
      unit: sensorType,
      series: generateData,
      startSeriesDate,
      endSeriesDate,
    })
    this.seriesIndex++;
    return this.data;
  }

  deleteSeries(name: string): SensorsData[] {
    this.data = this.data.filter(
      (item: SensorsData) => item.name !== name
    );
    return this.data;
  }

  getData(): SensorsData[] {
    return this.data;
  }

}
