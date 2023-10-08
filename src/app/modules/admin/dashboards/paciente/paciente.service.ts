import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Paciente } from './paciente';


@Injectable({providedIn: 'root'})
export class PacienteService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    url: string = 'http://localhost:8080/api/paciente';
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
    savePersona(paciente: Paciente): Observable<Paciente>{
        return this._httpClient.post<Paciente>(this.url+'/crear',paciente);
      }
      
      obtenerListaPersona(): Observable<Paciente[]> {
        return this._httpClient.get<Paciente[]>(`${this.url}/listar`);
      }
    
      updatePersona(id: number, paciente: Paciente): Observable<object> {
        return this._httpClient.put(`${this.url}/actualizar/${id}`, paciente);
      }
  
      
}
