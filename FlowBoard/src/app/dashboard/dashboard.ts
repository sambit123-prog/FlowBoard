import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { InsightsService } from '../services/insights.service';
import { PersistenceService, UserProfile } from '../services/persistence.service';
import { CollaborationService } from '../services/collaboration.service';

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
  warnings: string[] = [];
  suggestedTasks: string[] = [];
  badgeLabel = 'New user';
  invites: number = 0;
  user: UserProfile | null = null;

  constructor(
    private persistence: PersistenceService,
    private insights: InsightsService,
    private collaboration: CollaborationService
  ) {}

  ngOnInit(): void {
    const tasks = this.persistence.loadTasks();
    const events = this.persistence.loadEvents();
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;

    this.user = this.persistence.loadUser();
    this.user.streak = this.insights.computeStreak(this.user, tasks);
    this.persistence.saveUser(this.user);

    this.warnings = this.insights.predictOverdue(tasks);
    this.suggestedTasks = this.insights.getPrioritySuggestions(tasks).map(task => task.title);
    this.invites = this.collaboration.getPendingInvites().length;

    this.badgeLabel = this.user.streak > 7 ? 'Productivity Master' : this.user.streak > 3 ? 'Task Streaker' : 'Getting Started';

    this.summary = [
      { title: 'Open tasks', value: `${pending}`, hint: 'Pending action items', icon: 'task_alt', link: '/task-board', color: 'accent' },
      { title: 'Completed', value: `${completed}`, hint: 'Finished work this week', icon: 'check_circle', link: '/analytics', color: 'success' },
      { title: 'Events', value: `${events.length}`, hint: 'Upcoming deadlines and meetings', icon: 'event', link: '/calendar', color: 'warn' },
    ];
  }
}
