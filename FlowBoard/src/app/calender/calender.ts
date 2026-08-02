import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  notes: string;
}

@Component({
  selector: 'app-calender',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatSnackBarModule, MatIconModule],
  templateUrl: './calender.html',
  styleUrl: './calender.css',
})
export class Calender implements OnInit {
  events: CalendarEvent[] = [];
  title = '';
  notes = '';
  selectedDate: Date | null = new Date();

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.events = JSON.parse(localStorage.getItem('flow-board-events') ?? '[]');
  }

  saveEvents(): void {
    localStorage.setItem('flow-board-events', JSON.stringify(this.events));
  }

  addEvent(): void {
    if (!this.title.trim() || !this.selectedDate) {
      this.snackBar.open('Please enter both a title and a date.', 'Close', { duration: 2200 });
      return;
    }

    this.events.unshift({
      id: Date.now(),
      title: this.title.trim(),
      date: this.selectedDate.toISOString().split('T')[0],
      notes: this.notes.trim(),
    });
    this.title = '';
    this.notes = '';
    this.selectedDate = new Date();
    this.saveEvents();
    this.snackBar.open('Event added.', 'Close', { duration: 1800 });
  }

  removeEvent(eventItem: CalendarEvent): void {
    this.events = this.events.filter(item => item.id !== eventItem.id);
    this.saveEvents();
    this.snackBar.open('Event removed.', 'Close', { duration: 1800 });
  }
}
