import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgControl, ReactiveFormsModule, NgForm } from '@angular/forms';
import { PouchdbService } from 'src/app/pouchdb.service';



@Component({
  selector: 'app-osoba-form',
  templateUrl: './osoba-form.component.html',
  styleUrls: ['./osoba-form.component.scss']
})
export class OsobaFormComponent implements OnInit {
  osobaForm: FormGroup;

  

  constructor(private fb: FormBuilder, private  db: PouchdbService) {
    
   }
 
  ngOnInit(): void {
    this.osobaForm = this.fb.group({
      _id: [''],
      id_zwiazku_taktycznego: [''],
      id_pojazdu: [''],
      id_zdarzenia: [''],
      lista_zdrazen: this.fb.array([]),
      Imie: ['', Validators.required],
      Nazwisko: ['', Validators.required],
      Stopien: [''],
      Jednosta: [''],
      Województwo: [''],
      Telefon: ['', Validators.pattern("^[0-9]*$")],  // Uproszczona walidacja numeru telefonu
      Email: ['', Validators.email]
    });
  }

  get listaZdrazen() {
    return this.osobaForm.get('lista_zdrazen') as FormArray;
  }

  dodajZdarzenie(): void {
    this.listaZdrazen.push(this.fb.control(''));
  }

  usunZdarzenie(index: number): void {
    this.listaZdrazen.removeAt(index);
  }

  
  onSubmit(): void {
    
   
    this.db.put(this.osobaForm.value ).then(response => {
      console.log('Osoba zaktualizowana w PouchDB!', response);
    });
    
  }
}

