import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Vademecum } from './vademecum';


@Injectable({providedIn: 'root'})
export class VademecumService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    url: string = 'http://localhost:8080/api/vademecum';
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
    savePersona(vademecums: Vademecum): Observable<Vademecum>{
        return this._httpClient.post<Vademecum>(this.url+'/crear',vademecums);
      }
      
      obtenerListaPersona(): Observable<Vademecum[]> {
        return this._httpClient.get<Vademecum[]>(`${this.url}/listar`);
      }
    
      updatePersona(id: number, vademecums: Vademecum): Observable<object> {
        return this._httpClient.put(`${this.url}/actualizar/${id}`, vademecums);
      }
  
      
}
