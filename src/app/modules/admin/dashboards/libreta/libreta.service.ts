import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Libreta } from './libreta';

@Injectable({providedIn: 'root'})
export class LibretaService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    url: string = 'http://localhost:8080/api/libreta';
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
        return this._httpClient.get('api/dashboards/analytics').pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }
    savePersona(libreta: Libreta): Observable<Libreta>{
        return this._httpClient.post<Libreta>(this.url+'/crear',libreta);
      }
      
      obtenerListaPersona(): Observable<Libreta[]> {
        return this._httpClient.get<Libreta[]>(`${this.url}/listar`);
      }
    
      updatePersona(id: number, libreta: Libreta): Observable<object> {
        return this._httpClient.put(`${this.url}/actualizar/${id}`, libreta);
      }
  
      
}