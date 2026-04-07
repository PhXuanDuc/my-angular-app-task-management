import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskFormComponent {
  @Output() add = new EventEmitter<Task>();

  taskForm;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: ['Todo', Validators.required]
    });
  }

  submitTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: this.taskForm.value.title || '',
      description: this.taskForm.value.description || '',
      status: (this.taskForm.value.status as 'Todo' | 'In Progress' | 'Done') || 'Todo',
      createdAt: new Date().toLocaleString()
    };

    this.add.emit(newTask);

    this.taskForm.reset({
      title: '',
      description: '',
      status: 'Todo'
    });
  }
}