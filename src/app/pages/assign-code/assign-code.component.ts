import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AttendeeService } from 'src/app/services/attendee.service';

import { NumberRestricDirective } from "src/app/directives/number-restrict.directive";

import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from "@vex/animations/scale-fade-in.animation";

@Component({
  selector: 'assign-code',
  templateUrl: './assign-code.component.html',
  styleUrls: ['./assign-code.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NumberRestricDirective
  ],
  animations: [fadeInUp400ms,scaleFadeIn400ms],
})
export class AssignCodeComponent {

  constructor (
    private _snackBar: MatSnackBar,
    private _attendeeService: AttendeeService
  ) {}

  searchAttendeeControl = new UntypedFormControl();

  arrAttendees: any[] = [];

  get loadingAttendees$(): Observable<boolean> {
    return this._attendeeService.searchAttendeeLoading$;
  }

  searchable:boolean = false;
  searched:boolean = false;

  checkSearchValue() {
    if (!this.searchAttendeeControl.value) {
      this.arrAttendees = [];
      this.searched = false;
      this.searchable = false;
    } else {
      if (this.searchAttendeeControl.value.length >= 3) {
        this.searchable = true;
      } else {
        this.searchable = false;
      }
    }
  }

  searchAttendee() {
    if (this.searchAttendeeControl.value.length >= 3) {

      this.searched = true;
      
      const search = this.searchAttendeeControl.value;
      
      this._attendeeService.getAttendee(search).subscribe(
        (results:any) => {
          console.log(results);
          switch (results.code) {
            case 200:
              this.arrAttendees = results.response;
              break;
              default:
                this._snackBar.open("Ops, qualocsa è andato storto", "Chiudi", {
                  duration: 3000,
                  panelClass: "snackbar-warning",
                  horizontalPosition: "center",
                });
                break;    
            }
          }
        );
    }
  }

}
