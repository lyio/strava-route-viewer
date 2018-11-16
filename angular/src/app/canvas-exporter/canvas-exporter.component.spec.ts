import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasExporterComponent } from './canvas-exporter.component';

describe('CanvasExporterComponent', () => {
  let component: CanvasExporterComponent;
  let fixture: ComponentFixture<CanvasExporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasExporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
