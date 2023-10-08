import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Historias } from './historias';

@Injectable({providedIn: 'root'})
export class HistoriasService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    url: string = 'http://localhost:8080/api/historias';
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
    savePersona(historias: Historias): Observable<Historias>{
        return this._httpClient.post<Historias>(this.url+'/crear',historias);
      }
      
      obtenerListaPersona(): Observable<Historias[]> {
        return this._httpClient.get<Historias[]>(`${this.url}/listar`);
      }
    
      updatePersona(id: number, historias: Historias): Observable<object> {
        return this._httpClient.put(`${this.url}/actualizar/${id}`, historias);
      }
  
      
}
