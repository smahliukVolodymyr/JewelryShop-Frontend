import { SalesService } from './../../services/sales.service';
import { ProductsService } from './../../services/products.service';
import { ButtonModule } from 'primeng/button';
import { dropDownSelector, SaleItem } from './../../../types';
import {
  Component,
  Output,
  Input,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-sales-popup',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    CommonModule,
    DropdownModule,
  ],
  templateUrl: './sales.popup.component.html',
})
export class SalesPopupComponent implements OnInit, OnChanges {
  @Output() confirm = new EventEmitter<SaleItem>();
  @Input() header!: string;
  @Input() icon!: string;
  @Input() severity: 'success' | undefined;
  @Input() showProductSelector!: boolean;
  @Input() saleItem: SaleItem = {
    product: '',
    saleDate: '',
    buyerFirstName: '',
    buyerLastName: '',
    buyerMiddleName: '',
    finalPrice: 0,
  };

  visible: boolean = false;
  products: dropDownSelector[] = [];

  ngOnInit() {
    if (this.showProductSelector) {
      this.resetProducts();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private salesService: SalesService
  ) {}

  commonValidators = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
    Validators.pattern('^[a-zA-Z0-9 ]+$'),
  ];

  salesForm: FormGroup = this.formBuilder.group({
    product: [, [Validators.required]],
    finalPrice: [0],
    buyerLastName: ['', this.commonValidators],
    buyerFirstName: ['', this.commonValidators],
    buyerMiddleName: ['', this.commonValidators],
  });

  ngOnChanges() {
    this.salesForm.patchValue(this.saleItem);
  }

  onConfirm() {
    const {
      product,
      finalPrice,
      buyerLastName,
      buyerFirstName,
      buyerMiddleName,
    } = this.salesForm.value;

    const _id = this.saleItem._id;
    const finalProduct = product.hasOwnProperty('value')
      ? product.value
      : product;

    this.confirm.emit({
      _id,
      product: finalProduct,
      finalPrice,
      buyerLastName,
      buyerFirstName,
      buyerMiddleName,
    });
    this.salesForm.reset();
    this.handleClick();
  }

  handleClick() {
    this.visible = !this.visible;
  }

  resetProducts() {
    this.productsService.products$.subscribe((products) => {
      this.salesService.sales$.subscribe((sales) => {
        const unsoldProducts = this.productsService.getUnsoldProducts(
          products,
          sales
        );
        this.products = unsoldProducts.map((product) => ({
          type: product.name,
          value: product._id!,
        }));
      });
    });

    this.productsService.getProducts();
  }
}
