import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PouchdbService {

  db: PouchDB.Database;
  private dataChangeSubject = new Subject<any>();

  constructor() {
    var opts = { auth: { username: 'skkw', password: 'sztab' } };
    this.db = new PouchDB('sztab');

  }



  syncWithCouchDB(): void {
    const remoteCouchDB = 'http://skkw:sztab@srv22.mikr.us:20222/sztab';
    this.db.sync(remoteCouchDB, {
      live: true,
      retry: true,

    }).on('change', (info) => {
      console.log("Synchronizaja z couchdb OK");
      this.getChanges();
      // Zmiana została zareplikowana
      const lastSyncTime = new Date();
      localStorage.setItem('lastSync', lastSyncTime.toISOString());

      // Obsługuje zmiany podczas synchronizacji
    }).on('error', (err) => {
      console.error("Błąd synchronizacji:", err);
    }).on('paused', (err) => {
      // replication paused (e.g., replication up to date, user went offline)
    }).on('active', () => {
      // replicate resumed (e.g., new changes replicating, user went back online)
    }).on('denied', (err) => {
      // a document failed to replicate (e.g., due to permissions)
    }).on('complete', (info) => {
      // handle complete
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
    }).then(function (res) {

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

  async getData() {
    let result = await this.db.allDocs({ include_docs: true });
    return result.rows.map(row => row.doc);
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

  public getChanges() {
    return new Observable(observer => {
      this.db.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', change => {
        observer.next(change);
      }).on('error', error => {
        observer.error(error);
      });
    });
  }


  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 24; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}