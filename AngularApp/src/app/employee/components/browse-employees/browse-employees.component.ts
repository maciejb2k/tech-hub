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
  filters: {
    salary: number[];
  };
  pagination: {
    page: number;
    first: number;
    rows: number;
  };
  search: {
    name: string;
  };
  sort: SortOption | undefined;
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
    filters: {
      salary: [1, 280000],
    },
    search: {
      name: '',
    },
    pagination: {
      page: 1,
      first: 0,
      rows: 10,
    },
    sort: null,
  };

  state: State = JSON.parse(JSON.stringify(this.initState));

  currentQueryParams: Params;
  results: EmployeePaginable;

  constructor(
    protected override loaderService: LoaderService,
    private browseService: BrowseService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(loaderService);

    this.subscriptions.push(
      this.route.queryParams
        .pipe(
          tap((params: QueryParams) => {
            this.currentQueryParams = params;
            this.queryParamsToState(params);
          }),
          switchMap(params => this.browseService.getEmployees(params))
        )
        .subscribe(data => {
          this.results = data;
        })
    );
  }

  // Methods for components in template

  setSearch() {
    this.updateQueryParams();
  }

  setSort() {
    if (!this.state.sort) return;

    this.updateQueryParams();
  }

  clearSort() {
    this.updateQueryParams();
  }

  setFilters() {
    this.sidebarVisible = false;
    this.updateQueryParams();
  }

  hasFilters() {
    return this.currentQueryParams['salary_min'] || this.currentQueryParams['salary_max'];
  }

  clearFilters() {
    this.sidebarVisible = false;
    this.state = {
      ...this.state,
      filters: { ...this.state.filters, ...this.initState.filters },
    };
    this.updateQueryParams();
  }

  setPagination(event: any) {
    this.state = {
      ...this.state,
      pagination: {
        ...this.state.pagination,
        page: event.page + 1,
        first: event.first,
        rows: event.rows,
      },
    };

    this.updateQueryParams();
  }

  // Method which updates the query params in the backend

  updateQueryParams() {
    const queryParams = this.stateToQueryParams();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }

  // Utility methods

  private queryParamsToState(params: QueryParams) {
    if (!params) return;

    if (params['salary_min'] || params['salary_max']) {
      this.state = {
        ...this.state,
        filters: {
          ...this.state.filters,
          salary: [Number(params['salary_min']), Number(params['salary_max'])],
        },
      };
    }

    if (params['name']) {
      this.state = {
        ...this.state,
        search: { ...this.state.search, name: params['name'] },
      };
    }

    if (params['sort_by'] && params['sort_direction']) {
      const sort = this.sortOptions.find(
        option => option.code === params['sort_by'] && option.direction === params['sort_direction']
      );

      this.state = {
        ...this.state,
        sort,
      };
    }

    if (params['per_page']) {
      this.state = {
        ...this.state,
        pagination: { ...this.state.pagination, rows: Number(params['per_page']) },
      };
    }

    if (params['page']) {
      this.state = {
        ...this.state,
        pagination: { ...this.state.pagination, page: Number(params['page']) },
      };
    }
  }

  private stateToQueryParams() {
    const queryParams: QueryParams = {};

    if (this.state.sort) {
      queryParams['sort_by'] = this.state.sort.code;
      queryParams['sort_direction'] = this.state.sort.direction;
    }

    if (
      this.state.filters.salary[0] !== this.initState.filters.salary[0] ||
      this.state.filters.salary[1] !== this.initState.filters.salary[1]
    ) {
      queryParams['salary_min'] = this.state.filters.salary[0];
      queryParams['salary_max'] = this.state.filters.salary[1];
    }

    if (this.state.search.name !== this.initState.search.name) {
      queryParams['name'] = this.state.search.name;
    }

    if (this.state.pagination.rows !== this.initState.pagination.rows) {
      queryParams['per_page'] = this.state.pagination.rows;
    }

    if (this.state.pagination.page !== this.initState.pagination.page) {
      queryParams['page'] = this.state.pagination.page;
    }

    return queryParams;
  }
}
