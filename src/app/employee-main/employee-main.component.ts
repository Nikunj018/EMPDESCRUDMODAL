import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee.Model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee-main',
  templateUrl: './employee-main.component.html',
  styleUrls: ['./employee-main.component.css']
})
export class EmployeeMainComponent implements OnInit {

  constructor(public empService:EmployeeService, public datePipe:DatePipe, public toast:ToastrService) { }
  @ViewChild('myEmpModel') myEmpModel:ElementRef;

  openModel() {
    this.myEmpModel.nativeElement.className = 'modal fade show';
  }
  closeModel() {
     this.myEmpModel.nativeElement.className = 'modal hide';
  }

  ngOnInit(): void {
    this.empService.getEmployees().subscribe(data=>{
      this.empService.listEmployee = data;
    })
    this.empService.getDesignations().subscribe(data=>{
      this.empService.listDesignation = data;
    })
  }

  editEmployee( selectedEmployee:Employee)
  {
      console.log(selectedEmployee);
      let df = this.datePipe.transform(selectedEmployee.doj,'yyyy-MM-dd')
      selectedEmployee.doj = df;
      this.empService.employeeData = selectedEmployee;
  }
  deleteEmployee(id:number){
    if(confirm('Are you really want to delete this record?'))
    {
        this.empService.deleteEmployee(id).subscribe(data=>{
          console.log("Record Deleted..");
          this.empService.getEmployees().subscribe(data=>{
            this.empService.listEmployee = data;
           this.toast.success("Success","Record deleted")
          })
        },err=>{
          console.log("Record Not Deleted..");
        })
    }
  }
  submit(form:NgForm)
  {
    console.log(form.value)
   this.empService.employeeData.isMarried = form.value.isMarried == true?1:0;
   this.empService.employeeData.isActive = form.value.isActive == true?1:0;
    if(this.empService.employeeData.id==0){
      this.insertEmployee(form);
    }
    else{
      this.updateEmployee(form);
    }
  }
  insertEmployee(myForm:NgForm)
  {
    this.empService.saveEmployee().subscribe(d=>{
      this.resetForm(myForm);
      this.refereshData();
      this.toast.success("Success","Record Saved")
      console.log("saved success")
    })

  }
  updateEmployee(myForm:NgForm)
  {
    this.empService.updateEmployee().subscribe(d=>{
      this.resetForm(myForm);
      this.refereshData();
      this.toast.success("Success","Record Updated")
      console.log("updated success")
    })
  }
  resetForm(myForm:NgForm)
  {
    myForm.form.reset();
    this.empService.employeeData = new Employee();
  }
  refereshData(){
    this.empService.getEmployees().subscribe(res=>{
      this.empService.listEmployee = res;
    })
  }


}
