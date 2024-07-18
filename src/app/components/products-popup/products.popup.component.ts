import { MaterialsService } from './../../services/materials.service';
import { MaterialsApiService } from '../../services/materials.api.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product, Material, dropDownSelector } from '../../../types';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-products-popup',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    CommonModule,
    MultiSelectModule,
  ],
  templateUrl: './products.popup.component.html',
  styleUrl: './products.popup.component.scss',
})
export class ProductsPopupComponent implements OnInit {
  @Output() confirm = new EventEmitter<Product>();
  @Input() header!: string;
  @Input() icon!: string;
  @Input() severity: 'success' | undefined;
  @Input() showDropDown!: boolean;
  @Input() product: Product = {
    name: '',
    type: 'Bracelets',
    materials: [],
    price: 0,
    weight: 0,
  };

  visible: boolean = false;
  materials: dropDownSelector[] = [];

  ngOnInit() {
    if (this.showDropDown) {
      this.materialsService.materials$.subscribe((response: Material[]) => {
        response.map((material) => {
          this.materials.push({
            type: material.name,
            value: material._id!,
          });
        });
      });
      this.materialsService.getMaterials();
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private materialsService: MaterialsService
  ) {}

  types: dropDownSelector[] = [
    { type: 'Earrings', value: 'Earrings' },
    { type: 'Bracelets', value: 'Bracelets' },
    { type: 'Rings', value: 'Rings' },
    { type: 'Chains', value: 'Chains' },
    { type: 'Necklaces', value: 'Necklaces' },
    { type: 'Brooches', value: 'Brooches' },
    { type: 'Pendants', value: 'Pendants' },
  ];

  productForm: FormGroup = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9 ]+$'),
      ],
    ],
    type: [this.product.type],
    materials: [[''], [Validators.required]],
    weight: [0, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0.1)]],
  });

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    const { name, type, materials, price, weight } = this.productForm.value;
    const _id = this.product._id;
    const finalType = type.hasOwnProperty('value') ? type.value : type;
    const finalMaterials = materials.map((material: any) =>
      material.hasOwnProperty('value') ? material.value : material
    );
    this.confirm.emit({
      _id,
      name,
      type: finalType,
      materials: finalMaterials,
      price,
      weight,
    });
    this.productForm.reset();
    this.handleClick();
  }

  handleClick() {
    this.visible = !this.visible;
  }
}
