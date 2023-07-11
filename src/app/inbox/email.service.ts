import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email';

interface EmailSummary{
  id: string,
  subject: string,
  from: string
}

interface MailRequest{
  subject: string;
  text: string;
  to: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  rootUrl : string = "https://api.angular-email.com";

  constructor(private http: HttpClient) { }

  getEmails(){
    return this.http.get<EmailSummary[]>(
      `${this.rootUrl}/emails`
    )
  }

  getEmail(id:string){
   // console.log(id+" : from service")
    return this.http.get<Email>(
      `${this.rootUrl}/emails/${id}`
    )
  }

  sendMail(mail: MailRequest){
    return this.http.post<any>(
      `${this.rootUrl}/emails`,mail
    )
  }

}
