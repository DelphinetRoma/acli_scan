import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AttendeeService } from 'src/app/services/attendee.service';

import { scaleFadeIn400ms } from "@vex/animations/scale-fade-in.animation";

@Component({
  standalone: true,
  selector: 'scan',
  imports: [
    CommonModule,
    MatSnackBarModule, MatButtonModule, MatProgressSpinnerModule,
    ZXingScannerModule
  ],
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
  animations: [scaleFadeIn400ms]
})
export class ScanComponent {

  constructor (
    private _snackBar: MatSnackBar,
    private _attendeeService: AttendeeService
  ) {}

  scanning: boolean = false;
  scanned: boolean = false;
  scannerEnabled: boolean = true;

  attendee: any;
  attendeeHash: string = "";
  attendeeOK: boolean = false;

  logType: number = 0;

  scanSuccessHandler(event:any) {
    // console.log('success', event);
  }

  scanErrorHandler(event:any) {
    // console.log('error', event);
  }

  scanCompleteHandler(event:any) {

    this.attendeeHash = "";

    if (event) {
      // console.log('complete', event);

      this.scanning = true;

      const hash = event.text;
      //const hash = "bacc29bae59aa76b22e04a6496ccc06eaa8b44bf09bd27d313e9f4a90b3673a5";

      this.scannerEnabled = false;
  
      this._attendeeService.geState(hash).subscribe(
        (state) => {

          switch(state.code) {
            case 200:
              this.attendee = state.response.name+" "+state.response.surname;
              this.attendeeHash = hash;
              this.attendeeOK = true;
              this.logType = state.response.state;
              break;
            case 401:
              // const errorSnackBar = this._snackBar.open("Utente non trovato", "Chiudi", {
              //   duration: 5000,
              //   panelClass: "snackbar-danger",
              //   horizontalPosition: "center",
              // });

              // errorSnackBar.onAction().subscribe(() => {
              //   this.scannerEnabled = true;
              // });
              break;
          }

          this.scanning = false;
          this.scanned = true;
        }
      );
    }
  }

  nextScan() {
    // Save Scanning POST
    // chiamata API scrittura tipologia ultima scansione
    // OK -> riabilita scanner

    const hash = this.attendeeHash;

    this._attendeeService.saveScanning(hash).subscribe(
      (scanning:any) => {
        switch(scanning.code) {
          case 200:

            this.attendee = "";
            this.attendeeHash = "";
            this.attendeeOK = false;

            break;
          case 401:
            // const errorSnackBar = this._snackBar.open("Utente non trovato", "Chiudi", {
            //   duration: 5000,
            //   panelClass: "snackbar-danger",
            //   horizontalPosition: "center",
            // });

            // errorSnackBar.onAction().subscribe(() => {
            //   this.scannerEnabled = true;
            // });
            break;
        }

        this.scanned = false;
        this.scannerEnabled = true;
      }
    );
  }
}
