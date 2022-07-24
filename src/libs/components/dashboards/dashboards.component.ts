import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardsQuery } from 'src/libs/data-access/dashboards/dashboards.query';
import { DashboardsService } from 'src/libs/data-access/dashboards/dashboards.service';
import { DashboardsUsers } from 'src/libs/models/dashboards.model';

@Component({
    selector: 'dashboards',
    templateUrl: './dashboards.component.html',
    styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit{
    isLoading$: Observable<boolean>;
    dashboardsName$: Observable<string>;
    dashboardsUsers$: Observable<DashboardsUsers[]>;
    pageIndex$: Observable<number>;

    constructor(
        private dashboardsService: DashboardsService,
        private dashboardsQuery: DashboardsQuery,
    ) {
        this.isLoading$ = this.dashboardsQuery.isLoading$;
        this.dashboardsName$ = this.dashboardsQuery.dashboardsName$;
        this.dashboardsUsers$ = this.dashboardsQuery.dashboardsUsers$;
        this.pageIndex$ = this.dashboardsQuery.pageIndex$;
    }

    ngOnInit(): void {
        this.getDashboards();
        this.getDashboardsUsers();

        this.dashboardsService.setPageIndex(5);
    }

    getDashboards(): void {
        this.dashboardsService.getDashboards();
    }

    getDashboardsUsers(): void {
        this.dashboardsService.getDashboardsUsers();
    }
}
