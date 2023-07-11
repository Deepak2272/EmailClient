import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;
  constructor(private authService: AuthService, private emailService: EmailService) {

    //console.log(this.authService.username)
  }

  ngOnInit() {
    // console.log(this.authService.username)
    this.email = {
      id: '',
      subject: '',
      text: '',
      to: '',
      from: `${localStorage.getItem('username')}@angular-email.com`,
      html: ''
    }
  }

  onSubmit(email: Email) {
    this.emailService.sendMail(email).subscribe(() => {
      this.showModal = false;
    })
  }

}
