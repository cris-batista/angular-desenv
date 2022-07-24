import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/libs/shared/shared.module';
import { DashboardsService } from '../../data-access/dashboards/dashboards.service'

import { DashboardsComponent } from './dashboards.component';

describe('DashboardsComponent', () => {
  let component: DashboardsComponent;
  let fixture: ComponentFixture<DashboardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
      ],
      providers: [
        { provide: DashboardsService },
    ],
      declarations: [ DashboardsComponent ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a getDashboards function', () => {
    const mock = {
      name: 'mockName',
      description: 'mockDescription',
    };
    const serviceStub: DashboardsService = TestBed.inject(DashboardsService);
    const serviceSpy = spyOn(serviceStub, 'getDashboards');

    component.getDashboards();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should have a getDashboardsUsers function', () => {
    const mock = {
      name: 'mockName',
      credential: 'mockCredential',
      address: 'mockAddress',
    };
    const serviceStub: DashboardsService = TestBed.inject(DashboardsService);
    const serviceSpy = spyOn(serviceStub, 'getDashboardsUsers');

    component.getDashboardsUsers();
    expect(serviceSpy).toHaveBeenCalled();
  });
});
