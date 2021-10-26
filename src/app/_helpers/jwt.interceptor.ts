import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        //let currentUser = this.authenticationService.currentUserValue;
        if (localStorage.getItem('currentUser') && localStorage.getItem("accessToken")) {
            request = request.clone({
                setHeaders: {
                    Authorization: localStorage.getItem("accessToken")
                }
            });
        }

        return next.handle(request);
    }
}