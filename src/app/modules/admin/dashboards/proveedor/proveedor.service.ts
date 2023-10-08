import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Proveedor } from './proveedor';


@Injectable({providedIn: 'root'})
export class ProveedorService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    url: string = 'http://localhost:8080/api/proveedor';
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
    savePersona(proveedor: Proveedor): Observable<Proveedor>{
        return this._httpClient.post<Proveedor>(this.url+'/crear',proveedor);
      }
      
      obtenerListaPersona(): Observable<Proveedor[]> {
        return this._httpClient.get<Proveedor[]>(`${this.url}/listar`);
      }
    
      updatePersona(id: number, proveedor: Proveedor): Observable<object> {
        return this._httpClient.put(`${this.url}/actualizar/${id}`, proveedor);
      }
  
      
}
