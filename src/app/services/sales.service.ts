import { MyMessageService } from './my.message.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SaleItem } from '../../types';
import { SalesApiService } from './sales.api.service';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private readonly salesSubject = new BehaviorSubject<SaleItem[]>([]);
  readonly sales$ = this.salesSubject.asObservable();

  constructor(
    private salesApiService: SalesApiService,
    private myMessageService: MyMessageService
  ) {}

  getSales() {
    this.salesApiService.getSales().subscribe({
      next: (response: SaleItem[]) => {
        this.salesSubject.next(response);
      },
      error: (err) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          err?.message || 'Error getting sales!'
        );
      },
    });
  }

  deleteSaleItem(id: string) {
    this.salesApiService.deleteSaleItem(id).subscribe({
      next: () => {
        this.myMessageService.showMessage(
          'success',
          'Success',
          'Sale item was deleted'
        );
        this.getSales();
      },
      error: (e) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          e.error.message || 'Error deleting sale item!'
        );
      },
    });
  }
  editSaleItem(item: SaleItem) {
    this.salesApiService.editSaleleItem(item).subscribe({
      next: () => {
        this.myMessageService.showMessage(
          'success',
          'Success',
          'Sale item data was changed'
        );
        this.getSales();
      },
      error: (e) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          e.error.message || 'Error editing sale item!'
        );
      },
    });
  }
  addSaleItem(item: SaleItem) {
    this.salesApiService.addSaleItem(item).subscribe({
      next: () => {
        this.myMessageService.showMessage(
          'success',
          'Success',
          'New sale item was created'
        );
        this.getSales();
      },
      error: (e) => {
        this.myMessageService.showMessage(
          'error',
          'Error',
          e.error.message || 'Error adding sale item!'
        );
      },
    });
  }
}
