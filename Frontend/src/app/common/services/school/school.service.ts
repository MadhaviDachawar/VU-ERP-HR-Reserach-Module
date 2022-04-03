import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

interface SchoolBody {
    id?: string;
    facultyId: string;
    schoolName: string;
}

@Injectable({
    providedIn: 'root'
})
export class SchoolService {

    private readonly url: string = "/api/schools";

    constructor(private _http: HttpClient) { }

    getSchools(): Observable<any[]> {
        return this._http.get<any[]>(this.url);
    }

    createSchool(params: SchoolBody): Observable<any> {
        return this._http.post<any>(this.url, params);
    }

    getSchool(id: string): Observable<any> {
        return this._http.get<any>(`${this.url}/${id}`);
    }

    updateSchool(id: string, params: any): Observable<any> {
        return this._http.patch<any>(`${this.url}/${id}`, params);
    }

    deleteSchool(id: string): Observable<any> {
        return this._http.delete<any>(`${this.url}/${id}`);
    }

}