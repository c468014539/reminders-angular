import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { GoogleAuthService } from '../google-auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  reminders: any[] = [];
  editing: any = null;
  tokens: any;

  constructor(
    private reminderService: ReminderService,
    private authService: GoogleAuthService
  ) {}

  ngOnInit(): void {
    this.tokens = this.authService.getTokens();
    if (!this.tokens) {
      // ”@‰Ê–v—L“o?A’µ‘–C??‰Â‰Á
    } else {
      this.fetchAll();
    }
  }

  fetchAll() {
    this.reminderService.getReminders(this.tokens)
      .then(data => this.reminders = data)
      .catch(e => console.error('‰Á?¸?', e));
  }

  handleSubmit(form: any) {
    const method = this.editing
      ? this.reminderService.updateReminder(this.editing.id, { ...form, id: this.editing.id }, this.tokens)
      : this.reminderService.addReminder({ ...form, id: this.getNewId() }, this.tokens);

    method.then(() => {
      this.editing = null;
      this.fetchAll();
    }).catch(e => console.error('•Û‘¶¸?', e));
  }

  handleEdit(reminder: any) {
    this.editing = reminder;
  }

  handleDelete(id: number) {
    this.reminderService.deleteReminder(id, this.tokens)
      .then(() => this.fetchAll())
      .catch(e => console.error('?œ¸?', e));
  }

  getNewId(): number {
    return this.reminders.length ? Math.max(...this.reminders.map(r => r.id)) + 1 : 1;
  }
}
