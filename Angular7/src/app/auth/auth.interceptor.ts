import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }

        if (localStorage.getItem('userToken') != null) {
            const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
            });

            return next.handle(clonedRequest)
                .pipe(tap(
                    success => { },
                    error => {
                        if (error.status === 401) {
                            this.router.navigateByUrl('/login');
                        }
                    }
                ));
        } else {
            this.router.navigateByUrl('/login');
        }
    }

}

