import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Vagas } from 'src/libs/models/vagas.model';

@Injectable({
    providedIn: 'root',
})
export class VagasService implements OnDestroy {
    private url = `http://localhost:3000`;
    private unsubscribe$: Subject<void>;
    onUpdateVagas: Subject<void> = new Subject();

    constructor(
        private httpClient: HttpClient,
    ) {
        this.unsubscribe$ = new Subject();
        this.unsubscribe$.next();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getVagas(): Observable<Vagas[]> {
        return this.httpClient.get<Vagas[]>(`${this.url}/vagas`);
    }

    deleteVagas(id: number): Observable<Vagas> {
        return this.httpClient.delete<Vagas>(`${this.url}/vagas/${id}`);
    }

    createVagas(data: Vagas): Observable<Vagas> {
        const body = data;
        return this.httpClient.post<Vagas>(`${this.url}/vagas`, body, {});
    }

    updateVagas(data: Vagas, id: number): Observable<Vagas> {
        const body = data;
        return this.httpClient.put<Vagas>(`${this.url}/vagas/${id}`, body, {})
        .pipe(finalize(() => this.onUpdateVagas.next()));;
    }
}
