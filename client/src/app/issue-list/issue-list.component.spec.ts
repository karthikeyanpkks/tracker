import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTableHarness } from '@angular/material/table/testing';
import { of } from 'rxjs';

import { Issue } from '../app.interfaces';
import { IssueService } from '../issue.service';
import { IssueListComponent } from './issue-list.component';

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;
  let loader: HarnessLoader;
  let issueServiceSpy: jasmine.SpyObj<IssueService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    issueServiceSpy = jasmine.createSpyObj('IssueService', ['getAllIssues']);
    issueServiceSpy.getAllIssues.and.returnValue(
      of([
        {
          id: 1234,
          summary: 'testSummary',
          description: 'testDescription',
          priority: 'Critical',
          status: 'Open',
          createdAt: 1234,
          lastUpdated: 1234,
        },
      ])
    );
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [IssueListComponent],
      imports: [MatTableModule, MatDialogModule],
      providers: [
        { provide: IssueService, useValue: issueServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display table when issues are not available', async () => {
    component.issuesTableDataSource.data = [];
    await fixture.detectChanges();
    const issuesTable = await loader.getHarness(MatTableHarness);
    const rows = await issuesTable.getRows();
    expect(rows.length).toEqual(1);
    const [cellText] = await rows[0].getCellTextByIndex();
    expect(cellText).toEqual('No issues available');
  });

  it('should not display table with values when issues are available', async () => {
    const issuesTable = await loader.getHarness(MatTableHarness);
    const rows = await issuesTable.getRows();
    expect(rows.length).toEqual(1);

    const cells = await rows[0].getCells();
    expect(cells.length).toEqual(component.columnsToDisplay.length);

    const [
      summary,
      createdAt,
      updatedAt,
      status,
      priority,
    ] = await rows[0].getCellTextByIndex();
    expect(summary).toEqual('testSummary');
    expect(createdAt).toEqual('Jan 1, 1970');
    expect(updatedAt).toEqual('Jan 1, 1970');
    expect(status).toEqual('Open');
    expect(priority).toEqual('Critical');
  });

  it('#viewIssue opens dialog', async (done) => {
    issueServiceSpy.getAllIssues().subscribe((issues: Issue[]) => {
      component.viewIssue(issues[0]);
      expect(matDialogSpy.open).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
