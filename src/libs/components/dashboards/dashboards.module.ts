import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/libs/shared/shared.module';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardsComponent } from './dashboards.component';

@NgModule({
    declarations: [DashboardsComponent],
    imports: [
        CommonModule,
        DashboardsRoutingModule,
        SharedModule,
        HttpClientModule,
    ],
})
export class DashboardsModule {}
