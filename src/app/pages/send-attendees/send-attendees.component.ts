import { Component } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { AttendeeService } from 'src/app/services/attendee.service';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '@vex/animations/scale-fade-in.animation';

@Component({
  selector: 'acli-scan-send-attendees',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatButtonModule, MatSnackBarModule, MatProgressSpinnerModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  templateUrl: './send-attendees.component.html',
  styleUrls: ['./send-attendees.component.scss'],
  providers: [
    provideNgxMask()
  ],
  animations: [fadeInUp400ms,scaleFadeIn400ms],
})
export class SendAttendeesComponent {

  constructor (
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _attendeeService: AttendeeService
  ) {}

  sendAttendeesForm = this._formBuilder.group({
    date: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required])
  });

  get loadingAttendees$(): Observable<boolean> {
    return this._attendeeService.searchAttendeeByDatetimeLoading$;
  }

  arrAttendees: any[] = [];

  searched:boolean = false;

  searchAttendeesByDatetime(formData:any) {
    this.sendAttendeesForm.markAllAsTouched();

    if (this.sendAttendeesForm.valid) {
      
      this.searched = true;
      this.arrAttendees = [];

      let dateTime = formatDate(formData.date, "yyyy-MM-dd", "it").toString()+" "+formData.time+":00";

      this._attendeeService.searchAttendeesByDatetime(dateTime).subscribe(
        (attendees:any) => {
          switch (attendees.code) {
            case 200:
              this.arrAttendees = attendees.response;
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
    } else {
      this._snackBar.open("Compila tutti i campi obbligatori", "Chiudi", {
        duration: 3000,
        panelClass: "snackbar-danger",
        horizontalPosition: "center"
      });
    }
  }

  downloadAttendeesList() {}

}
