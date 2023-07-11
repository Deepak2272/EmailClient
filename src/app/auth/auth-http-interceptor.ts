import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       //modifing the outgoing request
        const modifiedReq  = req.clone({
            withCredentials:true
        })
        //console.log(modifiedReq)
        return next.handle(modifiedReq);
    }
}
