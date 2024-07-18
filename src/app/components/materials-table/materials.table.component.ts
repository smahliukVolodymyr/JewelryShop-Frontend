import { MaterialsService } from './../../services/materials.service';
import { Material } from '../../../types';
import { TableModule } from 'primeng/table';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { MaterialsPopupComponent } from '../materials-popup/materials.popup.component';

@Component({
  selector: 'app-materials-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ToastModule,
    CommonModule,
    PaginatorModule,
    MaterialsPopupComponent,
  ],
  providers: [MaterialsService],
  templateUrl: './materials.table.component.html',
  styleUrl: './materials.table.component.scss',
})
export class MaterialsTableComponent {
  constructor(private materialsService: MaterialsService) {}

  materials: Material[] = [];

  ngOnInit() {
    this.getMaterials();
  }

  getMaterials() {
    this.materialsService.materials$.subscribe(
      (response) => (this.materials = response)
    );
    this.materialsService.getMaterials();
  }
  editMaterial(material: Material) {
    this.materialsService.editMaterial(material);
  }
  addMaterial(material: Material) {
    this.materialsService.addMaterial(material);
  }

  deleteMaterial(material: Material) {
    const id = material._id;
    this.materialsService.deleteMaterial(id!);
  }
}
