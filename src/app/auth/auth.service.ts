import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}
interface SignUpResponse{
  username: string;
}
interface SignedInResponse{
  authenticated: boolean;
  username: string;
}
interface SignInCredential{
  username:string;
  password:String;
}
interface SigninResponse{
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signedin$ = new BehaviorSubject(false);

  rootUrl : string = "https://api.angular-email.com";

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,{ username }
    );
  }

  signUp(credential : SignupCredentials){
    //console.log(credential)
    return this.http.post<SignUpResponse>(
      `${this.rootUrl}/auth/signup`,credential
    ).pipe(
      tap(({username})=>{
        this.signedin$.next(true);
       // this.username=username;
        localStorage.setItem("username",username)
      })
    );
  }

  checkAuth(){
    return this.http.get<SignedInResponse>(
      `${this.rootUrl}/auth/signedin`
    ).pipe(
      tap(({authenticated, username}) =>{
        this.signedin$.next(authenticated);
        //console.log(username)
        //this.username=username;
        localStorage.setItem("username",username)

      })
    );
  }

  signOut(){
    return this.http.post<any>(
      `${this.rootUrl}/auth/signout`,{}
    ).pipe(
      tap(()=>{
        this.signedin$.next(false);
      })
    )
  }

  signIn(credential:SignInCredential){
    return this.http.post<SigninResponse>(
      `${ this.rootUrl }/auth/signin`,credential
    ).pipe(
      tap(({username})=>{
        this.signedin$.next(true);
       // this.username=username;
        localStorage.setItem("username",username)
      })
    )
  }
}
