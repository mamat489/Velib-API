import { Component } from '@angular/core';
import { MapsComponent } from './maps/maps.component';
import { MenuListComponent } from './menu-list/menu-list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'velib';
}
