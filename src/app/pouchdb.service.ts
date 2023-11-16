import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PouchdbService {

  db: PouchDB.Database;
  private dataChangeSubject = new Subject<any>();

  constructor() {
    var opts = { auth: { username: 'admin', password: 'admin' } };
    this.db = new PouchDB('sztab');

  }



  syncWithCouchDB(): void {
    const remoteCouchDB = 'http://admin:admin@localhost:5984/sztab';
    this.db.sync(remoteCouchDB, {
      live: true,
      retry: true,

    }).on('change', (info) => {
      console.log("Synchronizaja z couchdb OK");
      this.getChanges();

      // Obsługuje zmiany podczas synchronizacji
    }).on('error', (err) => {
      console.error("Błąd synchronizacji:", err);
    });
  }
  /* oryginalna funkcja z pierwszego generowania
    getChanges(): Observable<any> {
      return new Observable((observer) => {
        this.db.changes({
          since: 'now',
          live: true
        }).on('change', (change) => {
          observer.next(change);
        });
      });
    }
    */
  get(_id: string): Promise<any> {
    return this.db.get(_id);
  }

  getAll(): Promise<any> {
    return this.db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function ( res) {
      
      console.log("Result..." + res);
       //res.json({'users':res});
      return res;
    }).catch(function (err) {
      console.log(err);
    });
  }

  put(data: any): Promise<any> {
    return this.db.put(data);

  }


  getDB() {
    return this.db;
  }

  get dataChanges$() {
    return this.dataChangeSubject.asObservable();
  }

  fetchData(): Promise<any> {
    return this.db.allDocs({ include_docs: true });
  }

  // ...

  getChanges(): void {
    console.log('Działa getChanges');
    this.db.changes({
      since: 'now',
      live: true
    }).on('change', (change) => {
      this.dataChangeSubject.next(change);
    });
  }

}
