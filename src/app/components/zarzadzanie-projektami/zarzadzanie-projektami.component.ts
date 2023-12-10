import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PouchdbService } from 'src/app/pouchdb.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, Validators, FormArray, NgControl, NgForm } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserModule } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { LoggerService } from 'src/app/logger.service';
import { GeolocationService } from 'src/app/geolocation.service';
import { MapComponent } from 'src/app/map/map.component';


@Component({
  selector: 'app-zarzadzanie-projektami',
  templateUrl: './zarzadzanie-projektami.component.html',
  styleUrls: ['./zarzadzanie-projektami.component.scss'],
  providers: [MessageService, ConfirmationService],

})

export class ZarzadzanieProjektamiComponent implements OnInit {
odswiezMape2() {
  console.log("DZial KLIK")
this.mapComponent.map.invalidateSize();
}
onDialogShow() {
  console.log('Dialog został wyświetlony');

  this.mapComponent.map.invalidateSize()
  //setTimeout(this.odswiezKlik.nativeElement.click, 1000)
  //this.odswiezKlik.nativeElement.click();
  
  
}
  @ViewChild(MapComponent) mapComponent: MapComponent
  @ViewChild('odswiezKlik') odswiezKlik: ElementRef


ustawProjekJakoBiezacy() {
  localStorage.setItem('id_bizacego_Projektu', JSON.stringify(this.selectedRows[0]));
  this.router.navigate(['/']);
  window.location.reload();
}


