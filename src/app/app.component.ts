import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedIn = false;
  constructor(private authService : AuthService){}
  ngOnInit(){
    this.authService.signedin$.subscribe((signedIn)=>{
      this.signedIn=signedIn;
      //console.log(signedIn)
    })

    this.authService.checkAuth().subscribe(()=>{});

    //testing signout
    // setTimeout(()=>{
    //   this.authService.signOut().subscribe(()=>{});
    // },5000)

  }
}
