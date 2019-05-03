import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceSelectStationService } from '../service-select-station.service';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})

export class MenuListComponent implements OnInit {

  selectedLevel;
  //powers = [];
  import_station:Array<Object> = [
      {id: 1, name: "Afficher toutes les stations"}
  ];
  //public data: Array<any> = ["MytData"]; //faut que je mette la valeur du menu ici pour voir ce que ca fait ds les logs

  public constructor(private http: HttpClient, private myService: ServiceSelectStationService) {
        //this.myService.myMethod(this.selectedLevel.name);
  }

  

  ngOnInit() {

    this.http.get('https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=YOUR_JCDECAUX_API_KEY').subscribe((data: any) => {
    data.forEach(station => {
          //this.import_station= this.import_station.concat(station.name);
          this.import_station.push({'id':station.number,'name':station.name.substring(5)})
      });
    });

  }

  selected(){
    //alert(this.selectedLevel.name)
    this.myService.myMethod(this.selectedLevel.id);
  }


}
