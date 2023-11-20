import { Component, OnInit } from '@angular/core';
import { PouchdbService } from './pouchdb.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'RescueCoord';

  constructor(private pouchdbService: PouchdbService, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.pouchdbService.syncWithCouchDB();
    this.pouchdbService.getChanges();
  }

}
