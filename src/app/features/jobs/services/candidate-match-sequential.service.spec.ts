import { Observable } from 'rxjs';
import { CandidateSerivce } from './../../candidates/candidate.service';
import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { CandidateMatchSequentialService } from './candidate-match-sequential.service';
import { HttpClientModule } from '@angular/common/http';
import { Candidate } from '../../../model/candidate';

// class MockCandidateService {

//   test = '123';

//   getCandidates(): Observable<Candidate[]> {
//     return Observable.create(ob => {
//       const candidates = [
//         { candidateId: 1, name: 'testCandidate1', skillTags: ['reliable', 'teamplayer', 'angular', 'webapi'] },
//         { candidateId: 2, name: 'testCandidate2', skillTags: ['reliable', 'reliable', 'angularjs', 'webapi'] },
//         { candidateId: 3, name: 'testCandidate3', skillTags: ['cook', 'chef'] }
//       ];

//       ob.next(candidates);
//     });
//   }
// }

describe('CandidateMatchSequentialService', () => {

  const MockCandidateService = {

    getCandidates(): Observable<Candidate[]> {
      return Observable.create(ob => {
        const candidates = [
          { candidateId: 1, name: 'testCandidate1', skillTags: ['reliable', 'teamplayer', 'angular', 'webapi'] },
          { candidateId: 2, name: 'testCandidate2', skillTags: ['reliable', 'reliable', 'angularjs', 'webapi'] },
          { candidateId: 3, name: 'testCandidate3', skillTags: ['cook', 'chef'] }
        ];

        ob.next(candidates);
      });
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidateMatchSequentialService,
        { provide: CandidateSerivce, useValue: MockCandidateService }],
      imports: [
        HttpClientModule,
      ]
    });
  });

  it('should be created', inject([CandidateMatchSequentialService], (service: CandidateMatchSequentialService) => {
    expect(service).toBeTruthy();
  }));

  it('should return matching candidates ',
    inject([CandidateMatchSequentialService], fakeAsync((service: CandidateMatchSequentialService) => {
      const sourceSkills = ['reliable', 'teamplayer', 'angular'];
      const actualMatchingCandidates = service.findCandidates(sourceSkills)
        .subscribe(actual => {
          expect(actual.length).toBe(2);
          expect(actual.find(x => x.candidateId === 1)).toBeDefined();
          expect(actual.find(x => x.candidateId === 2)).toBeDefined();
        });
    })));


  it('should return matching flag correctly for skills candidates',
    inject([CandidateMatchSequentialService], (service: CandidateMatchSequentialService) => {
      const sourceSkills = ['reliable', 'teamplayer', 'gardening'];
      const actualMatchingCandidates = service.findCandidates(sourceSkills)
        .subscribe(actual => {
          expect(actual[0].skills.find(x => x.name === 'reliable').isMatch).toBeTruthy();
          expect(actual[0].skills.find(x => x.name === 'gardening').isMatch).toBeFalsy();
        });
    }));

  it('should not return candidates with no matching skills',
    inject([CandidateMatchSequentialService], (service: CandidateMatchSequentialService) => {
      const sourceSkills = ['reliable', 'teamplayer', 'gardening'];
      const actualMatchingCandidates = service.findCandidates(sourceSkills)
        .subscribe(actual => {
          expect(actual.find(x => x.candidateId === 3)).toBeUndefined();
        });
    }));

  it('should return candidates with descending order of matching skills',
    inject([CandidateMatchSequentialService], (service: CandidateMatchSequentialService) => {
      const sourceSkills = ['reliable', 'teamplayer', 'gardening'];
      const actualMatchingCandidates = service.findCandidates(sourceSkills)
        .subscribe(actual => {
          expect(actual[0].candidateId).toBe(1);
          expect(actual[1].candidateId).toBe(2);
        });
    }));

    it('should not count duplicate skills twice',
    inject([CandidateMatchSequentialService], (service: CandidateMatchSequentialService) => {
      const sourceSkills = ['reliable', 'teamplayer', 'gardening'];
      const actualMatchingCandidates = service.findCandidates(sourceSkills)
        .subscribe(actual => {
          expect(actual[1].matchingSkillCount).toBe(1);
        });
    }));

});
