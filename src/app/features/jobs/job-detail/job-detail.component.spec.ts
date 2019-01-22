import { CandidateMatchSequentialService } from './../services/candidate-match-sequential.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailComponent } from './job-detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Data } from '@angular/router';
import { CandidateMatcher } from '../services/candidate-matcher';

describe('JobDetailComponent', () => {
  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobDetailComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        CandidateMatchSequentialService,
        { provide: CandidateMatcher, useClass: CandidateMatchSequentialService },
        {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: {
              pageData: {
                jobId: 1
              }
            }
          },
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
