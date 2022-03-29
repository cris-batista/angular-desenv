import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatMenuModule,
        MatButtonModule
    ],
      declarations: [ LayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shound have redirectPageQuemSomos function', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.redirectPageQuemSomos();

    expect(component.redirectPageQuemSomos).toBeTruthy();
    expect(routerSpy).toHaveBeenCalledWith(`/quem-somos`);
  });

  it('shound have redirectPageHome function', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.redirectPageHome();

    expect(component.redirectPageHome).toBeTruthy();
    expect(routerSpy).toHaveBeenCalledWith(`/home`);
  });

  it('shound have redirectPageVagas function', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.redirectPageVagas();

    expect(component.redirectPageVagas).toBeTruthy();
    expect(routerSpy).toHaveBeenCalledWith(`/vagas`);
  });
});
