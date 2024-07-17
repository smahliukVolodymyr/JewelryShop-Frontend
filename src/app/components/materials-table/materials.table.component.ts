import { MyMessageService } from './../../services/my.message.service';
import { MessageService } from 'primeng/api';
import { Material } from '../../../types';
import { TableModule } from 'primeng/table';
import { MaterialsApiService } from './../../services/materials.api.service';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../edit-popup-materials/edit.popup.materials.component';

@Component({
  selector: 'app-materials-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ToastModule,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
  ],
  providers: [MyMessageService, MessageService],
  templateUrl: './materials.table.component.html',
  styleUrl: './materials.table.component.scss',
})
export class MaterialsTableComponent {
  constructor(
    private materialsApiService: MaterialsApiService,
    private myMessageService: MyMessageService
  ) {}

  materials: Material[] = [];

  ngOnInit() {
    this.getMaterials();
  }

  getMaterials() {
    this.materialsApiService.getMaterials().subscribe({
      next: (response: Material[]) => {
        this.materials = response;
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

  deleteMaterial(material: Material) {
    this.materialsApiService.deleteMaterial(material._id!).subscribe({
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
