import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent {
  @Input() editing: any;
  @Output() formSubmit = new EventEmitter<any>();
  
  reminderForm: FormGroup;
  constructor(private fb: FormBuilder){
    this.reminderForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      date: ['', [Validators.required]],
      time: ['']
    });
  }

  ngOnChanges(){
    if (this.editing){
      this.reminderForm.patchValue({
        title: this.editing.title,
        description: this.editing.description,
        date: this.editing.date,
        time: this.editing.time
      });
    }
  }

  onSubmit(){
    if(this.reminderForm.valid) {
      this.formSubmit.emit(this.reminderForm.value);

      if(!this.editing){
        this.reminderForm.reset();
      }
    }
  }




}
