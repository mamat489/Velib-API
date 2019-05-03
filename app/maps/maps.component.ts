import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceSelectStationService } from '../service-select-station.service';

import * as L from 'leaflet';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {

  data_station_id: number = 1; //je met a 1 au depart pour afficher toute les stations a l'ouverture de l'app
  carte_init: boolean = false; //permet de savoir si la carte a ete init (pour le faire 1 fois)
  
  /*pour y acceder en dehors de l'init*/
  macarte: any;
  myIconBlue:any;
  myIconRed: any;
  theMarker = {}; //stocker sous forme d'obj mon marker pour garder une trace du marker ACTIF apres creation
  mesMarker= [];  //je stock tout les markers pour garder leur trace et les supprimer lors du changement de station


  public constructor(private http: HttpClient,private myService: ServiceSelectStationService) {
        this.myService.myMethod$.subscribe((data) => {
                this.data_station_id = data.valueOf(); //je recupere la data du service (selection de la station)
                this.tps_reel_station() //j'actualise la map a chaque data recue
            });
    }

  ngOnInit() {
  	this.tps_reel_station() //OnInit je crée la map pour la premiere fois pui change la var Bool
  }  //fin du OnInit


 tps_reel_station() {   // fonction d'init et de maj de la map

    if (this.carte_init == false) { //if elle a jamais ete init
      // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
      this.macarte = L.map('ma_carte')//.setView([43.250000,5.400000], 12);
 
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Ma Carte'
      }).addTo(this.macarte);

      this.myIconBlue = L.icon({ //icon bleu pour station selectionnée
        iconSize: [ 25, 41 ],
        iconAnchor: [ 12.5, 40 ],
        popupAnchor:  [1, -40],
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-shadow.png'
      });


      this.myIconRed = L.icon({ //icon rouge pour station a - de 500m
        iconSize: [ 32/2,37/2 ],
        iconAnchor: [ 32/4, 37/2 ],
        popupAnchor:  [0.4, -37/2],
        iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red-small.png',
      });
    
      //initialisation de la carte premiere fois
      this.carte_init = true;
      }

    else{  //des quon change de station on supprime tout les markers
      for(var i = 0; i < this.mesMarker.length; i++){
        if (this.mesMarker[i] != undefined) {
          this.macarte.removeLayer(this.mesMarker[i]); //suppression grace au tableau
        }
      }
      this.mesMarker = [];//on vide le tableau
      console.log("tab vidée : "+this.mesMarker.length)
    }

    if(this.data_station_id==1){ //si map deja init
      this.macarte.setView([43.270000,5.400000], 12); //on la centre
    }

    this.http.get('https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=YOUR_JCDECAUX_API').subscribe((data: any) => {
      data.forEach(station => {
        if (this.data_station_id==1 || station.number.valueOf()===this.data_station_id.valueOf() ) {//si afficher toute les stations OU afficher uniquement station selectionnée
          this.mesMarker.push(this.theMarker=L.marker([station.position.lat, station.position.lng], {icon: this.myIconBlue}).bindPopup(station.name+"<br>"+station.available_bikes+" vélo(s) disponible(s)<br>"+station.available_bike_stands+" place(s) disponible(s)").addTo(this.macarte));
          console.log(this.mesMarker[0])            
          }
      });
      //on refait pas la requette HTTP, ici pour affichage station -500m
      data.forEach(station => { //maintenant j'affiche les markers a moins de 500m //Selon calcul 500m font long:0,0062 et lat:0,0044 (en deg decimal)
        //si on veut pas afficher toute station ET on reaffiche pas la station selectionnée ET que la staion est a -500m !
        if (this.data_station_id!=1 && (station.position.lat!= this.mesMarker[0]._latlng.lat) && ((station.position.lat-0.0044<this.mesMarker[0]._latlng.lat && station.position.lat+0.0044>this.mesMarker[0]._latlng.lat) && (station.position.lng-0.0062<this.mesMarker[0]._latlng.lng && station.position.lng+0.0062>this.mesMarker[0]._latlng.lng))) {
          this.mesMarker.push(this.theMarker=L.marker([station.position.lat, station.position.lng], {icon: this.myIconRed}).bindPopup(station.name+"<br>"+station.available_bikes+" vélo(s) disponible(s)<br>"+station.available_bike_stands+" place(s) disponible(s)").addTo(this.macarte));
           //maintenant j'affiche les markers a moins de 500m //Selon calcul 500m font long:0,0062 et lat:0,0044 (en deg decimal)
           this.macarte.setView([this.mesMarker[0]._latlng.lat,this.mesMarker[0]._latlng.lng], 14) //Je zoom sur station selectionnée
          }
      });

      });
}

}
