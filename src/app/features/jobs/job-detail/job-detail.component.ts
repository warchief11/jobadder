import { JobService } from '../services/job.service';
import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../job';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from '../../../model/candidate';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  @Input() job: Job;
  matchingCandidates: Candidate[];
  constructor(private route: ActivatedRoute,
    private jobService: JobService) { }

  ngOnInit() {
    this.job = this.route.snapshot.data.pageData;
    this.jobService.getMatchingCandidates(this.job.jobId).subscribe(x => {
      this.matchingCandidates = x;
      console.log(x);
    });
  }

}
