import { Candidate } from '../../model/candidate';
import { CandidateSerivce } from '../candidates/candidate.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../shared/api.service';
import { Job } from './job';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private apiService: ApiService,
    private candidateService: CandidateSerivce) { }

  getJobs(): Observable<Job[]> {
    console.log('getting jobs');
    return this.apiService.get<Job[]>('jobs');
  }

  getJob(jobId: number): Observable<Job> {
    // for sake of simplicity, ideally data should be returned by a REST based service
    return this.getJobs().pipe(map(x => x.find(j => j.jobId === jobId)));
    // return this.apiService.get<Job>(`job/${jobId}`);
  }

  getMatchingCandidates(jobId: number): Observable<Candidate[]> {
    return this.candidateService.getCandidates();
  }

}

