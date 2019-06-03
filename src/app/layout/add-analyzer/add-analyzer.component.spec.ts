import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnalyzerComponent } from './add-analyzer.component';

describe('AddAnalyzerComponent', () => {
  let component: AddAnalyzerComponent;
  let fixture: ComponentFixture<AddAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