  ustawProjekJakoDomyslny() {


    console.log('Selected ' + this.selectedRows[0]._id)

    if(this.selectedRows[0].czy_domyslny){
      return;
    }
    this.selectedRows[0].czy_domyslny = true
    let wybranyDoc = this.selectedRows[0]

    let db = this.pouchdbService.getDB()
    db.find({
      selector: {
        czy_domyslny: true,
        type: 'Projekt'
      }
    }).then(function (wynik) {
      console.log('Znalezione dokumenty:', wynik.docs);
      // Przetwarzanie każdego dokumentu
      wynik.docs.forEach(function (dokument) {

        let doc = <any>dokument;
        console.log(dokument);
        doc.czy_domyslny = false;
        db.put(doc)
      });
      //this.selectedRows[0].czy_domyslny = true
      db.put(wybranyDoc);
      

    }).catch(function (blad) {
      console.error('Wystąpił błąd:', blad);
    });



    //localStorage.setItem('id_bizacego_Projektu', JSON.stringify(this.selectedRows[0]));
  

    this.selectedRows = [];
    this.messageService.add({ severity: 'success', summary: 'Sukces!', detail: 'Projekt został ustawiony jako domyślny.', life: 3000 });


  }
  async editSelectedRow() {
    console.log('Działa Edit'),
      console.log('Selected ' + this.selectedRows[0]._id)
    const doc = await this.pouchdbService.getDB().get(this.selectedRows[0]._id);
   
    this.projektForm.setValue(doc);
   
    this.projektDialog = true
    let koorrds= this.selectedRows[0].koordynaty.split(',').map(word => word.trim());
    this.geolocationService.updateCoordinatesFromForm(koorrds[0],koorrds[1]);

    
    
   
    
  }
  deleteSelectedRows() {
    console.log('Działa DELETE'),
      console.log('Selected ' + this.selectedRows[0]._id)
    this.confirmationService.confirm({
      message: 'Jesteś pewień, że chcesz usunąć wpis?',
      header: 'Ostrzeżenie',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.selectedRows.forEach(async element => {
          var docId = element._id
          console.log('Znalezione _id ' + docId)
          try {
            // Pobranie dokumentu na podstawie _id
            const doc = await this.pouchdbService.getDB().get(docId);

            // Usunięcie dokumentu
            const response = await this.pouchdbService.getDB().remove(doc);
            return response;
          } catch (error) {
            console.error("Błąd podczas usuwania dokumentu: ", error);
            throw error;
          }
        });



        // this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedRows = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Dane zostały usunięte', life: 3000 });
      }
    });

  }

  selectedRows: any;
  submitForm() {
    let cs = this.confirmationService
    if (this.projektForm.valid) {
      this.projektDialog = false;
      console.log('Dane projektu:', this.projektForm.value);
      this.projektForm.value.czas_aktualizacji=this.commonService.biezacyCzas();
      this.pouchdbService.put(this.projektForm.value).then(response => {
        console.log('Osoba zaktualizowana w PouchDB!', response);
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Dane zapisane', life: 3000 });
      }).catch(function (error) {
        // Obsługa błędu
        console.error('Wystąpił błąd podczas zapisu dokumentu', error);
        cs.confirm({
          message: 'Podczas zapisu danych nastąpił błąd <br> najprawdopodobniej dane zostały zmodyfikowane w międzyczasie',
          header: 'Błąd ',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              // Akcja po naciśnięciu 'OK'
          },
          rejectVisible: false // Ukrywa przycisk 'Anuluj'
      });
    });

    } else {
      console.error('Formularz zawiera błędy');
    }
  }

  isFormValid() {
    var dl_nazwa = this.projekt.nazwa.trim().length > 0;
    var dl_kod_dostepu = this.projekt.kod_dostepu.trim().length > 0;
    return dl_kod_dostepu && dl_nazwa
  }

  projektDialog: any;
  projekt = { nazwa: '', opis: '', kod_dostepu: '', _id: '', id_projektu: '', type: 'Projekt', haslo: '', czy_aktywny: true, czy_domyslny: false, czas_aktualizacji: '' }
  submitted: boolean = false;
  projektForm: FormGroup;
  data: any[];
  @ViewChild('dt_projekt') table: Table;
  position: GeolocationPosition | null = null;
  error: string | null = null;
  coordinates: {lat: number, lng: number};

  constructor(private geolocationService: GeolocationService, private logger: LoggerService, private commonService: CommonService, private router: Router, private pouchdbService: PouchdbService, private messageService: MessageService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService) {


  }
  async ngOnInit(): Promise<void> {

    this.geolocationService.currentCoordinates.subscribe(coords => {
      if (coords) {
        this.coordinates = coords;
        let koords= this.coordinates.lat +', ' + this.coordinates.lng
        this.projektForm.patchValue({koordynaty: koords});
        console.log('Received coordinates:', this.coordinates);
      }
    });
    this.geolocationService.currentAddress.subscribe(address => {
      this.projektForm.patchValue({miejsce: address});
    });
  

    this.projektDialog = false;





    const _id = this.pouchdbService.createId();

    this.projektForm = this.formBuilder.group({
      nazwa: ['', Validators.required],
      opis: [''],
      kod_dostepu: ['', Validators.required],
      _id: [_id],
      id_projektu: [_id],
      type: ['Projekt'],
      haslo: [''],
      czy_aktywny: [true],
      _rev: [],
      czy_domyslny: [false],
      czas_aktualizacji:[],
      miejsce:[],
      koordynaty:[],
      
    });


    var rawData = await this.pouchdbService.getData();
    this.data = rawData;
    //this.data.push(this.projektForm.value)

    console.log("Dane do nowe wiersza" + JSON.stringify(this.projektForm.value));


    this.pouchdbService.getChanges().subscribe(change => {
      console.log('Zmiany w tabeli do obsłużenia');
      this.pouchdbService.fetchData().then(fetchedData => {
        this.data = fetchedData.rows.map(row => row.doc);
      })
      //this.updateTable(change);
      //console.log("change " + JSON.stringify(change))

    });


  }


  openNew() {

    const _id = this.pouchdbService.createId();

    this.projektForm = this.formBuilder.group({
      nazwa: ['', Validators.required],
      opis: ['',],
      kod_dostepu: ['', Validators.required],
      _id: [_id],
      id_projektu: [_id],
      type: ['Projekt'],
      haslo: [''],
      czy_aktywny: [true],
      _rev: [],
      czy_domyslny: [false],
      czas_aktualizacji: [''],
      miejsce:[],
      koordynaty:[]
    });

    this.projektDialog = true;
    setTimeout(this.mapComponent.invalidateSize, 1000);
    this.mapComponent.invalidateSize();


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

