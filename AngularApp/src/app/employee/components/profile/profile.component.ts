import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const employeeId = this.route.snapshot.paramMap.get('id');
    console.log(employeeId);
  }
}
