import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aluno } from '../models/Aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  public baseUrl: string = environment.UrlPrincipal + '/api/aluno'

constructor(private http: HttpClient) { }

getAll(nada?: any): Observable<Aluno[]> {
  return this.http.get<Aluno[]>(this.baseUrl);
}
getById(id: number): Observable<Aluno> {
  return this.http.get<Aluno>(`${this.baseUrl}/${id}`);
}

post(aluno: Aluno) {
  return this.http.post(`${this.baseUrl}/`, aluno )
}

put(aluno: Aluno): any {
  return this.http.put(`${this.baseUrl}/${aluno.id}`, aluno)
}
delete(id: any) {
  return this.http.delete(`${this.baseUrl}/${id}`)
}



}
