import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const url = 'http://localhost:3000/schedule/';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getDay(id: number): Observable<any> {
    return this.http.get<any>(`${url}?id=${id}`).pipe(map(item => item.length ? item.shift() : null));
  }
}