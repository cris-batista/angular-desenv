import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { DashboardsUsers } from 'src/libs/models/dashboards.model';

import { DashboardsState, DashboardsStore } from './dashboards.store';

@Injectable({ providedIn: 'root' })
export class DashboardsQuery extends QueryEntity<DashboardsState> {
    dashboardsName$: Observable<string>;
    dashboardsUsers$: Observable<DashboardsUsers[]>;
    pageIndex$: Observable<number>;
    isLoading$: Observable<boolean>;

    constructor(store: DashboardsStore) {
        super(store)

        this.dashboardsName$ = this.select('dashboardsName');
        this.dashboardsUsers$ = this.select('dashboardsUsers');
        this.pageIndex$ = this.select('pageIndex');
        this.isLoading$ = this.select('isLoading');
    }
}
