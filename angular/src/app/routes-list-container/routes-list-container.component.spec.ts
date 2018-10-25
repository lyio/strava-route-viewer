import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesListContainerComponent } from './routes-list-container.component';

describe('RoutesListContainerComponent', () => {
  let component: RoutesListContainerComponent;
  let fixture: ComponentFixture<RoutesListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
