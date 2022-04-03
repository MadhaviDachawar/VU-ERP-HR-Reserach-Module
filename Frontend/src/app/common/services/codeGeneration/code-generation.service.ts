import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CodeGenerationService {

    private readonly url: string = "/api/codegeneration";

    constructor(private http: HttpClient) { }

    generateEmployeeNumber(): Observable<any> {
        return this.http.get<any>(this.url + `/generateEN`);
    }

    generateSRN(): Observable<any> {
        return this.http.get<any>(this.url + `/generateSRN`);
    }

    generatePRN(): Observable<any> {
        return this.http.get<any>(`/generatePRN`);
    }

    generateFileName(): string {
        let currentTimeStamp = new Date()
        let fileName = ""

        fileName = currentTimeStamp.getFullYear().toString() + currentTimeStamp.getMonth().toString() + currentTimeStamp.getDay().toString() + currentTimeStamp.getHours().toString() + currentTimeStamp.getMinutes().toString() + currentTimeStamp.getSeconds().toString() + currentTimeStamp.getMilliseconds().toString()

        return fileName
    }
}