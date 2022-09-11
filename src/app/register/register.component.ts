
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { initUser, User } from '../user';
import { cloneDeep } from "lodash";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm!: FormGroup ;
  currentUsers: User[] = [];
  formSubmitted: boolean = false;
  user: User = cloneDeep(initUser);
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.userForm= this.fb.group({

      name: ['', [Validators.required,Validators.pattern("[A-Z].*$")]],
      phno:['', [Validators.required,Validators.pattern("[0-9]+$"),Validators.minLength(7),Validators.maxLength(10)]],
      email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      nrc:['', [Validators.required]]
      
    })

  }

  markFormTouched(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      control.markAsTouched();
      control.markAsPristine();
    })
  }

  markFormUntouched(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      control.markAsUntouched();
    })
  }


  register(){
    this.formSubmitted = true;
    
      this.markFormTouched(this.userForm);
      if (this.userForm.invalid) return;

 
      this.currentUsers.push({ ...this.user, id: String(this.currentUsers.length + 1) })
     
      this.user = cloneDeep(initUser);
      this.markFormUntouched(this.userForm);
  }

  //firstLetterUppercase(): ValidatorFn {
  //  return (control: AbstractControl): {[key: string]: any} | null => {
  //    
  //    return /^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/.test(control.value) ? null : { firstLetterUpperCaseInvalid: true };
  //  };
  //}
  //
  //phoneNoValidation():ValidatorFn{
  // 
  //  return (control: AbstractControl) : {[key: string]: any} | null => {
  //    
  //  return  /^[0-9\-]{10}/.test(control.value) ? null : { phoneNumberInvalid: true };
  //  }
  // 
  //}
  
  
}

