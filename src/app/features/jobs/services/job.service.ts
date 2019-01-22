import { Candidate } from './../../../model/candidate';
import { Job } from './../job';
import { ApiService } from './../../../shared/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CandidateSerivce } from '../../candidates/candidate.service';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private apiService: ApiService,
    private candidateService: CandidateSerivce) { }

  getJobs(): Observable<Job[]> {
    console.log('getting jobs');
    return this.apiService.get<any>('jobs').pipe(map(data => data.map(j => {
      j.skills = j.skills.split(',');
      return j;
    })));
  }

  getJob(jobId: number): Observable<Job> {
    // for sake of simplicity, ideally data should be returned by a REST based service
    return this.getJobs().pipe(map(x => x.find(j => j.jobId === jobId)));
    // return this.apiService.get<Job>(`job/${jobId}`);
  }
}

