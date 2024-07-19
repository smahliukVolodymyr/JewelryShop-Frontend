import { Material, ResponseMessage } from './../../types';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaterialsApiService {
  private readonly API_URL = environment.apiUrl;
  private readonly API_PATH = environment.materialsPath;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getMaterials(): Observable<Material[]> {
    const headers = this.authService.generateHeader();
    return this.http.get<Material[]>(`${this.API_URL + this.API_PATH}/get`, {
      headers,
    });
  }

  deleteMaterial(id: string): Observable<Material> {
    const headers = this.authService.generateHeader();
    return this.http.delete<Material>(
      `${this.API_URL + this.API_PATH}/delete/${id}`,
      {
        headers,
      }
    );
  }
  addMaterial(material: Material): Observable<ResponseMessage> {
    const headers = this.authService.generateHeader();
    return this.http.post<ResponseMessage>(
      `${this.API_URL + this.API_PATH}/add`,
      material,
      {
        headers,
      }
    );
  }
  editMaterial(material: Material): Observable<Material> {
    const headers = this.authService.generateHeader();
    return this.http.put<Material>(
      `${this.API_URL + this.API_PATH}/edit`,
      material,
      {
        headers,
      }
    );
  }
}
