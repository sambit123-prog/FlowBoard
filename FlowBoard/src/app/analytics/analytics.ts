import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { PersistenceService } from '../services/persistence.service';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, MatCardModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class Analytics implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas?: ElementRef<HTMLCanvasElement>;

  completed = 0;
  pending = 0;
  totalTasks = 0;
  kpis: Array<{ label: string; value: string; hint: string }> = [];

  constructor(private persistence: PersistenceService) {}

  ngOnInit(): void {
    const tasks = this.persistence.loadTasks();
    this.totalTasks = tasks.length;
    this.completed = tasks.filter(task => task.completed).length;
    this.pending = this.totalTasks - this.completed;
    this.kpis = [
      { label: 'Completed tasks', value: `${this.completed}`, hint: 'Finished work items' },
      { label: 'Pending tasks', value: `${this.pending}`, hint: 'Still in progress' },
      { label: 'Total workload', value: `${this.totalTasks}`, hint: 'All tracked tasks' },
    ];
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  private renderChart(): void {
    if (!this.chartCanvas?.nativeElement) {
      return;
    }

    const config: ChartConfiguration<'doughnut', number[], unknown> = {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending'],
        datasets: [{ data: [this.completed, this.pending], backgroundColor: ['#4caf50', '#ff9800'] }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    };

    new Chart(this.chartCanvas.nativeElement, config);
  }
}
