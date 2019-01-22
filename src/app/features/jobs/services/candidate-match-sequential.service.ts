import { CandidateSerivce } from './../../candidates/candidate.service';
import { Observable } from 'rxjs';
import { CandidateMatcher, MatchingCandidate } from './candidate-matcher';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class CandidateMatchSequentialService implements CandidateMatcher {

  constructor(private candidateService: CandidateSerivce) {

  }

  findCandidates(sourceSkills: string[]): Observable<MatchingCandidate[]> {
    return this.candidateService.getCandidates()
      .pipe(map(candidates => {
        const matchingCandidates = [];

        // find matching candidates
        candidates.forEach(candidate => {
          const matchingSkills = this.getMatchingSkills(sourceSkills, candidate.skillTags);
          const matchingSkillCount = matchingSkills.filter(x => x.isMatch).length;
          if (matchingSkillCount > 0) {
            const matchingCandidate = new MatchingCandidate();
            matchingCandidate.candidateId = candidate.candidateId;
            matchingCandidate.candidateName = candidate.name;
            matchingCandidate.skills = matchingSkills;
            matchingCandidate.matchingSkillCount = matchingSkillCount;
            matchingCandidates.push(matchingCandidate);
          }
        });
        // sort in descending order
        matchingCandidates.sort((a: MatchingCandidate, b: MatchingCandidate) => b.matchingSkillCount - a.matchingSkillCount);
        return matchingCandidates;
      }));
  }

  private getMatchingSkills(sourceSkills: string[], targetSkills: string[]): { name: string, isMatch: boolean }[] {
    return targetSkills.filter((tag, pos, self) => {
      // remove duplicate skills
      return self.indexOf(tag) === pos;
    }).map(tag => {
      const skill = { name: tag, isMatch: false };
      if (sourceSkills.find(stag => stag.trim().toLowerCase() === tag.trim().toLowerCase())) {
        skill.isMatch = true;
      }
      return skill;
    });
  }

}
