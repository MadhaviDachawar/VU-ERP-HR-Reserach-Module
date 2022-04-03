import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

interface ProgrammeDataYearlyBody {
    id?: string;
    faculty: string;
    school: string;
    department: string;
    SanctionedIntake: string;
    TotalAdmitted: string;
    DurationOfProgram: string;
    Fees: string;
    YearOfCommencement: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProgrammeServiceDataYearly {

    private readonly url: string = "/api/programmesDataYearly";

    constructor(private _http: HttpClient) { }

    getProgrammesyearly(): Observable<any[]> {
        return this._http.get<any[]>(this.url);
    }

    createProgrammeyearly(params: any): Observable<any> {
        return this._http.post<any>(this.url, params);
    }

    getProgrammeyearly(id: string): Observable<any> {
        return this._http.get<any>(`${this.url}/${id}`);
    }

    updateProgrammeyearly(id: string, params: any): Observable<any> {
        return this._http.patch<any>(`${this.url}/${id}`, params);
    }

    deleteProgrammeyearly(id: string): Observable<any> {
        return this._http.delete<any>(`${this.url}/${id}`);
    }

}