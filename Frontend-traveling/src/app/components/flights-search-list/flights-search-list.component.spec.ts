import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsSearchListComponent } from './flights-search-list.component';

describe('FlightsSearchListComponent', () => {
  let component: FlightsSearchListComponent;
  let fixture: ComponentFixture<FlightsSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
