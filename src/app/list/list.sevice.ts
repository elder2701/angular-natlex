import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ListData {
  id: number;
  title: string;
  url: string;
}

@Injectable()
export class ListService {
  constructor(private http: HttpClient) {}

  data: ListData[] = [];

  getData(): Observable<ListData[]> {
    return this.http.get<ListData[]>(
      'https://jsonplaceholder.typicode.com/albums/1/photos?_limit=10'
    );
  }
}
