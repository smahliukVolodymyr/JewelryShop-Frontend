import { MaterialsApiService } from './materials.api.service';
import { Material } from './../../types';
import { MyMessageService } from './my.message.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  private materialsSubject = new BehaviorSubject<Material[]>([]);
  materials$ = this.materialsSubject.asObservable();

  constructor(
    private materialsApiService: MaterialsApiService,
    private myMessageService: MyMessageService
  ) {}

  getMaterials() {
    this.materialsApiService.getMaterials().subscribe({
      next: (response: Material[]) => {
        this.materialsSubject.next(response);
      },
      error: (err) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          err?.message || 'Error getting materials!'
        );
      },
    });
  }

  editMaterial(material: Material) {
    this.materialsApiService.editMaterial(material).subscribe({
      next: () => {
        this.myMessageService.showMessage(
          'success',
          'Success',
          'Material data changed'
        );
        this.getMaterials();
      },
      error: (e) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          e.error.message || 'Error editing material!'
        );
      },
    });
  }
  addMaterial(material: Material) {
    this.materialsApiService.addMaterial(material).subscribe({
      next: () => {
        this.myMessageService.showMessage(
          'success',
          'Success',
          'New material was created'
        );
        this.getMaterials();
      },
      error: (e) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          e.error.message || 'Error adding material!'
        );
      },
    });
  }
  deleteMaterial(id: string) {
    this.materialsApiService.deleteMaterial(id).subscribe({
      next: () => {
        this.myMessageService.showMessage(
          'success',
          'Success',
          'Material was deleted'
        );
        this.getMaterials();
      },
      error: (e) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          e.error.message || 'Error deleting material!'
        );
      },
    });
  }
}
