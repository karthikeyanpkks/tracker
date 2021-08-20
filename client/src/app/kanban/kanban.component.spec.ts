import { DragDropModule } from '@angular/cdk/drag-drop';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { Issue } from '../app.interfaces';
import { IssueCardComponent } from '../issue-card/issue-card.component';
import { IssueService } from '../issue.service';
import { KanbanComponent } from './kanban.component';

describe('KanbanComponent', () => {
  let component: KanbanComponent;
  let fixture: ComponentFixture<KanbanComponent>;
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
      declarations: [KanbanComponent, IssueCardComponent],
      imports: [
        MatDialogModule,
        DragDropModule,
        MatIconModule,
        MatCardModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: IssueService, useValue: issueServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display issues when issues are available', async () => {
    const [issueCard] = await loader.getAllHarnesses(MatCardHarness);
    expect(await issueCard.getText()).toContain('testSummary');

    const priorityIconElement = await loader.getHarness(MatIconHarness);
    expect(await priorityIconElement.getName()).toEqual('arrow_upward');
    expect(fixture.debugElement.query(By.css('.critical'))).not.toBeNull();
  });

  it('#viewIssue opens dialog', async (done) => {
    issueServiceSpy.getAllIssues().subscribe((issues: Issue[]) => {
      component.viewIssue(issues[0]);
      expect(matDialogSpy.open).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
