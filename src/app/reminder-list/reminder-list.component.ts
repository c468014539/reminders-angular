import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent implements OnInit {
  @Input() reminders: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  searchControl = new FormControl('');
  filteredReminders: any[] = [];
  filterOption = 'all';  // Default filter option: 'all'

  ngOnInit(): void {
    this.filteredReminders = this.reminders;
    this.sortReminders();

    this.searchControl.valueChanges.subscribe((searchText: string | null) => {
      const key = (searchText || '').toLowerCase();
      this.filterReminders(key);
    });
  }

  // Sort reminders by date and time
  sortReminders() {
    this.filteredReminders = this.reminders.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime();
      const dateB = new Date(`${b.date} ${b.time}`).getTime();
      return dateA - dateB; // Ascending order
    });
  }

  // Filter reminders based on search text and filter option
  filterReminders(searchText: string) {
    const keyword = (searchText || '').toLowerCase();
    this.filteredReminders = this.reminders.filter(r => {
      const title = (r.title || '').toLowerCase();
      const desc = (r.description || '').toLowerCase();
      const date = (r.date || '').toLowerCase();
      const time = (r.time || '').toLowerCase();
       const matched =  title.includes(keyword)
        || desc.includes(keyword)
        || date.includes(keyword)
        || time.includes(keyword);
      return matched && this.applyDateFilter(r);
    });
  }

  // Apply date filter based on the selected option (all, today, week, month)
  applyDateFilter(reminder: any) {
    const currentDate = new Date();
    const reminderDate = new Date(`${reminder.date} ${reminder.time}`);
    const dayStart = new Date(currentDate.setHours(0, 0, 0, 0));

    if (this.filterOption === 'all') {
      return true; // No filter
    } else if (this.filterOption === 'today') {
      return reminderDate >= dayStart && reminderDate <= currentDate;
    } else if (this.filterOption === 'week') {
      const startOfWeek = currentDate.getDate() - currentDate.getDay();
      const endOfWeek = startOfWeek + 6;
      const weekStart = new Date(currentDate.setDate(startOfWeek));
      const weekEnd = new Date(currentDate.setDate(endOfWeek));
      return reminderDate >= weekStart && reminderDate <= weekEnd;
    } else if (this.filterOption === 'month') {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      return reminderDate >= startOfMonth && reminderDate <= endOfMonth;
    }
    return false;
  }

  // Handle filter option change
  onFilterChange(option: string) {
    this.filterOption = option;
    const key = (this.searchControl.value || '').toLowerCase();
    this.filterReminders(key);  // Reapply filters
  }

  ngOnChanges(): void {
    this.sortReminders();
  }

  onEdit(reminder: any) {
    this.edit.emit(reminder);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
