import { Injectable, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/logger.service'; 

@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnInit {

  private getCurrentLocation() : Promise<GeolocationPosition> {
    this.logger.log('cs getCurrentLocation')
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        this.logger.log('cs getCurrentPosition')
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  pobierzLokalizacje(){
    this.logger.log('Common service: pobieranie lokalizacji')
    this.getCurrentLocation().then(pos => this.position = pos)
  
  .catch(err => this.error = err);
  this.logger.log('Bład podczas pob. lokalizacji ' + this.error);
  this.logger.log('szerokosc ' + this.latitude);
  this.logger.log('szerokosc ' + this.longitude);
}

get latitude(): number | null {
return this.position?.coords.latitude || null;
}

get longitude(): number | null {
return this.position?.coords.longitude || null;
}

  

  position: GeolocationPosition | null = null;
  error: string | null = null;
  constructor(private logger: LoggerService) { }
  ngOnInit(): void {

  }

 public id_bizacego_Projektu(){

this.logger.log((localStorage.getItem('id_bizacego_Projektu')))

  return JSON.parse(localStorage.getItem('id_bizacego_Projektu'));
}

public  biezacyCzas( ): string {
let date = new Date();
  const rok = date.getFullYear();
  const miesiac = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 ponieważ miesiące są liczone od 0
  const dzien = date.getDate().toString().padStart(2, '0');
  const godzina = date.getHours().toString().padStart(2, '0');
  const minuta = date.getMinutes().toString().padStart(2, '0');
  const sekunda = date.getSeconds().toString().padStart(2, '0');

  return `${rok}-${miesiac}-${dzien} ${godzina}:${minuta}:${sekunda}`;
}

}




