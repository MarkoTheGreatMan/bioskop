import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniProfilComponent } from './izmeni-profil.component';

describe('IzmeniProfilComponent', () => {
  let component: IzmeniProfilComponent;
  let fixture: ComponentFixture<IzmeniProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IzmeniProfilComponent]
    });
    fixture = TestBed.createComponent(IzmeniProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
