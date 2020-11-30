import { Component, OnInit } from '@angular/core';
import { ListData, ListService } from '../list.sevice';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  constructor(private listService: ListService) {}
  data: ListData[] = [];
  currentImg = '';
  currentInfo = '';

  ngOnInit(): void {
    this.listService.getData().subscribe((data: ListData[]) => {
      this.data = data;
    });
  }

  getIdToShowInfo(obj: {title: string, url: string}): void {
    this.currentImg = obj.url;
    this.currentInfo = obj.title;
  }
}
