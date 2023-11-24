import { Component } from '@angular/core';

type SortOption = {
  name: string;
  code: string;
  icon: string;
};

@Component({
  selector: 'app-browse-employees',
  templateUrl: './browse-employees.component.html',
  styleUrls: ['./browse-employees.component.scss'],
})
export class BrowseEmployeesComponent {
  sidebarVisible: boolean = false;
  rangeValues: number = 0;
  selectedSortOption: SortOption | undefined;
  sortOptions: SortOption[];

  ngOnInit() {
    this.sortOptions = [
      { name: 'Name Ascending', code: '+name', icon: 'pi pi-sort-amount-down' },
      { name: 'Name Descending', code: '-name', icon: 'pi pi-sort-amount-up' },
      { name: 'Salary Ascending', code: '+salary', icon: 'pi pi-sort-amount-down' },
      { name: 'Salary Descending', code: '-salary', icon: 'pi pi-sort-amount-up' },
    ];
  }
}
