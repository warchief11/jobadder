import { CandidateMatchSequentialService } from './features/jobs/services/candidate-match-sequential.service';
import { CandidateMatcher } from './features/jobs/services/candidate-matcher';
import { JobDetailResolver } from './features/jobs/job-detail/job-detail.resolver';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';
import { JobDetailComponent } from './features/jobs/job-detail/job-detail.component';


const routes: Routes = [
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/:jobId', component: JobDetailComponent, resolve: { pageData: JobDetailResolver } },
  { path: '', redirectTo: '/jobs', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
   // {provide: 'CandidateMatcher', useClass: CandidateMatchSequentialService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
