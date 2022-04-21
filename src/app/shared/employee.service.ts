import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Desgination, Employee } from './employee.Model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private myhttp:HttpClient) { }
  employeeUrl:string="https://localhost:7167/api/TblEmployees";
  designationUrl:string="https://localhost:7167/api/TblDesignations";

  listEmployee:Employee[]=[];
  listDesignation:Desgination[]=[];

  employeeData:Employee = new Employee();
  saveEmployee()
  {
    return this.myhttp.post(this.employeeUrl,this.employeeData);
  }
  updateEmployee()
  {
    return this.myhttp.put(`${this.employeeUrl}/${this.employeeData.id}`,this.employeeData);  
  }
  getEmployees():Observable<Employee[]>
  {
    return this.myhttp.get<Employee[]>(this.employeeUrl)
  }
  getDesignations():Observable<Desgination[]>
  {
    return this.myhttp.get<Desgination[]>(this.designationUrl)
  }
  deleteEmployee(id:number)
  {
    return this.myhttp.delete(`${this.employeeUrl}/${id}`)
  }
}
