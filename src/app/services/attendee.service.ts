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
}
