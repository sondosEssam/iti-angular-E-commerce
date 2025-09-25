import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interface/iuser';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Http  {
  base_url : string = "http://localhost:3000";
  constructor(private http: HttpClient){}
  getUsers (): Observable<IUser[]>{
    return this.http.get<IUser[]>(`${this.base_url}/users`);
  }
  addUser(user:IUser): Observable<IUser>{
    return this.http.post<IUser>(`${this.base_url}/users`,user);
  }
  getUserByToken(token:string): Observable<IUser | null>{
    return this.http.get<IUser[]>(`${this.base_url}/users?token=${token}`).pipe(
      map(users => users[0] ?? null)
    );
  }
  updatePassword(user:IUser): Observable<IUser>{

    return this.http.put<IUser>(`${this.base_url}/users/${user.id}`,user);
}
}