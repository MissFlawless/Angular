import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Suggestions } from './suggestions';

describe('Suggestions', () => {
  let component: Suggestions;
  let fixture: ComponentFixture<Suggestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Suggestions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Suggestions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
