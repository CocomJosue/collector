import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedComponent } from './repeated.component';

describe('RepeatedComponent', () => {
  let component: RepeatedComponent;
  let fixture: ComponentFixture<RepeatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepeatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
