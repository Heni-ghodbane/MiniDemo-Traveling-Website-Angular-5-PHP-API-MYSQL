import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsSearchListComponent } from './hotels-search-list.component';

describe('HotelsSearchListComponent', () => {
  let component: HotelsSearchListComponent;
  let fixture: ComponentFixture<HotelsSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelsSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
