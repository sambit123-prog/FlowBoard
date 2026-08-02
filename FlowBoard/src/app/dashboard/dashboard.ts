import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface DashboardSummary {
  title: string;
  value: string;
  hint: string;
  icon: string;
  link: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  summary: DashboardSummary[] = [];

  ngOnInit(): void {
    const tasks = JSON.parse(localStorage.getItem('flow-board-tasks') ?? '[]');
    const events = JSON.parse(localStorage.getItem('flow-board-events') ?? '[]');
    const completed = tasks.filter((task: { completed: boolean }) => task.completed).length;
    const pending = tasks.length - completed;

    this.summary = [
      { title: 'Open tasks', value: `${pending}`, hint: 'Pending action items', icon: 'task_alt', link: '/task-board', color: 'accent' },
      { title: 'Completed', value: `${completed}`, hint: 'Finished work this week', icon: 'check_circle', link: '/analytics', color: 'success' },
      { title: 'Events', value: `${events.length}`, hint: 'Upcoming deadlines and meetings', icon: 'event', link: '/calendar', color: 'warn' },
    ];
  }
}
