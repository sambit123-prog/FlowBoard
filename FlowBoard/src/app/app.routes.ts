import { Routes } from '@angular/router';
import { Analytics } from './analytics/analytics';
import { Calender } from './calender/calender';
import { Dashboard } from './dashboard/dashboard';
import { TaskBoard } from './task-board/task-board';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'task-board', component: TaskBoard },
  { path: 'calendar', component: Calender },
  { path: 'analytics', component: Analytics },
];
