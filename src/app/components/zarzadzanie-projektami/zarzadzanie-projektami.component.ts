import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PouchdbService } from 'src/app/pouchdb.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, Validators, FormArray, NgControl,  NgForm } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserModule } from '@angular/platform-browser';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-zarzadzanie-projektami',
  templateUrl: './zarzadzanie-projektami.component.html',
  styleUrls: ['./zarzadzanie-projektami.component.scss'],
  providers: [MessageService, ConfirmationService],
 
})

export class ZarzadzanieProjektamiComponent implements OnInit {
deleteSelectedRows() {

}
selectedRows: any;
submitForm() {
  if (this.projektForm.valid) {
    this.projektDialog=false;
    console.log('Dane projektu:', this.projektForm.value);
    this.pouchdbService.put(this.projektForm.value ).then(response => {
      console.log('Osoba zaktualizowana w PouchDB!', response);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    });
    
  } else {
    console.error('Formularz zawiera błędy');
  }
}

isFormValid() {
  var dl_nazwa=this.projekt.nazwa.trim().length > 0;
  var dl_kod_dostepu=this.projekt.kod_dostepu.trim().length > 0;
  return dl_kod_dostepu && dl_nazwa
}

  projektDialog: any;
  projekt={nazwa:'',opis:'',kod_dostepu:'', _id:'', id_projektu:'', type:'Projekt', haslo:'', czy_aktywny:true,}
  submitted: boolean = false;
  projektForm: FormGroup;
  data:any[];
  @ViewChild('dt_projekt') table: Table;

  constructor( private pouchdbService: PouchdbService, private messageService: MessageService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService){

    
  }
  async ngOnInit(): Promise<void> {
    this.projektDialog=false;




    
    const _id= this.pouchdbService.createId();
      
    this.projektForm = this.formBuilder.group({
      nazwa: ['', Validators.required],
      opis: [''],
      kod_dostepu: ['', Validators.required],
      _id: [_id],
      id_projektu: [_id],
      type: ['Projekt'],
      haslo: [''],
      czy_aktywny: [true]
    });

    
var rawData = await this.pouchdbService.getData();
this.data=rawData;


    this.pouchdbService.getChanges().subscribe(change => {
      console.log('Zmiany w tabeli do obsłużenia');  
      this.pouchdbService.fetchData().then(fetchedData => {
        this.data = fetchedData.rows.map(row => row.doc);
      })
      //this.updateTable(change);
      //console.log("change " + JSON.stringify(change))
      
    });
   

    }
    

    openNew(){

      const _id= this.pouchdbService.createId();
      
      this.projektForm = this.formBuilder.group({
        nazwa: ['', Validators.required],
        opis: ['', ],
        kod_dostepu: ['', Validators.required],
        _id: [_id],
        id_projektu: [_id],
        type: ['Projekt'],
        haslo: [''],
        czy_aktywny: [true]
      });

      this.projektDialog=true;
    
       
      //console.log('Nazwa='+this.projekt.nazwa)

    }

    getSeverity(status: string) {
      switch (status) {
        case 'INSTOCK':
          return 'success';
        case 'LOWSTOCK':
          return 'warning';
        case 'OUTOFSTOCK':
          return 'danger';
        default: return 'error';
      }
    }

}

