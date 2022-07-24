import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { finalize, pluck, takeUntil } from 'rxjs/operators';
import { Dashboards, DashboardsData, DashboardsUsers } from 'src/libs/models/dashboards.model';
import { DashboardsStore } from './dashboards.store';

@Injectable({
    providedIn: 'root',
})
export class DashboardsService implements OnDestroy {
    private url = `http://localhost:3000`;
    private unsubscribe$: Subject<void>;

    constructor(
        private httpClient: HttpClient, private store: DashboardsStore
    ) {
        this.unsubscribe$ = new Subject();
        this.unsubscribe$.next();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    setDashboardsName(dashboardsName: string): void {
        this.store.update({
            dashboardsName,
        });
    }

    setDashboardsUsers(dashboardsUsers: DashboardsUsers[]): void {
        this.store.update({
            dashboardsUsers,
        });
    }

    setPageIndex(pageIndex: number): void {
        this.store.update({
            pageIndex,
        });
    }

    getDashboards(): void {
        this.httpClient
            .get<DashboardsData>(`${this.url}/general`)
            .pipe(
                takeUntil(this.unsubscribe$),
                pluck('data'),
            )
            .subscribe((response: Dashboards) => {
                this.setDashboardsName(response.name);
            });
    }

    getDashboardsUsers(): void {
        const timerUpdate = timer(1000);
        this.store.update({ isLoading: true });
        
        this.httpClient
            .get<DashboardsUsers[]>(`${this.url}/users`)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => {
                    this.store.update({ isLoading: false }),
                    timerUpdate.subscribe(() => this.setPageIndex(123));
                })
            )
            .subscribe((response: DashboardsUsers[]) => {
                this.setDashboardsUsers(response);
            });
    }
}
