import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MetaDataService {

    constructor(private http: HttpClient) { }

    getMetaData(names: string[]): Observable<any> {
        return this.http.post('/api/metaData/getMetaData', { "names": names })
    }
}
