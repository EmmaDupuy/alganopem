import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Alganopem';
  private apiURL = "https://fhir.eole-consulting.io/api";
  patient: any = {};
  doctor: any = {};
  patients: any = {};
  selectedPatient:any={};
  submitted = false;
  constructor(private http: HttpClient) {
    console.log("hello");
    this.getPatient();
    this.getPractitionner();
    this.getCommunication();
    this.getAllPatient();
  }

  getPatient() {
    return (this.http.get(this.apiURL+'/patient/613f4788a5b46400122cf50e').forEach(patient => { console.log(patient); this.patient = patient; }));

  }

  getAllPatient(){
    return (this.http.get(this.apiURL+'/patient').forEach(patients => { console.log(patients); this.patients = patients; }));
  }

  getPractitionner() {
    return (this.http.get(this.apiURL+'/practitioner/613f51d8a5b46400122cf511').forEach(doctor => { console.log(doctor); this.doctor = doctor; }));

  }

  getCommunication() {
    return (this.http.get(this.apiURL+'/communication').forEach(comm => { console.log(comm);  }));

  }


  onSubmit(){
    this.submitted = true;
    //a modifier pour prod
  }
}