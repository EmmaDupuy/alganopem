import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Item } from '../app/item';
import { ITEMS } from '../app/mock-data';

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
  selectedPatient: any = {};
  selectedRDV: String = '';
  rdv: any = {};
  submitted = false;
  selectedRadio: any = {};
  radios: any[] = ['10', '20', '30', '40', '50', '60'];
  favoriteSeason: string = "";
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  radioSel: any = {};
  radioSelected: string = "";
  radioSelectedString: string = "";
  itemsList: Item[] = ITEMS;

  constructor(private http: HttpClient) {
    console.log("hello");
    this.getPatient();
    this.getPractitionner();
    this.getCommunication();
    this.getAllPatient();
    this.itemsList = ITEMS;
    this.radioSelected = "item_1";
    this.getSelecteditem();
  }

  getPatient() {
    return (this.http.get(this.apiURL + '/patient/613f4788a5b46400122cf50e').forEach(patient => { console.log(patient); this.patient = patient; }));

  }

  getAllPatient() {
    return (this.http.get(this.apiURL + '/patient').forEach(patients => { console.log(patients); this.patients = patients; }));
  }

  getPractitionner() {
    return (this.http.get(this.apiURL + '/practitioner/613f51d8a5b46400122cf511').forEach(doctor => { console.log(doctor); this.doctor = doctor; }));

  }

  getCommunication() {
    return (this.http.get(this.apiURL + '/communication').forEach(comm => { console.log(comm); }));

  }

  getAppointmentByPatient(){
    let rep;
    if (this.selectedPatient!=''){ 
      rep = this.http.get(this.apiURL+'/appointment?participant.actor.reference=Patient/'+this.selectedPatient+'&status=booked').forEach(data => { console.log("rdv",data); this.rdv = data; });
    }
  return rep;
}


  getSelecteditem() {
    this.radioSel = ITEMS.find(Item => Item.value === this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
    return (ITEMS.find(Item => Item.value)?.value);
  }

  onItemChange(item: any) {
    this.getSelecteditem();
  }

  postCommunication() {
    return this.http
      .post(
        this.apiURL + '/communication',
        {
          resourceType: "Communication",
          text: {
            status: "generated",
            div: {}
          },
          recipient: [
            {
              reference: "Notification retard"
            }
          ],
          payload: [
            {
              contentString: this.getSelecteditem() + " id rdv (en cours de test)"
            }
          ]
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  onSubmit() {
    this.submitted = true;
    this.postCommunication();
  }
}