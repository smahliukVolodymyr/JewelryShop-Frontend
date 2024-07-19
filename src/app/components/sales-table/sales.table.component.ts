import { SaleItem } from './../../../types';
import { ButtonModule } from 'primeng/button';
import { SalesService } from './../../services/sales.service';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { SalesPopupComponent } from '../sales-popup/sales.popup.component';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';
import { LengthModifierPipe } from '../../pipes/length-modifier.pipe';

@Component({
  selector: 'app-sales-table',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    ToastModule,
    CommonModule,
    PaginatorModule,
    CustomCurrencyPipe,
    LengthModifierPipe,
    SalesPopupComponent,
  ],
  providers: [SalesService],
  templateUrl: './sales.table.component.html',
  styleUrl: './sales.table.component.scss',
})
export class SalesTableComponent implements OnInit {
  constructor(private salesService: SalesService) {}

  sales: SaleItem[] = [];

  ngOnInit() {
    this.salesService.sales$.subscribe((response: SaleItem[]) => {
      this.sales = response;
    });
    this.salesService.getSales();
  }

  formFullName(item: SaleItem): string {
    return `${item.buyerLastName} ${item.buyerFirstName[0]}.${item.buyerMiddleName[0]}.`;
  }

  addSaleItem(item: SaleItem) {
    this.salesService.addSaleItem(item);
  }
  deleteSaleItem(item: SaleItem) {
    this.salesService.deleteSaleItem(item._id!);
  }
  editSaleItem(item: SaleItem) {
    this.salesService.editSaleItem(item);
  }
}
