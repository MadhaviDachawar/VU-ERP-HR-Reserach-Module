import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

interface ProgrammeBody {
    id?: string;
    faculty: string;
    school: string;
    department: string;
    programmeName: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProgrammeService {

    private readonly url: string = "/api/programmes";

    constructor(private _http: HttpClient) { }

    getProgrammes(): Observable<any[]> {
        return this._http.get<any[]>(this.url);
    }

    createProgramme(params: any): Observable<any> {
        return this._http.post<any>(this.url, params);
    }

    getProgramme(id: string): Observable<any> {
        return this._http.get<any>(`${this.url}/${id}`);
    }

    updateProgramme(id: string, params: any): Observable<any> {
        return this._http.patch<any>(`${this.url}/${id}`, params);
    }

    deleteProgramme(id: string): Observable<any> {
        return this._http.delete<any>(`${this.url}/${id}`);
    }

}