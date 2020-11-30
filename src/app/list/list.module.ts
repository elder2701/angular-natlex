import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ListService } from './list.sevice';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ListPageComponent } from './list-page/list-page.component';
import { SingleSelectionListComponent } from './single-selection-list/single-selection-list.component';
import { ListItemInfoComponent } from './list-item-info/list-item-info.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
  ],
  declarations: [
    ListPageComponent,
    SingleSelectionListComponent,
    ListItemInfoComponent,
  ],
  providers: [ListService],
})
export class ListModule {}
