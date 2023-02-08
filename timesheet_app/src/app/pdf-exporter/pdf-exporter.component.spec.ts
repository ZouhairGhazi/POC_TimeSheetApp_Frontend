import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfExporterComponent } from './pdf-exporter.component';

describe('PdfExporterComponent', () => {
  let component: PdfExporterComponent;
  let fixture: ComponentFixture<PdfExporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfExporterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
