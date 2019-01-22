import { MatchingCandidate, CandidateMatcher } from './../services/candidate-matcher';
import { JobService } from '../services/job.service';
import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../job';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from '../../../model/candidate';
import { Observable } from 'rxjs';
import { CandidateMatchSequentialService } from '../services/candidate-match-sequential.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  @Input() job: Job;

  matchingCandidates$: Observable<MatchingCandidate[]>;
  constructor(private route: ActivatedRoute,
    private candidateMatcher: CandidateMatchSequentialService) { }

  ngOnInit() {
    this.job = this.route.snapshot.data.pageData;
    this.matchingCandidates$ = this.candidateMatcher.findCandidates(this.job.skills);
  }

}
