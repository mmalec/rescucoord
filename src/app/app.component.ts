import { Component, OnInit } from '@angular/core';
import { PouchdbService } from './pouchdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'RescueCoord';

  constructor(private pouchdbService: PouchdbService) {}

  ngOnInit(): void {
    this.pouchdbService.syncWithCouchDB();
    this.pouchdbService.getChanges();
  }

}
