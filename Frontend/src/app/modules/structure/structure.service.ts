import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StructureService {

    private readonly universityUrl: string = "/api/universitystructure";
    private readonly courseUrl: string = "/api/universitystructure";

    constructor(private http: HttpClient) { }

    // University Structure

    getUniversityStructure(): Observable<any> {
        return this.http.get<any>(this.universityUrl);
    }

    // Course Structure

    getCourseStructure(): Observable<any> {
        return this.http.get<any>(this.courseUrl);
    }

    // refs

    getStudents(): Observable<any> {
        return this.http.get<any>(this.universityUrl);
    }

    createStudent(params: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("enctype", "multipart/form-data");
        return this.http.post<any>(this.universityUrl, params, { headers: headers });
    }

    getStudent(id: string): Observable<any> {
        return this.http.get<any>(`${this.universityUrl}/${id}`);
    }

    updateStudent(id: string, params: any): Observable<any> {
        return this.http.patch<any>(`${this.universityUrl}/${id}`, params);
    }

    deleteStudent(id: string): Observable<any> {
        return this.http.delete<any>(`${this.universityUrl}/${id}`);
    }
}