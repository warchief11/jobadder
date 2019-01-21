import { CandidateSerivce } from './../../candidates/candidate.service';
import { Observable } from 'rxjs';
import { CandidateMatcher, MatchingCandidate } from './candidate-matcher';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateMatchSequentialService implements CandidateMatcher {

  constructor(private candidateService: CandidateSerivce) {

  }

  findCandidates(sourceSkills: string[]): Observable<MatchingCandidate[]> {
    return this.candidateService.getCandidates()
      .pipe(map(candidates => {
        const matchingCandidates = [];

        candidates.forEach(candidate => {
          const matchingCandidate = new MatchingCandidate();
          matchingCandidate.candidateId = candidate.candidateId;
          matchingCandidate.candidateName = candidate.name;
          matchingCandidate.skills = candidate.skillTags.map(tag => {
            const skill = { name: tag, isMatch: false };
            if (sourceSkills.find(stag => stag.trim().toLowerCase() === tag.trim().toLowerCase())) {
              skill.isMatch = true;
            }
            return skill;
          });

          matchingCandidate.matchingSkillCount = matchingCandidate.skills.filter(x => x.isMatch).length;
          if (matchingCandidate.matchingSkillCount > 0) {
            matchingCandidates.push(matchingCandidate);
          }
        });

        matchingCandidates.sort((a: MatchingCandidate, b: MatchingCandidate) =>  b.matchingSkillCount - a.matchingSkillCount);
        return matchingCandidates;
      }));
  }

  private filterCandidate() {

  }

}
