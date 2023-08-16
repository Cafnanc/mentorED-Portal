import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { localKeys } from 'src/app/core/constants/localStorage.keys';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { DynamicFormComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: DynamicFormComponent;
  rememberMe:boolean = false;
  controls:any = {
    controls: [
      {
        name: 'email',
        label: 'Email ID',
        value: '',
        type: 'email',
        placeHolder: 'yourname@email.com',
        errorMessage:'Please enter registered email ID',
        validators: {
          required: true,
          pattern: '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'
        },
      },
      {
        name: 'password',
        label: 'Password',
        value: '',
        type: 'password',
        placeHolder: 'Enter password',
        errorMessage: 'Please enter your registered password',
        validators: {
          required: true,
          minLength: 8,
          pattern: "^[a-zA-Z0-9!@#%$&~*^()\\-`.+,/\"]*$"
        },
      },
    ]
  };
  supportInfo:any;
  formData :any= {controls: []}
  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.getRemeberdDetails();
    this.getMailInfo();
  }

  async getRemeberdDetails() {
    const rememberdDetails = await this.localStorage.getLocalData(localKeys.REMEMBER_ME);
    if (rememberdDetails) {
      let details = JSON.parse(atob(rememberdDetails));
      for (const control of this.controls.controls) {
        control["value"] = details ? details[control.type] : '';
      }
    }
    this.formData.controls = this.controls.controls;

  }
  
  getMailInfo(){
      this.authService.getMailInfo().subscribe((result:any) =>{
        this.supportInfo = result
      })
  }

  onSubmit() {
    this.authService.loginAccount(this.loginForm.myForm.value).subscribe(async (response: any) => {
      if (this.rememberMe) {
        this.localStorage.saveLocalData(localKeys.REMEMBER_ME, btoa(JSON.stringify(this.loginForm.myForm.value)))
      }
      this.router.navigate(['/home']);
    })
  }
}
