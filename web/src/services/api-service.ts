import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(private http: HttpClient) {}

	public getData(resourceUrl: string, params?: HttpParams): Observable<any> {
		return this.http.get(`${environment.baseUrl}/${resourceUrl}`, { params });
	}

	public postData(resourceUrl: string, data: any): Observable<any> {
		return this.http.post(`${environment.baseUrl}/${resourceUrl}`, data);
	}

	public deleteData(resourceUrl: string, params?: HttpParams): Observable<any> {
		return this.http.delete(`${environment.baseUrl}/${resourceUrl}`, { params });
	}

	public updateData(resourceUrl: string, data: any): Observable<any> {
		return this.http.put(`${environment.baseUrl}/${resourceUrl}`, data);
	}
}
