import { TestBed, inject } from '@angular/core/testing';
import { JobService } from './job.service';
import { HttpClientModule } from '@angular/common/http';


describe('JobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobService],
      imports: [
        HttpClientModule,
      ]
    });
  });

  it('should be created', inject([JobService], (service: JobService) => {
    expect(service).toBeTruthy();
  }));
});
