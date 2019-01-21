import { Observable } from "rxjs";

export class MatchingCandidate {
  jobId: number;
  candidateId: number;
  candidateName: string;
  skills: { name: string, isMatch: boolean }[];

}

export interface CandidateMatcher {
  findCandidates(sourceSkills: string[]): Observable<MatchingCandidate[]>;
}
