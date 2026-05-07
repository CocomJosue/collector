import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedFormComponent } from './repeated-form.component';

describe('RepeatedFormComponent', () => {
  let component: RepeatedFormComponent;
  let fixture: ComponentFixture<RepeatedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepeatedFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeatedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
