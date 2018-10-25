import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterFooterComponent } from './poster-footer.component';

describe('PosterFooterComponent', () => {
  let component: PosterFooterComponent;
  let fixture: ComponentFixture<PosterFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosterFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
