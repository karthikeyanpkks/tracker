import { Component, Input, OnInit } from '@angular/core';
import { PRIORITY_ICON } from '../app.constants';
import { Issue } from '../app.interfaces';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss'],
})
export class IssueCardComponent implements OnInit {
  @Input() issue: Issue;
  constructor() {}

  ngOnInit(): void {}

  getIcon(priority: string): string {
    return PRIORITY_ICON[priority];
  }
}
