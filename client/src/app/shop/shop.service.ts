import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseURrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let { brandId, typeId, sort, pageIndex, pageSize, search } = shopParams
    let params = new HttpParams()

    if (brandId !== 0) {
      params = params.append('brandId', brandId.toString())
    }
    if (typeId !== 0) {
      params = params.append('typeId', typeId.toString())
    }
    if (search) {
      params = params.append('search', search)
    }
    params = params.append('sort', sort)
    params = params.append('pageIndex', pageIndex.toString())
    params = params.append('pageSize', pageSize.toString())

    return this.http.get<IPagination>(this.baseURrl + 'products', { observe: 'response', params })
      .pipe(
        map(response => { return response.body }
        )
      )
  }
  getBrands() {
    return this.http.get<IBrand[]>(this.baseURrl + 'products/brands')
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseURrl + 'products/types')
  }
}
