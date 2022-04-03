import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    private readonly url: string = "/api/students";

    constructor(private http: HttpClient) { }

    getStudents(): Observable<any[]> {
        return this.http.get<any[]>(this.url);
    }

    createStudent(params: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("enctype", "multipart/form-data");
        return this.http.post<any>(this.url, params, { headers: headers });
    }

    getStudent(id: string): Observable<any> {
        return this.http.get<any>(`${this.url}/${id}`);
    }

    getStudentBySRN(srn: string): Observable<any> {
        return this.http.get<any>(this.url + "/findbysrn/" + srn);
    }

    updateStudent(id: string, params: any): Observable<any> {
        return this.http.patch<any>(`${this.url}/${id}`, params);
    }

    updateStudentBySrn(srn: string, params: any): Observable<any> {
        return this.http.post<any>(this.url + "/updatebysrn", { srn: srn, data: params });
    }

    deleteStudent(id: string): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`);
    }
}