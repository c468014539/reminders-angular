import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../reminder.service';
import { GoogleAuthService } from '../google-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private authService: GoogleAuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tokens = this.authService.getTokens();
    if (!this.tokens) {
      // 如果没有登录就跳走，逻辑可加
    } else {
      this.fetchAll();
    }
  }

  fetchAll() {
    this.reminderService.getReminders(this.tokens)
      .then(data => this.reminders = data)
      .catch(() => this.snackBar.open('加载提醒失败', '关闭', { duration: 3000 }));
  }

  handleSubmit(form: any) {
    const method = this.editing
      ? this.reminderService.updateReminder(this.editing.id, { ...form, id: this.editing.id }, this.tokens)
      : this.reminderService.addReminder({ ...form, id: this.getNewId() }, this.tokens);

    method.then(() => {
      this.snackBar.open(this.editing ? '更新成功' : '添加成功', '关闭', { duration: 3000 });
      this.editing = null;
      this.fetchAll();
    })
    .catch(() => this.snackBar.open(this.editing ? '更新失败' : '添加失败', '关闭', { duration: 3000 }));

  }

  handleEdit(reminder: any) {
    this.editing = reminder;
  }

  handleDelete(id: number) {
    this.reminderService.deleteReminder(id, this.tokens)
      .then(() => {
        this.snackBar.open('删除成功', '关闭', { duration: 3000 });
        this.fetchAll();
      })
      .catch(() => this.snackBar.open('删除失败', '关闭', { duration: 3000 }));
  }

  getNewId(): number {
    return this.reminders.length ? Math.max(...this.reminders.map(r => r.id)) + 1 : 1;
  }
}
