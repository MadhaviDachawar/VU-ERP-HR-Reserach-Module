import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FacultyService {

    private readonly url: string = "/api/faculties";

    constructor(private _http: HttpClient) { }

    getFaculties(): Observable<any[]> {
        return this._http.get<any[]>(this.url);
    }

    createFaculty(params: any): Observable<any> {
        return this._http.post<any>(this.url, params);
    }

    getFaculty(id: string): Observable<any> {
        return this._http.get<any>(`${this.url}/${id}`);
    }

    updateFaculty(id: string, params: any): Observable<any> {
        return this._http.patch<any>(`${this.url}/${id}`, params);
    }

    deleteFaculty(id: string): Observable<any> {
        return this._http.delete<any>(`${this.url}/${id}`);
    }

}
