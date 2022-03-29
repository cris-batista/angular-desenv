import { Observable, of, Subject } from "rxjs";
import { Vagas } from "src/libs/models/vagas.model";

export class VagasServiceMock {
    onUpdateVagas: Subject<void> = new Subject();

    getVagas(): Observable<Vagas[]> {
        return of([{ title: 'title', type: 'type' }]);
    }

    deleteVagas(): Observable<Vagas> {
        return of({ title: 'title', type: 'type' });
    }

    createVagas(): Observable<void> {
        return of();
    }

    updateVagas(): Observable<void> {
        return of();
    }
}