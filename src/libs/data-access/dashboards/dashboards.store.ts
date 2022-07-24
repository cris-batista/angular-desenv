import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { DashboardsUsers } from 'src/libs/models/dashboards.model';

export interface DashboardsState {
    dashboardsName: string;
    dashboardsUsers: DashboardsUsers[];
    pageIndex: number;
    isLoading: boolean;
}

export function createInitialState(): DashboardsState {
    return {
        dashboardsName: '',
        dashboardsUsers: [],
        pageIndex: 0,
        isLoading: false,
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Dashboards' })
export class DashboardsStore extends EntityStore<DashboardsState> {
    constructor() {
        super(createInitialState());
    }
}
