import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { BehaviorSubject, catchError, from, switchMap, throwError } from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _authService: AuthService
  ) {}

    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ) {
      
      if (request.url.indexOf('login') > -1 
      || request.url.indexOf('refresh') > -1
      ){
        return next.handle(request);
      }

      const authToken = this._authService.getToken();

      if (authToken) {
        try {
          request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + authToken,
            },
          });
        } catch (exception) {}
      }

      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error?.status == 401) {
            //return this.refreshTokenMethod(request, next, authToken);
            
            return from(this._authService.refreshToken()).pipe(
              switchMap((res) => {
                //this.signupService.saveResponse(JSON.stringify(res));
                request = request.clone({
                  setHeaders: {
                    Authorization: 'Bearer ' + res.access_token,
                  },
                });
                return next.handle(request);
              }),
              catchError((error) => {
                //Refresh Token Issue.
                if (error.status == 401) {
                  this._authService.userLogout();
                }
                return throwError(() => error);
              })
            );

          } else {
            return throwError(() => error);
          }
        })
      );
    
    }

}