import { Component, ViewChild } from '@angular/core';
import { DataFetchService } from '../services/data-fetch.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductData } from '../contants/models';
import { MatDialog } from '@angular/material/dialog';
import { TitlePopupComponent } from '../title-popup/title-popup.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  displayedColumns: string[] = [
    'title',
    'description',
    'price',
    'rating',
    'stock',
    'brand',
    'category',
  ];
  dataSource!: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  fetchedProductsList = [];
  pageSizeLimit = 5;

  constructor(
    private dataFetchService: DataFetchService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataFetchService.getProducts().subscribe((productRes: any) => {
      if (productRes) this.fetchProductData(productRes);
    });
  }

  fetchProductData(productRes: any) {
    if (productRes?.products?.length >= 0) {
      this.fetchedProductsList = productRes?.products || [];
      this.pageSizeLimit = productRes?.limit || 5;
      const tempProdList = this.dataFetchService.mapProductData(
        this.fetchedProductsList
      );
      this.dataSource = new MatTableDataSource(tempProdList);
      this.setPaginatorSort();
    }
  }

  setPaginatorSort() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(titleData: string) {
    console.log('titleData', titleData);

    this.dialog.open(TitlePopupComponent, {
      data: {
        title: titleData,
      },
    });
  }
}
