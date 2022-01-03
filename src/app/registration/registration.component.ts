import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [DatePipe]

})
export class RegistrationComponent implements OnInit {

  student:any={};
  genderList:any=[];
  userId:any;
  myDate:any;
  msg:String | undefined;
  constructor(private service: RegistrationService,
    private activatedRoute: ActivatedRoute,
    private route:Router,
    private datePipe:DatePipe) {
    this.genderList = ['Male','Female','Other'];
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId);
    });
    this.myDate=new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    
   }

  ngOnInit(): void {
    if(this.userId !=null){
      this.getStudent(this.userId);
    }
    console.log("Current Date==>>",this.myDate);
  }
  getStudent(userId:number){
    this.service.getStudent(userId).subscribe(
      data=>{
        this.student=data.data;
      },
      error=>console.log("There is an error")
    );
  }

  registrationStudent(registrationForm:NgForm){
    console.log(registrationForm);
    if(!registrationForm.invalid){
    this.service.saveStudent(this.student).subscribe(
      data=>{
        this.route.navigate(['']);
      },
      error=>console.log("There is an error")
    );
    }else{
        this.msg="Please fill all required detail";
    }

  }
  onKeypressEvent(event: any,type:any):boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if (type == 1 && charCode > 31 && (charCode >= 48 && charCode <= 57)) {
      return true;
    }
    else if (type == 2 && charCode > 31 && ((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 99))) {
      return true;
    }
    return false;
  }

  
}
