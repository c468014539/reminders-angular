import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnlyShowErrorOnTouchMatcher } from '../common/OnlyShowErrorOnTouchMatcher';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent {
  @Input() editing: any;
  @Output() formSubmit = new EventEmitter<any>();

  matcher = new OnlyShowErrorOnTouchMatcher();


  reminderForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.reminderForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      date: ['', [Validators.required]],
      time: ['']
    });
  }

  ngOnChanges() {
    if (this.editing) {
      this.reminderForm.patchValue({
        title: this.editing.title,
        description: this.editing.description,
        date: this.editing.date,
        time: this.editing.time
      });
    }
  }

  onSubmit() {
    if (this.reminderForm.valid) {
      console.log('value:' + this.reminderForm.value);

      this.formSubmit.emit(this.formatForm(this.reminderForm.value));
      this.reminderForm.reset();    
    }
  }

  private formatForm(reminder: any) {
    let timeStr = reminder.time;
    if (reminder.time === '') {
      timeStr = '00:00';
    }

    let dateStr: string;
    const raw = reminder.date;

    if (raw instanceof Date) {
      const d = raw;
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      dateStr = `${y}-${m}-${dd}`;
    } else if (typeof raw === 'string') {
      // î@â õﬂ?ê• ISO éöïÑã¯ÅC?íºê⁄éÊ ÅgTÅh ëOñ ïîï™
      dateStr = raw.split('T')[0];
    } else {
      dateStr = '';
    }
    return { ...reminder, date: dateStr, time: timeStr };
  }



}
