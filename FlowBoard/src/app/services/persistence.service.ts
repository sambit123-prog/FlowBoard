import { Injectable } from '@angular/core';
import { JsonServerService } from './json-server.service';

const TASK_KEY = 'flow-board-tasks';
const EVENT_KEY = 'flow-board-events';
const BOARD_KEY = 'flow-board-boards';
const USER_KEY = 'flow-board-user';
const SYNC_KEY = 'flow-board-sync-queue';

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
  constructor(private jsonServer: JsonServerService) {}

  private loadLegacyData<T>(legacyKey: string): T[] {
    const raw = localStorage.getItem(legacyKey);
    if (!raw) {
      return [];
    }
    try {
      return JSON.parse(raw) as T[];
    } catch {
      return [];
    }
  }

  saveTasks(tasks: TaskItem[]): void {
    this.jsonServer.replace<TaskItem>(TASK_KEY, tasks);
  }

  loadTasks(): TaskItem[] {
    const tasks = this.jsonServer.read<TaskItem>(TASK_KEY);
    if (!tasks.length) {
      const legacy = this.loadLegacyData<TaskItem>(TASK_KEY);
      if (legacy.length) {
        this.saveTasks(legacy);
        return legacy;
      }
    }
    return tasks;
  }

  saveEvents(events: CalendarEvent[]): void {
    this.jsonServer.replace<CalendarEvent>(EVENT_KEY, events);
  }

  loadEvents(): CalendarEvent[] {
    const events = this.jsonServer.read<CalendarEvent>(EVENT_KEY);
    if (!events.length) {
      const legacy = this.loadLegacyData<CalendarEvent>(EVENT_KEY);
      if (legacy.length) {
        this.saveEvents(legacy);
        return legacy;
      }
    }
    return events;
  }

  saveBoards(boards: any[]): void {
    this.jsonServer.replace<any>(BOARD_KEY, boards);
  }

  loadBoards(): any[] {
    return this.jsonServer.read<any>(BOARD_KEY);
  }

  saveUser(user: UserProfile): void {
    this.jsonServer.replace<UserProfile>(USER_KEY, [user]);
  }

  loadUser(): UserProfile {
    const users = this.jsonServer.read<UserProfile>(USER_KEY);
    return users.length ? users[0] : { id: 'user-1', name: 'FlowBoard User', streak: 0 };
  }

  queueSyncChange(change: SyncChange): void {
    const pending = this.jsonServer.read<SyncChange>(SYNC_KEY);
    pending.push(change);
    this.jsonServer.replace<SyncChange>(SYNC_KEY, pending);
  }

  loadSyncQueue(): SyncChange[] {
    return this.jsonServer.read<SyncChange>(SYNC_KEY);
  }

  clearSyncQueue(): void {
    this.jsonServer.clear(SYNC_KEY);
  }

  prepareEncryptedSync(): void {
    // Placeholder for encrypted sync hooks when a backend is added.
    console.log('Encrypted sync hooks are ready to be implemented.');
  }

  purgeLocalData(): void {
    this.jsonServer.clear(TASK_KEY);
    this.jsonServer.clear(EVENT_KEY);
    this.jsonServer.clear(BOARD_KEY);
    this.jsonServer.clear(USER_KEY);
    this.jsonServer.clear(SYNC_KEY);
  }
}
