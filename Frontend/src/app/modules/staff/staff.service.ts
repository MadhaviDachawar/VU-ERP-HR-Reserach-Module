import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Staff } from './staff.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StaffService {

	private readonly url: string = "/api/staffs";

	constructor(private http: HttpClient) { }

	getStaffs(): Observable<Staff[]> {
		return this.http.get<Staff[]>(this.url);
	}

	createStaff(params: Staff): Observable<Staff> {
		const headers = new HttpHeaders();
		headers.append("enctype", "multipart/form-data");
		return this.http.post<Staff>(this.url, params, { headers: headers });
	}

	getStaff(id: string): Observable<Staff> {
		return this.http.get<Staff>(`${this.url}/${id}`);
	}

	getStaffByEN(employementNumber: string): Observable<Staff> {
		return this.http.get<any>(this.url + "/findByEn/" + employementNumber);
	}

	updateStaff(id: string, params: Staff): Observable<Staff> {
		return this.http.patch<Staff>(`${this.url}/${id}`, params);
	}

	updateStaffByEN(employmentNumber: string, params: any): Observable<any> {
		return this.http.post<any>(this.url + "/updateByEN", { employmentNumber: employmentNumber, data: params });
	}

	deleteStaff(id: string): Observable<Staff> {
		return this.http.delete<Staff>(`${this.url}/${id}`);
	}
}