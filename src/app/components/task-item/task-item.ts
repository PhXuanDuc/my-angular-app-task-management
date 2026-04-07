import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<number>();
  @Output() statusChange = new EventEmitter<Task>();

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  changeStatus(status: 'Todo' | 'In Progress' | 'Done'): void {
    this.statusChange.emit({
      ...this.task,
      status
    });
  }
}