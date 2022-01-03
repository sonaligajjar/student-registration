import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  student:any=[];
  constructor(private service:RegistrationService) { }

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(){
      this.service.getStudentList().subscribe(
        data=>{
          this.student=data.data;
        },
        error=>console.log("There is an error")
        
      );
  }

  deleteStudent(id:number){
    this.service.deleteStudent(id).subscribe(
      data=>{
        if(data.data){
          this.getStudentList();
        }
      },
      error=>console.log("There is an error")
    );
  }
}
