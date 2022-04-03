import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

interface DepartmentBody {
    id?: string;
    facultyId: string;
    schoolId: string;
    departmentName: string;
}

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    private readonly url: string = "/api/departments";

    constructor(private _http: HttpClient) { }

    getDepartments(): Observable<any> {
        return this._http.get<any>(this.url);
    }

    createDepartment(params: DepartmentBody): Observable<any> {
        return this._http.post<any>(this.url, params);
    }

    getDepartment(id: string): Observable<any> {
        return this._http.get<any>(`${this.url}/${id}`);
    }

    updateDepartment(id: string, params: any): Observable<any> {
        return this._http.patch<any>(`${this.url}/${id}`, params);
    }

    deleteDepartment(id: string): Observable<any> {
        return this._http.delete<any>(`${this.url}/${id}`);
    }

}

