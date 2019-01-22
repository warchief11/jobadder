import { Observable } from "rxjs";

export class MatchingCandidate {
  jobId: number;
  candidateId: number;
  candidateName: string;
  skills: { name: string, isMatch: boolean }[];
  matchingSkillCount: number;
}

export abstract class CandidateMatcher {
  abstract findCandidates(sourceSkills: string[]): Observable<MatchingCandidate[]>;
}
