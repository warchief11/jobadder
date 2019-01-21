import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://private-76432-jobadder1.apiary-mock.com/';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {

    return this.http.get<T>(`${BASE_URL}${path}`, { params: params });
  }

  post(path: string, body: any = {}, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.post(
      `${BASE_URL}${path}`,
      body,
      {
        params: params
      }
    );
  }
}
