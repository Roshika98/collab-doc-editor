import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsDashboard } from './documents-dashboard';

describe('DocumentsDashboard', () => {
  let component: DocumentsDashboard;
  let fixture: ComponentFixture<DocumentsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
