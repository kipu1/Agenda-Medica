import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Doctor } from './doctor';

@Injectable({providedIn: 'root'})
export class DoctorService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    url: string = 'http://localhost:8080/api/doctor';
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any>
    {
        return this._httpClient.get('api/dashboards/finance').pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }
    savePersona(doctor: Doctor): Observable<Doctor>{
        return this._httpClient.post<Doctor>(this.url+'/crear',doctor);
      }
      
      obtenerListaPersona(): Observable<Doctor[]> {
        return this._httpClient.get<Doctor[]>(`${this.url}/listar`);
      }
    
      updatePersona(id: number, doctor: Doctor): Observable<object> {
        return this._httpClient.put(`${this.url}/actualizar/${id}`, doctor);
      }
  
      
}
