import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JsonServerService {
  private readonly storagePrefix = 'browser-json-server:';

  private getKey(resource: string): string {
    return `${this.storagePrefix}${resource}`;
  }

  private load<T>(resource: string): T[] {
    const raw = localStorage.getItem(this.getKey(resource));
    if (!raw) {
      const empty: T[] = [];
      localStorage.setItem(this.getKey(resource), JSON.stringify(empty));
      return empty;
    }

    try {
      return JSON.parse(raw);
    } catch {
      const empty: T[] = [];
      localStorage.setItem(this.getKey(resource), JSON.stringify(empty));
      return empty;
    }
  }

  private save<T>(resource: string, items: T[]): void {
    localStorage.setItem(this.getKey(resource), JSON.stringify(items));
  }

  read<T>(resource: string): T[] {
    return this.load<T>(resource);
  }

  create<T extends { id: number }>(resource: string, item: T): T {
    const items = this.load<T>(resource);
    items.unshift(item);
    this.save(resource, items);
    return item;
  }

  update<T extends { id: number }>(resource: string, id: number, item: T): T | null {
    const items = this.load<T>(resource);
    const index = items.findIndex(entry => entry.id === id);
    if (index === -1) {
      return null;
    }
    items[index] = item;
    this.save(resource, items);
    return item;
  }

  delete(resource: string, id: number): boolean {
    const items = this.load<any>(resource);
    const filtered = items.filter((entry: any) => entry.id !== id);
    this.save(resource, filtered);
    return filtered.length !== items.length;
  }

  replace<T>(resource: string, items: T[]): void {
    this.save(resource, items);
  }

  clear(resource: string): void {
    localStorage.removeItem(this.getKey(resource));
  }
}
