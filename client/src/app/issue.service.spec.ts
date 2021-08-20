import { TestBed } from '@angular/core/testing';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of, throwError } from 'rxjs';

import { DEFAULT_ISSUES } from './app.constants';
import { Issue } from './app.interfaces';
import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;
  let storageMapSpy: jasmine.SpyObj<StorageMap>;
  beforeEach(() => {
    storageMapSpy = jasmine.createSpyObj('StorageMap', ['set', 'get', 'watch', 'has']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageMap,
          useValue: storageMapSpy,
        },
      ],
    });
    service = TestBed.inject(IssueService);
    const testIssue: Issue = {
      id: 123456789,
      summary: 'testSummary',
      description: 'testDescription',
      priority: 'Critical',
      status:  'Open',
      createdAt: 123456789,
      lastUpdated: 123456789,
    };
    storageMapSpy.get.and.returnValue(of([testIssue]));
    storageMapSpy.set.and.returnValue(of());
    storageMapSpy.watch.and.returnValue(of([testIssue]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllIssues should fetch all issues from storage', (done) => {
    service.getAllIssues().subscribe((issue: Issue[]) => {
      expect(issue.length).toEqual(1);
      done();
    });
  });

  it('#getAllIssues should return empty array when fetching issues from storage fails', (done) => {
    storageMapSpy.has.and.returnValue(of(true));
    storageMapSpy.watch.and.returnValue(throwError(new Error()));
    service.getAllIssues().subscribe((issues: Issue[]) => {
      expect(issues.length).toEqual(0);
      done();
    });
  });

  it('#getAllIssues should return default issues when issues from storage are not available', (done) => {
    storageMapSpy.has.and.returnValue(of(false));
    storageMapSpy.watch.and.returnValue(of([]));
    service.getAllIssues().subscribe();
    storageMapSpy.set.and.callFake((key: string, value: unknown) => {
      expect(key).toEqual('issues');
      expect(value).toEqual(DEFAULT_ISSUES);
      done();
      return of();
    });
  });

  it('#createIssue should add issue to storage', (done) => {
    const issue: Issue = {
      id: 123456789,
      summary: 'testSummary',
      description: 'testDescription',
      priority: 'Critical',
      status: 'Open',
      createdAt: 123456789,
      lastUpdated: 123456789,
    };
    service.createIssue(issue);
    expect(service.issues[0]).toEqual(issue);
    service.getAllIssues().subscribe((issues) => {
      expect(issues[0]).toEqual(issue);
      done();
    });
  });

  it('#updateIssue should update issues in storage', () => {
    const issue: Issue = {
      id: 123456789,
      summary: 'testSummary',
      description: 'testDescription',
      priority: 'Critical',
      status: 'Open',
      createdAt: 123456789,
      lastUpdated: 123456789,
    };
    service.createIssue(issue);
    issue.summary = 'newTestSummary';
    service.updateIssue(issue);

    expect(service.issues[0].summary).toEqual('newTestSummary');
  });

  it('#deleteIssue should delete issues from storage', () => {
    const issue: Issue = {
      id: 123456789,
      summary: 'testSummary',
      description: 'testDescription',
      priority: 'Critical',
      status: 'Open',
      createdAt: 123456789,
      lastUpdated: 123456789,
    };
    service.createIssue(issue);
    expect(service.issues.length).toEqual(1);
    service.deleteIssue(issue);
    expect(service.issues.length).toEqual(0);
  });
});
