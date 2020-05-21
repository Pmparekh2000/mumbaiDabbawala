import { Component, OnInit, ViewChild } from '@angular/core';
import { UserLoginServiceService } from '../services/user-login-service.service';
import { Router } from '@angular/router';
import { Customer } from '../shared/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css']
})
export class LoginCustomerComponent implements OnInit {
  private CustomerData : Customer;
  customer: Customer;
  applicationform: FormGroup;
  errMsg: string;

  formErrors= {
    'f_name':'',
    'l_name': '',
    'm_name': '',
    'email':'',
    'password':'',
    'age':'',
    'occupation':'',
    'marital_status':'',
    'gender':'',
    'address':'',
    'pincode':'',
    'phone_number':''
  }

  validationMessages = {
    'f_name': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 3 characters long.',
      'maxlength':     'First Name cannot be more than 20 characters long.'
    },
    'l_name': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 3 characters long.',
      'maxlength':     'Last Name cannot be more than 20 characters long.'
    },
    'm_name': {
      'required':      "Father's Name is required.",
      'minlength':     "Father's Name must be at least 3 characters long.",
      'maxlength':     "Father's Name cannot be more than 20 characters long."
    },

    'email': {
      'required':      'Email is required.',
      'maxlength':     'Email cannot be more than 199 characters long.',
      'email':         'Email not in valid format.'
    },
    'password': {
      'required':      "Passsword is required.",
      'minlength':     "Password must be at least 10 characters long."
    },
    'age': {
      'required' : 'Age is required.',
      'min' : 'Age must be at least 5 yeras old.',
      'max' : 'Age cannot be more than 100 years old .'
    },
    'occupation':{
      'maxlength': 'Occupation cannot be more than 99 characters long.'
    },
    'marital_status':{
      'required' : 'Marital Status is Required'
    },
    'gender':{
      'required' : 'Gender is Required'
    },
    'address':{
      'required' : 'Address is Required',
      'minlength': "Address must be at least 10 characters long.",
      'maxlength': "Address cannot be more than 200 characters long."
    },
    'pincode':{
      'required' : 'Pincode is Required',
      'minlength': "Pincode must be of 6 digits",
      'maxlength': "Pincode must be of 6 digits"
    },
    'phone_number':{
      'required' : 'Contact Number is Required',
      'min': 'Invalid Phone Number',
      'max': 'Invalid Phone Number'
    }
  };


  constructor(private customerservice:UserLoginServiceService,
  private fb : FormBuilder,
    private router:Router ) {
    if(!this.customerservice.checkData()){
      this.router.navigate(['/notfound']);
   }else{
    this.CustomerData = this.customerservice.getData();
    this.createForm();
   }

  }

  ngOnInit() {
    if(!this.customerservice.checkData()){
      console.log(this.customerservice.checkData())
    }
  }


  createForm(){
    this.applicationform = this.fb.group({
      f_name: [this.CustomerData.f_name,[ Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      l_name: [this.CustomerData.l_name,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      m_name: [this.CustomerData.m_name,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [this.CustomerData.email,[Validators.required,Validators.maxLength(199), Validators.email]],
      password:[this.CustomerData.password,[Validators.required,Validators.minLength(10)]],
      age: [this.CustomerData.age,[Validators.required,Validators.min(5),Validators.max(100)]],
      occupation:[this.CustomerData.occupation,Validators.maxLength(99)],
      marital_status:[this.CustomerData.marital_status,Validators.required],
      gender:[this.CustomerData.gender,Validators.required],
      address:[this.CustomerData.address, [Validators.required,Validators.minLength(10), Validators.maxLength(199)]],
      pincode:[this.CustomerData.pincode,[Validators.required,,Validators.minLength(6),Validators.maxLength(6)]],
      phone_number:[this.CustomerData.phone_number,[Validators.required,Validators.min(1000000000),Validators.max(9999999999)]],
      Present_member:this.CustomerData.Present_member
    });
      this.customer = this.applicationform.value;
      this.applicationform.valueChanges.subscribe(data => this.onValueChanged());
      this.onValueChanged(); // reset Validation Changes
}

onValueChanged(data?: any) {
  if (!this.applicationform) { return; }
  const form = this.applicationform;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}
onSubmit(){

  this.customer = this.applicationform.value;
  this.customer.Present_member = this.customer.Present_member ? 1 : 0;
  this.customerservice.putData(this.customer)
  .subscribe(
    (customer) => {
      this.customer = customer;
      this.errMsg = 'Updated Data Successfully';
      console.log(customer);
    },
    (error) => {
      this.errMsg = error;
    }
  )
  this.applicationform.reset({
      f_name: this.CustomerData.f_name,
      l_name: this.CustomerData.l_name,
      m_name: this.CustomerData.m_name,
      email: this.CustomerData.email,
      password: this.CustomerData.password,
      age: this.CustomerData.age,
      occupation: this.CustomerData.occupation,
      marital_status: this.CustomerData.marital_status,
      gender: this.CustomerData.gender,
      address: this.CustomerData.address,
      pincode: this.CustomerData.pincode,
      phone_number: this.CustomerData.phone_number,
      Present_member: this.CustomerData.Present_member
  });
  // this.applicationformDirective.resetForm();
}



  Logout(){
    this.customerservice.logout()
    this.router.navigate(['/login']);
  }

}
