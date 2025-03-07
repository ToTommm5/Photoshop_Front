import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpreuvePagesComponent } from './epreuve-pages.component';

describe('EpreuvePagesComponent', () => {
  let component: EpreuvePagesComponent;
  let fixture: ComponentFixture<EpreuvePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpreuvePagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpreuvePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
