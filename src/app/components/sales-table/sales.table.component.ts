import { SaleItem } from './../../../types';
import { ButtonModule } from 'primeng/button';
import { SalesService } from './../../services/sales.service';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { SalesPopupComponent } from '../sales-popup/sales.popup.component';

@Component({
  selector: 'app-sales-table',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    ToastModule,
    CommonModule,
    PaginatorModule,
    SalesPopupComponent,
  ],
  providers: [SalesService],
  templateUrl: './sales.table.component.html',
  styleUrl: './sales.table.component.scss',
})
export class SalesTableComponent {
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
