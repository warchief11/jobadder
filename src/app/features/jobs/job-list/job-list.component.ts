import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../job';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs$: Observable<Job[]>;

  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit() {
    this.jobs$ = this.jobService.getJobs();
  }

  selectJob(job: Job) {
    this.router.navigate(['jobs', job.jobId]);

  }

}
