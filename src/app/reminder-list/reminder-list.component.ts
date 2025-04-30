import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent {
  @Input() reminders: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  onEdit(reminder: any) {
    this.edit.emit(reminder);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
