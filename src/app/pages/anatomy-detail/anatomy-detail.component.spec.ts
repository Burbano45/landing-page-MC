import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomyDetailComponent } from './anatomy-detail.component';

describe('AnatomyDetailComponent', () => {
  let component: AnatomyDetailComponent;
  let fixture: ComponentFixture<AnatomyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnatomyDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnatomyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
