import { Injectable } from '@angular/core';
import { EmailService } from './email.service';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Email } from './email';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService: EmailService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot) {
    // console.log(route)
    // const { id } = route.params;
    return this.emailService.getEmail(route.params.id).pipe(
      catchError(()=>{
        this.router.navigateByUrl("/inbox/not-found");
        return EMPTY;
      })
    )
  }


}
