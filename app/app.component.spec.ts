import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MapsComponent } from './maps/maps.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { ServiceSelectStationService } from './service-select-station.service'
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MapsComponent,
        MenuListComponent
      ],
      imports: [
    HttpClientModule,
    FormsModule
  ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'velib'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('velib');
  });

});
