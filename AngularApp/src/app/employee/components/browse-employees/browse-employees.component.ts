import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { BrowseService } from '../../services/browse.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeBrowse, EmployeePaginable } from '../../interfaces/employee.interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { DropdownChangeEvent } from 'primeng/dropdown';

type SortOption = {
  name: string;
  code: string;
  direction: string;
};

type State = {
  sort: SortOption | undefined;
  salary: number[];
  name: string;
  per_page: number;
  page: number;
};

type QueryParams = {
  sort_by?: string;
  sort_direction?: string;
  salary_min?: number;
  salary_max?: number;
  name?: string;
  page?: number;
  per_page?: number;
};

@Component({
  selector: 'app-browse-employees',
  templateUrl: './browse-employees.component.html',
  styleUrls: ['./browse-employees.component.scss'],
})
export class BrowseEmployeesComponent extends BaseComponent {
  sidebarVisible: boolean = false;
  sortOptions: SortOption[] = [
    { name: 'Name Ascending', code: 'first_name', direction: 'asc' },
    { name: 'Name Descending', code: 'first_name', direction: 'desc' },
    { name: 'Salary Ascending', code: 'expected_salary', direction: 'asc' },
    { name: 'Salary Descending', code: 'expected_salary', direction: 'desc' },
  ];

  initState: State = {
    sort: null,
    salary: [1, 280000],
    name: '',
    per_page: 10,
    page: 1,
  };
  state: State = { ...this.initState };

  currentQueryParams: Params;
  results: EmployeePaginable;

  first = 0;

  constructor(
    protected override loaderService: LoaderService,
    private browseService: BrowseService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParams
        .pipe(
          tap((params: QueryParams) => {
            this.currentQueryParams = params;
            this.state = this.updateStateFromQueryParams(params);
          }),
          switchMap(params => this.browseService.getEmployees(params))
        )
        .subscribe(data => {
          this.results = data;
        })
    );
  }

  updateStateFromQueryParams(params: QueryParams) {
    const sort =
      this.sortOptions.find(
        option => option.code === params['sort_by'] && option.direction === params['sort_direction']
      ) || this.state.sort;

    const salary = [
      Number(params['salary_min']) || this.state.salary[0],
      Number(params['salary_max']) || this.state.salary[1],
    ];

    const name = params['name'] || this.state.name;

    const page = params['page'] || this.state.page;
    const per_page = params['per_page'] || this.state.per_page;

    return {
      ...params,
      sort,
      salary,
      name,
      page,
      per_page,
    };
  }

  setSearch() {
    this.updateQueryParams();
  }

  setSort(event: DropdownChangeEvent) {
    if (!this.state.sort) return;

    this.updateQueryParams();
  }

  setFilters() {
    this.sidebarVisible = false;
    this.updateQueryParams();
  }

  clearSort() {
    this.updateQueryParams();
  }

  setPagination(event: any) {
    const page = event.page + 1;

    console.log(event);
    if (this.state.page === page) return;

    this.first = event.first;

    this.state = { ...this.state, page };

    this.updateQueryParams();
  }

  hasFilters() {
    return this.currentQueryParams['salary_min'] || this.currentQueryParams['salary_max'];
  }

  clearFilters() {
    this.state = { ...this.state, salary: [1, 280000] };
    this.updateQueryParams();
  }

  updateQueryParams() {
    const updatedParams: QueryParams = {};

    if (this.state.sort && this.state.sort !== this.initState.sort) {
      updatedParams['sort_by'] = this.state.sort.code;
      updatedParams['sort_direction'] = this.state.sort.direction;
    }

    if (
      this.state.salary[0] !== this.initState.salary[0] ||
      this.state.salary[1] !== this.initState.salary[1]
    ) {
      updatedParams['salary_min'] = this.state.salary[0];
      updatedParams['salary_max'] = this.state.salary[1];
    }

    if (this.state.name && this.state.name !== this.initState.name) {
      updatedParams['name'] = this.state.name;
    }

    if (this.state.per_page !== this.initState.per_page) {
      updatedParams['per_page'] = this.state.per_page;
    }

    updatedParams['page'] = this.state.page;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
    });
  }
}
