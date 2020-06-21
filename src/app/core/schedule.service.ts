import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimesOfDay } from '../shared/models/timesOfDay';

const url = 'http://localhost:3000/schedule/';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getDay(id: number): Observable<TimesOfDay> {
    return this.http.get<Array<TimesOfDay>>(`${url}?id=${id}`).pipe(map((item: Array<TimesOfDay>) => item.length ? item.shift() : null));
  }

  postDay(tod: TimesOfDay): Observable<TimesOfDay> {
    return this.http.put<TimesOfDay>(url + tod.id, tod);
  }
}