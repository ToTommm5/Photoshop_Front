import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsConcoursComponent } from './details-concours.component';

describe('DetailsConcoursComponent', () => {
  let component: DetailsConcoursComponent;
  let fixture: ComponentFixture<DetailsConcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsConcoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
