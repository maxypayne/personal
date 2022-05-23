import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, filter, tap } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class RxjstutoService {
  url = 'https://jsonplaceholder.typicode.com/stodos';
  constructor(private http : HttpClient ) {
  }

  //this._http.get('someUrl',{
  //    headers: {'header1':'value1','header2':'value2'}
  // });
  //
  // (or)
  // let headers = new HttpHeaders().set('header1', headerValue1); // create header object
  // headers = headers.append('header2', headerValue2); // add a new header, creating a new object
  // headers = headers.append('header3', headerValue3); // add another header
  //
  // let params = new HttpParams().set('param1', value1); // create params object
  // params = params.append('param2', value2); // add a new param, creating a new object
  // params = params.append('param3', value3); // add another param
  //
  // return this._http.get<any[]>('someUrl', { headers: headers, params: params })
  getTodos(): Observable<[{id: number}] | []> {
    return this.http.get<[{id: number}] | []>(this.url).pipe(
      tap(todos => console.log('hotels: ', todos)),
      catchError(this.handlError),
    );
  }
  handlError(err): Observable<[]> {
    console.log(err);
    // return of([]);
    return throwError(err);
  }
}
