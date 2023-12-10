import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private coordinatesSource = new BehaviorSubject<{lat: number, lng: number}>(null);
  currentCoordinates = this.coordinatesSource.asObservable();
  private addressSource = new BehaviorSubject<string>('');
  currentAddress = this.addressSource.asObservable();

   setAddress(newAddress: string) {
    this.addressSource.next(newAddress);
  }

  updateCoordinatesFromForm(lat: number, lng: number) {
    
    this.coordinatesSource.next({ lat, lng });
  }

  updateCoordinates(coords: {lat: number, lng: number}) {
    this.coordinatesSource.next(coords);
  }

  getCurrentLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        console.log('Attempting to get user location...');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Location obtained:', position);
            resolve(position.coords);
          },
          (error) => {
            console.error('Error getting location:', error);
            reject(error);
          }
        );
      } else {
        const errorMsg = 'Geolocation is not supported by this browser.';
        console.error(errorMsg);
        reject(new Error(errorMsg));
      }
    });
  }
}
