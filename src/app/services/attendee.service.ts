import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, finalize, map } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {

  constructor(
    private _http: HttpClient
  ) {}

  stateLoading = new BehaviorSubject<boolean>(false);
  stateLoading$ = this.stateLoading.asObservable();

  geState(hash:string) {

    this.stateLoading.next(true);

    return this._http.get<any>(`${environment.apiEndpoint}/get_state/${hash}`).pipe(
      map((state:any)=>{
        return state;
      }),
      finalize(() => this.stateLoading.next(false))
    )
  }

  saveScanningLoading = new BehaviorSubject<boolean>(false);
  saveScanningLoading$ = this.saveScanningLoading.asObservable();

  saveScanning(hash:string) {

    this.saveScanningLoading.next(true);

    const payload = {
      code: hash
    };

    return this._http.post<any>(`${environment.apiEndpoint}/save_scanning`, payload).pipe(
      map((scanning:any)=>{
        return scanning;
      }),
      finalize(() => this.saveScanningLoading.next(false))
    )
  }
}
