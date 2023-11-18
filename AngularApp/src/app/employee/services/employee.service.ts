import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getSkills() {
    const url = 'http://localhost:8000/api/skills';
    return this.http.get(url);
  }
}
