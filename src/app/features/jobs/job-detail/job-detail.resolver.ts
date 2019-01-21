import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Job } from "../job";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { JobService } from "../services/job.service";

@Injectable({
  providedIn: 'root'
})
export class JobDetailResolver implements Resolve<Job> {

  constructor(private router: Router,
    private jobService: JobService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Job> {
    const jobId = +route.paramMap.get('jobId');
    const job = this.jobService.getJob(jobId);
    return job;
  }
}
