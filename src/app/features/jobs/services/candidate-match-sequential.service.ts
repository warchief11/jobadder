import { CandidateSerivce } from './../../candidates/candidate.service';
import { Observable } from 'rxjs';
import { CandidateMatcher, MatchingCandidate } from './candidate-matcher';
import { map } from 'rxjs/operators';

export class CandidateMatchSequentialService implements CandidateMatcher {

  constructor(private candidateService: CandidateSerivce) {

  }

  findCandidates(sourceSkills: string[]): Observable<MatchingCandidate[]> {
    throw new Error("Method not implemented.");
  }

  private filterCandidate() {

  }

}
