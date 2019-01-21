import { Candidate } from '../../model/candidate';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/api.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CandidateSerivce {

  constructor(private apiService: ApiService) { }

  getCandidates(): Observable<Candidate[]> {
    return this.apiService.get<any>('candidates')
      .pipe(map(data => {
        return data.map(x => {
          let skillTags: string[] = [];
          if (x.skillTags) {
            skillTags = x.skillTags.split(',').map(tag => tag.trim());
          }
          const candidate = { ...x, skillTags: skillTags };
          return candidate;
        });
      }));
  }
}
