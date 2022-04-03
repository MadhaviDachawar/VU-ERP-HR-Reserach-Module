import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AccountsService {

    private readonly url = "api/accounts"

    constructor(private http: HttpClient) { }

    getFeeStructures(): Observable<any> {
        return this.http.get(this.url + '/feeStructure/getFeeStructures')
    }

    saveFeeStructure(feeStructure: any): Observable<any> {
        return this.http.post(this.url + '/feeStructure/saveFeeStructure', { "feeStructure": feeStructure })
    }

}