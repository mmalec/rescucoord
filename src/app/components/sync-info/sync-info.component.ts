import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { PouchdbService } from 'src/app/pouchdb.service';

@Component({
  selector: 'app-sync-info',
  templateUrl: './sync-info.component.html',
  styleUrls: ['./sync-info.component.scss']
})
export class SyncInfoComponent implements OnInit {

czas_synchronizacji

id_biezacego_projektu

  constructor(private pouchdbService: PouchdbService, private commonService: CommonService){}

  ngOnInit(): void {
    this.pouchdbService.getChanges().subscribe(change => {
      console.log('Zmiany w tabeli do obsłużenia');  
      const lastSyncTime = localStorage.getItem('lastSync');
   
      if (lastSyncTime) {
        this.czas_synchronizacji ='Ostatnia synchronizacja:'+ new Date(lastSyncTime);
        console.log('Ostatnia synchronizacja:', new Date(lastSyncTime));
      } else {
        this.czas_synchronizacji ='Brak danych o ostatniej synchronizacji'
        console.log('Brak danych o ostatniej synchronizacji');


        this.id_biezacego_projektu=this.commonService.id_bizacego_Projektu();
      }


      //this.updateTable(change);
      //console.log("change " + JSON.stringify(change))


      
    });
    this.id_biezacego_projektu=this.commonService.id_bizacego_Projektu();
        
  }

}
