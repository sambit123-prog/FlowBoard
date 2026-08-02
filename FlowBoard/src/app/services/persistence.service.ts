import { Injectable } from '@angular/core';

const TASK_KEY = 'flow-board-tasks';
const EVENT_KEY = 'flow-board-events';
const BOARD_KEY = 'flow-board-boards';
const USER_KEY = 'flow-board-user';

export interface TaskItem {
  id: number;
  title: string;
  notes: string;
  completed: boolean;
  dueDate?: string;
  owner?: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  notes: string;
  owner?: string;
}

export interface BoardInvite {
  id: number;
  boardId: string;
  email: string;
  accepted: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  streak: number;
  lastCompleted?: string;
}

export interface SyncChange {
  id: number;
  type: 'task' | 'event' | 'invite';
  payload: any;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class PersistenceService {
  constructor() {}

  saveTasks(tasks: TaskItem[]): void {
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  }

  loadTasks(): TaskItem[] {
    return JSON.parse(localStorage.getItem(TASK_KEY) ?? '[]');
  }

  saveEvents(events: CalendarEvent[]): void {
    localStorage.setItem(EVENT_KEY, JSON.stringify(events));
  }

  loadEvents(): CalendarEvent[] {
    return JSON.parse(localStorage.getItem(EVENT_KEY) ?? '[]');
  }

  saveBoards(boards: any[]): void {
    localStorage.setItem(BOARD_KEY, JSON.stringify(boards));
  }

  loadBoards(): any[] {
    return JSON.parse(localStorage.getItem(BOARD_KEY) ?? '[]');
  }

  saveUser(user: UserProfile): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  loadUser(): UserProfile {
    return JSON.parse(localStorage.getItem(USER_KEY) ?? JSON.stringify({ id: 'user-1', name: 'FlowBoard User', streak: 0 }));
  }

  queueSyncChange(change: SyncChange): void {
    const pending = JSON.parse(localStorage.getItem('flow-board-sync-queue') ?? '[]');
    pending.push(change);
    localStorage.setItem('flow-board-sync-queue', JSON.stringify(pending));
  }

  loadSyncQueue(): SyncChange[] {
    return JSON.parse(localStorage.getItem('flow-board-sync-queue') ?? '[]');
  }

  clearSyncQueue(): void {
    localStorage.removeItem('flow-board-sync-queue');
  }

  prepareEncryptedSync(): void {
    // Placeholder for encrypted sync hooks when a backend is added.
    console.log('Encrypted sync hooks are ready to be implemented.');
  }

  purgeLocalData(): void {
    localStorage.removeItem(TASK_KEY);
    localStorage.removeItem(EVENT_KEY);
    localStorage.removeItem(BOARD_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('flow-board-sync-queue');
  }
}
