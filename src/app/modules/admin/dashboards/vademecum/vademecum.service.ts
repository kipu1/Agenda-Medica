import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Vademecum } from './vademecum';

@Injectable({providedIn: 'root'})
export class VademecumService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
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
    savePersona(vademecum: Vademecum): Observable<Vademecum>{
        return this._httpClient.post<Vademecum>(this.url+'/crear',vademecum);
      }
    
      buscarPersonaPorCedula(vademecum: string): Observable<boolean> {
        return this._httpClient.get<boolean>(`${this.url}/listar/${vademecum}`);
      }
    
      updatePersonaById(id: number, vademecum: Vademecum): Observable<object> {
        return this._httpClient.put(`${this.url}/actualizar/${id}`, vademecum);
      }
  
      obtenerListaResponsable(): Observable<Vademecum[]> {
        const url = `${this.url}/listarResponsables`;
        return this._httpClient.get<Vademecum[]>(url)
          .pipe(
            catchError(this.handleError) // Llama a la función handleError para manejar errores
          );
      }
    
      // Agrega una función para manejar errores
      private handleError(error: any): Observable<any> {
        // Aquí puedes personalizar cómo manejar los errores de la solicitud HTTP
    
        // Por ejemplo, puedes registrar el error en la consola
        console.error('Ocurrió un error en la solicitud HTTP:', error);
    
        // Devuelve un observable de error con una descripción personalizada
        return throwError('Ocurrió un error en la solicitud HTTP. Por favor, inténtalo de nuevo más tarde.');
      }
     
}
