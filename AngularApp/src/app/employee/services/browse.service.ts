import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient, private formService: FormService) {}
}
