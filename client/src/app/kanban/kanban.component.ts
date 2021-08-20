import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { STATUSES } from '../app.constants';
import { Issue } from '../app.interfaces';
import { IssueService } from '../issue.service';
import { ViewIssueComponent } from '../view-issue/view-issue.component';

export interface Lane {
  id: number;
  name: string;
  issues: Issue[];
}
@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit, OnDestroy {
  private issueList: Issue[];
  issueListSubscription: Subscription;
  lanes: Lane[];

  constructor(
    private issueService: IssueService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.issueListSubscription = this.issueService
      .getAllIssues()
      .subscribe((issues: Issue[] = []) => {
        this.issueList = [...issues];
        this.lanes = STATUSES.map((status, index) => {
          return {
            name: status,
            id: index,
            issues: this.getIssuesByStatus(status),
          };
        });
      });
  }

  getIssuesByStatus(status: string): Issue[] {
    return this.issueList.filter((issue: Issue) => issue.status === status);
  }

  drop(event: CdkDragDrop<Issue[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const issue: Issue = {
        ...event.item.data,
        status: STATUSES[event.container.id],
      };
      this.issueService
        .updateIssue(issue)
        .toPromise()
        .then(() => {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        })
        .catch(() => {
          this.snackBar.open('Browser storage unavailable!', null, {
            duration: 3000,
          });
        });
    }
  }

  viewIssue(issue: Issue): void {
    this.dialog.open(ViewIssueComponent, { width: '80vw', data: issue });
  }

  ngOnDestroy(): void {
    if (this.issueListSubscription) {
      this.issueListSubscription.unsubscribe();
    }
  }
}
