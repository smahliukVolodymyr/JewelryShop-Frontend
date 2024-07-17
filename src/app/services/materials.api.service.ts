import { Material, ResponseMessage } from './../../types';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialsApiService {
  private apiURL = 'http://localhost:3000/api/materials';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getMaterials(): Observable<Material[]> {
    const headers = this.authService.generateHeader();
    return this.http.get<Material[]>(`${this.apiURL}/get`, { headers });
  }

  deleteMaterial(id: string): Observable<Material> {
    const headers = this.authService.generateHeader();
    return this.http.delete<Material>(`${this.apiURL}/delete/${id}`, {
      headers,
    });
  }
  addMaterial(material: Material): Observable<ResponseMessage> {
    const headers = this.authService.generateHeader();
    return this.http.post<ResponseMessage>(`${this.apiURL}/add`, material, {
      headers,
    });
  }
  editMaterial(material: Material): Observable<Material> {
    const headers = this.authService.generateHeader();
    return this.http.put<Material>(`${this.apiURL}/edit`, material, {
      headers,
    });
  }
}
