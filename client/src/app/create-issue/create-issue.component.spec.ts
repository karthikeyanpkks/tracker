import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { IssueService } from '../issue.service';

import { CreateIssueComponent } from './create-issue.component';

describe('CreateIssueComponent', () => {
  let component: CreateIssueComponent;
  let fixture: ComponentFixture<CreateIssueComponent>;
  let loader: HarnessLoader;
  let issueServiceSpy: jasmine.SpyObj<IssueService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateIssueComponent],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    issueServiceSpy = jasmine.createSpyObj('IssueService', ['createIssue']);
    fixture = TestBed.createComponent(CreateIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable create button when all fields have valid values', async () => {
    const [createIssueButton] = await loader.getAllHarnesses(
      MatButtonHarness.with({ text: 'Create' })
    );
    expect(await createIssueButton.isDisabled()).toEqual(true);
    const [prioritySelect, statusSelect] = await loader.getAllHarnesses(
      MatSelectHarness
    );
    component.issueForm.patchValue({
      summary: 'testSummary',
      description: 'testDescription',
    });
    await prioritySelect.open();
    const prioritySelectfirstOption = (await prioritySelect.getOptions())[0];
    await prioritySelectfirstOption.click();

    await statusSelect.open();
    const statusSelectfirstOption = (await statusSelect.getOptions())[0];
    await statusSelectfirstOption.click();

    expect(await createIssueButton.isDisabled()).toEqual(false);
  });

  it('should create an issue when create button is clicked', async () => {
    const [createIssueButton] = await loader.getAllHarnesses(
      MatButtonHarness.with({ text: 'Create' })
    );

    const [prioritySelect, statusSelect] = await loader.getAllHarnesses(
      MatSelectHarness
    );
    component.issueForm.patchValue({
      summary: 'testSummary',
      description: 'testDescription',
      priority: { name: 'Critical', value: 0, icon: 'testIcon' },
      status: { name: 'Open', value: 0 },
    });

    expect(await createIssueButton.isDisabled()).toEqual(false);

    issueServiceSpy.createIssue.and.returnValue(of(undefined));

    await createIssueButton.click();
  });
});
