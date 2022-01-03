import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  public getStudent(userId:any):Observable<any>{
    return this.http.get<any>("http://localhost:8080/student/getStudent/"+userId);
  }

  public saveStudent(student:any):Observable<any>{
    return this.http.post<any>("http://localhost:8080/student/save",student);
  }

  public getStudentList():Observable<any>{
    return this.http.get<any>("http://localhost:8080/student/getStudentList");
  }

  public deleteStudent(userId:any):Observable<any>{
    return this.http.get<any>("http://localhost:8080/student/deleteStudent/"+userId);
  }
}
