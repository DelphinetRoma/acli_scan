import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AttendeeService } from 'src/app/services/attendee.service';

@Component({
  selector: 'scan',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent {

  constructor(
    private _attendeeService: AttendeeService
  ) {}

  scannerEnabled: boolean = true;

  response: any;
  logType: number = 0;

  scanSuccessHandler(event:any) {
    console.log('success', event);
    
    this.scannerEnabled = false;

    this._attendeeService.geState(event).subscribe(
      (state) => {
        switch(state.code) {
          case 200:
            this.logType = state.response[0].state;
            this.response = "Benvenuto "+state.response[0].name+" "+state.response[0].surname;
            break;
          case 401:
            alert('User not found!');
            break;
        }
      }
    );
  }

  scanErrorHandler(event:any) {
    console.log('error', event);
    this.response = 'error ' + event;
  }

  scanCompleteHandler(event:any) {
    if (event) {
      console.log('complete', event);
      this.response = 'complete ' + event;
    }
  }

  logAction() {
    // Save Scanning POST
    // chiamata API scrittura tipologia ultima scansione
    // OK -> riabilita scanner

    // KO -> alert errore
  }
}
