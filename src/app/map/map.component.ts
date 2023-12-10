import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { GeolocationService } from '../geolocation.service';
import * as L from 'leaflet';
import 'leaflet-geosearch';
import { HttpClient } from '@angular/common/http';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit  {
odswiezMape() {
this.map.invalidateSize()
}

  @ViewChild('map') mapContainer: ElementRef;
  map: L.Map;
  marker: L.Marker;
  userMarker: L.Marker;
  error: string = '';
  czy_dialog=false;

  constructor(private geolocationService: GeolocationService, private http: HttpClient) {}
 



  pokazDialog(){
    this.czy_dialog=!this.czy_dialog;
    console.log('czy_dialog =' + this.czy_dialog)
  }

  invalidateSize(): void {
   
   // if (this.map) {
    this.locateUser()
      console.log('Działa invalidateSize')
      this.map.invalidateSize();
  
    //}
  }

  ngOnInit(): void {
    this.geolocationService.currentCoordinates.subscribe(coords => {
      if (coords) {
        this.updateMap(coords.lat, coords.lng);
      
      }
    });


    this.geolocationService.getCurrentLocation().then(coords => {
      this.initMap(coords.latitude, coords.longitude);
      this.addMarker(coords.latitude, coords.longitude);

      this.geolocationService.updateCoordinatesFromForm(coords.latitude, coords.longitude);
      
    }).catch(error => {
      this.error = error.message;
      console.error('Error in MapComponent:', error);
    });

  
  }

  initMap(lat: number, lng: number): void {

  
    this.map = L.map(this.mapContainer.nativeElement).setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);


    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.map.invalidateSize();
      const clickedLat: number = e.latlng.lat;
      const clickedLng: number= e.latlng.lng;
      console.log(`Clicked location: Latitude: ${clickedLat}, Longitude: ${clickedLng}`);
      this.addMarker(clickedLat, clickedLng);

      
      this.geolocationService.updateCoordinatesFromForm(clickedLat, clickedLng )
      this.reverseGeocode(clickedLat, clickedLng);
    });

    const searchControl =  GeoSearchControl({
      provider: new OpenStreetMapProvider(),
    })

    //const searchControl = new GeoSearchControl(dane);

    this.map.addControl(searchControl);




  }

  updateMap(lat: number, lng: number): void {
    if (this.map) {
      this.map.setView(new L.LatLng(lat, lng), 13);
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lng]).addTo(this.map);
      this.addMarker(lat, lng)
     // this.map.invalidateSize();
this.reverseGeocode(lat, lng)
      // Dodaj tu logikę dla markera jeśli potrzebna
    }
  }

  addMarker(lat: number, lng: number): void {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    

    this.marker = L.marker([lat, lng]).addTo(this.map);
    
    this.reverseGeocode(lat, lng)

    
    //this.marker.bindPopup(`<b>Selected Location</b><br>Latitude: ${lat.toFixed(5)}<br>Longitude: ${lng.toFixed(5)}`).openPopup();
   // this.geolocationService.updateCoordinates({ lat, lng });
  }

  reverseGeocode(lat: number, lng: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    this.http.get(url).subscribe(data => {
      console.log('Reverse geocoding data:', data);
      const address = data['display_name'];
      this.geolocationService.setAddress(address);
      
      if (this.marker) {
        this.marker.bindPopup(`Address: ${data['display_name']}`).openPopup();
      }
    }, error => {
      console.error('Reverse geocoding error:', error);
    });
  }

  locateUser(): void {
    this.map.invalidateSize();
    this.geolocationService.getCurrentLocation().then(coords => {
      const latLng = new L.LatLng(coords.latitude, coords.longitude);
      
      //let  koordynaty : {lat: number, lng: number}
      //koordynaty.lat = coords.latitude
     // koordynaty.lng = coords.longitude
     //this.addMarker(koordynaty.lat,koordynaty.lng );
      //this.geolocationService.updateCoordinates(koordynaty )
     // let  koordynaty : {lat: number, lng: number}
     // koordynaty.lat = coords.latitude
      //koordynaty.lng = coords.longitude

     // this.geolocationService.updateCoordinatesFromForm(coords.latitude, coords.longitude)

  

      if (this.userMarker) {
        this.map.removeLayer(this.userMarker);
     }

     this.addMarker(coords.latitude, coords.longitude);
   
   // this.userMarker = L.marker(latLng).addTo(this.map)
   //     .bindPopup('Twoja lokalizacja').openPopup();

      //  this.addMarker(coords.latitude, coords.longitude);
        this.reverseGeocode(coords.latitude, coords.longitude);
    

      this.map.setView(latLng, 13);
    }).catch(error => {
      console.error('Error getting user location:', error);
      // Dodatkowo, można dodać obsługę błędów, np. wyświetlanie komunikatu dla użytkownika
    });
  }
  
}
