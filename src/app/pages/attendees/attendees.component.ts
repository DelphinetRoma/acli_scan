import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";

import { VexScrollbarComponent } from "@vex/components/vex-scrollbar/vex-scrollbar.component";

@Component({
  selector: 'attendees',
  standalone: true,
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule, MatPaginatorModule, MatTableModule,
    MatSidenavModule, VexScrollbarComponent
  ],
})
export class AttendeesComponent {

  constructor () {}

  searchAttendees = new UntypedFormControl();
  totalAttendees?: number;

  @ViewChild(MatPaginator,{static: true}) paginator! : MatPaginator;

  pageSubject = new BehaviorSubject<{pageIndex: number; pageSize: number}>({
      pageIndex: 0,
      pageSize: 10,
  });

  changePage(event:any) {
    this.pageSubject.next({
      pageIndex: event.pageIndex + 1,
      pageSize: event.pageSize,
    })
    sessionStorage.setItem("pageAttendees",JSON.stringify(this.pageSubject.value));
  }

  columns: any[] = ["name", "surname"];

  private dataSourceSubj: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  dataSource$: Observable<any[]| any> = this.dataSourceSubj.asObservable();
  attendeesSubscription!: Subscription;

  ngOnInit(): void {
    if(sessionStorage['pageAttendees']){
      this.pageSubject.next({
          pageIndex: JSON.parse(sessionStorage['pageAttendees']).pageIndex,
          pageSize: JSON.parse(sessionStorage['pageAttendees']).pageSize,
      });
    } else {
        this.pageSubject.next({pageIndex: 0, pageSize: this.pageSubject.value.pageSize});
    }
  }

  ngOnDestroy(): void {
    this.attendeesSubscription.unsubscribe();
  }
}
