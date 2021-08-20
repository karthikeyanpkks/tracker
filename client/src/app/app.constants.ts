export const STATUSES: string[] = ['Open', 'In Progress', 'Hold', 'Done'];

export const PRIORITIES: string[] = ['Critical', 'High', 'Medium', 'Low'];

export const PRIORITY_ICON: { [key: string]: string } = {
  Critical: 'arrow_upward',
  High: 'keyboard_arrow_up',
  Medium: 'keyboard_arrow_down',
  Low: 'arrow_downward',
};

export const DEFAULT_ISSUES = [
  {
    id: 1,
    summary: 'Click on an issue to view details.',
    description:
      'You can edit issue details here. Click on fields to edit them.',
    priority: 'Critical',
    status: 'Open',
    createdAt: Date.now(),
    lastUpdated: Date.now(),
  },
  {
    id: 2,
    summary: 'Drag issues to change status in Kanban view.',
    description:
      'You can change status of issues by dragging them into different lanes',
    priority: 'High',
    status: 'In Progress',
    createdAt: Date.now(),
    lastUpdated: Date.now(),
  },
  {
    id: 3,
    summary: 'Priority can be assigned to each issue.',
    description:
      'Click on any issue and change the priority from the dropdown. Each issue can have priority from Low to Critical',
    priority: 'Low',
    status: 'Hold',
    createdAt: Date.now(),
    lastUpdated: Date.now(),
  },
  {
    id: 4,
    summary: 'Delete an issue',
    description:
      'Click on delete icon to delete any issue',
    priority: 'Medium',
    status: 'Done',
    createdAt: Date.now(),
    lastUpdated: Date.now(),
  },
];
