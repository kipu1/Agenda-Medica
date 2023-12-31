import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Persona } from './persona';

@Injectable({providedIn: 'root'})
export class PersonaService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    url: string = 'http://localhost:8080/api/persona';
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
    savePersona(persona: Persona): Observable<Persona>{
        return this._httpClient.post<Persona>(this.url+'/crear',persona);
      }
      
      obtenerListaPersona(): Observable<Persona[]> {
        return this._httpClient.get<Persona[]>(`${this.url}/listar`);
      }
    
      updatePersona(id: number, persona: Persona): Observable<object> {
        return this._httpClient.put(`${this.url}/actualizar/${id}`, persona);
      }
  
      
}
