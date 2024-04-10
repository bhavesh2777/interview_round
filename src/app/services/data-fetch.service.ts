import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_PRODUCTS_URL } from '../contants/urls';
import { ProductData } from '../contants/models';

@Injectable({
  providedIn: 'root',
})
export class DataFetchService {
  constructor(private http: HttpClient) {}

  // This API fetches List of Products
  getProducts() {
    return this.http.get(GET_PRODUCTS_URL);
  }

  mapProductData(fetchedProductsList: any[]) {
    return fetchedProductsList.map((item: any) => {
      const tempProdObj: ProductData = {
        id: item.id || 0,
        title: item.title || '',
        description: item.description || '',
        price: item.price || 0,
        rating: item.title || 0,
        stock: item.stock || 0,
        brand: item.brand || '',
        category: item.category || '',
      };
      return tempProdObj;
    });
  }
}
