import { Component, OnDestroy, OnInit } from '@angular/core';
import { PouchdbService } from 'src/app/pouchdb.service';



@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.scss']
})
export class ChangesComponent implements OnInit, OnDestroy {
  data;
  private subscription: any;

  constructor(private pouchdbService: PouchdbService) { }

  ngOnInit(): void {
    

    this.subscription = this.pouchdbService.dataChanges$.subscribe(change => {
      // Pobierz dane i zaktualizuj komponent
      this.pouchdbService.fetchData().then(fetchedData => {
        this.data = fetchedData.rows.map(row => row.doc);

        console.log("ChangesComponent działa")
        console.log(this.data)

        
/*
        var output = document.getElementById('output');
        output.innerHTML = ''; // Wyczyść obecne dane
        this.data.rows.forEach(function (row[]) {
          var div = document.createElement('div');
          div.textContent = JSON.stringify(row.doc);
          output.appendChild(div);
        });
        */


      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
