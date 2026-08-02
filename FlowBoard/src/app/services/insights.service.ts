import { Injectable } from '@angular/core';
import { TaskItem } from './persistence.service';

@Injectable({ providedIn: 'root' })
export class InsightsService {
  constructor() {}

  getPrioritySuggestions(tasks: TaskItem[]): TaskItem[] {
    const openTasks = tasks.filter(task => !task.completed);
    return openTasks
      .map(task => ({ ...task, urgentScore: this.calculateUrgency(task) }))
      .sort((a, b) => b.urgentScore - a.urgentScore)
      .slice(0, 3);
  }

  calculateUrgency(task: TaskItem): number {
    const base = task.notes ? 10 : 5;
    const duePenalty = task.dueDate && new Date(task.dueDate) < new Date() ? 20 : 0;
    const titleWeight = task.title.length > 20 ? 5 : 2;
    return base + duePenalty + titleWeight;
  }

  predictOverdue(tasks: TaskItem[]): string[] {
    return tasks
      .filter(task => !task.completed && task.dueDate)
      .filter(task => new Date(task.dueDate) < new Date())
      .map(task => task.title);
  }

  computeStreak(user: { streak: number; lastCompleted?: string }, tasks: TaskItem[]): number {
    const completedToday = tasks.some(task => task.completed && task.dueDate === new Date().toISOString().split('T')[0]);
    return completedToday ? user.streak + 1 : user.streak;
  }
}
