import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

interface TaskItem {
  id: number;
  title: string;
  notes: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-board',
  imports: [CommonModule, DragDropModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, FormsModule],
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
})
export class TaskBoard implements OnInit {
  tasks: TaskItem[] = [];
  newTitle = '';
  newNotes = '';

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = JSON.parse(localStorage.getItem('flow-board-tasks') ?? '[]');
  }

  saveTasks(): void {
    localStorage.setItem('flow-board-tasks', JSON.stringify(this.tasks));
  }

  addTask(): void {
    if (!this.newTitle.trim()) {
      this.snackBar.open('Task title is required.', 'Close', { duration: 2000 });
      return;
    }

    this.tasks.unshift({
      id: Date.now(),
      title: this.newTitle.trim(),
      notes: this.newNotes.trim(),
      completed: false,
    });
    this.newTitle = '';
    this.newNotes = '';
    this.saveTasks();
    this.snackBar.open('Task added.', 'Close', { duration: 1800 });
  }

  toggleComplete(task: TaskItem): void {
    task.completed = !task.completed;
    this.saveTasks();
  }

  removeTask(task: TaskItem): void {
    this.tasks = this.tasks.filter(item => item.id !== task.id);
    this.saveTasks();
    this.snackBar.open('Task removed.', 'Close', { duration: 1800 });
  }

  drop(event: CdkDragDrop<TaskItem[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }

    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    this.saveTasks();
  }
}
