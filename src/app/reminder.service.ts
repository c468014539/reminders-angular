import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private baseUrl = 'https://reminder-api-o3ba.onrender.com/reminders';  // ë÷???ìIç@í[ API ínö¨

  constructor(private http: HttpClient) {}

  private getHeaders(tokens: any): HttpHeaders {
    return new HttpHeaders(tokens || {});
  }

  getReminders(tokens: any): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(this.baseUrl, {
      headers: this.getHeaders(tokens)
    }));
  }

  addReminder(reminder: any, tokens: any): Promise<any> {
    return lastValueFrom(this.http.post<any>(this.baseUrl, reminder, {
      headers: this.getHeaders(tokens)
    }));
  }

  updateReminder(id: number, reminder: any, tokens: any): Promise<any> {
    return lastValueFrom(this.http.put<any>(`${this.baseUrl}/${id}`, reminder, {
      headers: this.getHeaders(tokens)
    }));
  }

  deleteReminder(id: number, tokens: any): Promise<any> {
    return lastValueFrom(this.http.delete<any>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(tokens)
    }));
  }
}
