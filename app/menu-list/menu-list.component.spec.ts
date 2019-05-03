import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListComponent } from './menu-list.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('MenuListComponent', () => {
  let component: MenuListComponent;
  let fixture: ComponentFixture<MenuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuListComponent ],
      imports: [
        HttpClientModule,
        FormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
