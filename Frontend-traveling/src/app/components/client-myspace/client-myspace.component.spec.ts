import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMyspaceComponent } from './client-myspace.component';

describe('ClientMyspaceComponent', () => {
  let component: ClientMyspaceComponent;
  let fixture: ComponentFixture<ClientMyspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMyspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMyspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
