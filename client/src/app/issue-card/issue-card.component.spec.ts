import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatIconModule } from '@angular/material/icon';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { IssueCardComponent } from './issue-card.component';
import { By } from '@angular/platform-browser';

describe('IssueCardComponent', () => {
  let component: IssueCardComponent;
  let fixture: ComponentFixture<IssueCardComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueCardComponent],
      imports: [MatCardModule, MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render issue details', async () => {
    component.issue = {
      summary: 'testSummary',
      id: 1,
      description: 'testDescription',
      priority: 'Critical',
      status: 'Open',
      createdAt: 1234,
      lastUpdated: 1234,
    };
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.debugElement.query(By.css('p')).nativeElement.textContent).toEqual('testSummary');
    expect(fixture.debugElement.query(By.css('.critical')).nativeElement.textContent).toEqual('arrow_upward');
  });
});
