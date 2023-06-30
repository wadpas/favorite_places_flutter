import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm: ElementRef
  products: IProduct[]
  brands: IBrand[]
  types: IType[]
  shopParams = new ShopParams()
  totalCount: number
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Lowest Price', value: 'priceAsc' },
    { name: 'Highest Price', value: 'priceDesc' }
  ]

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getTypes()
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data
      this.shopParams.pageIndex = response.pageIndex
      this.shopParams.pageSize = response.pageSize
      this.totalCount = response.count
    }, error => { console.log(error) })
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{ id: 0, name: 'All' }, ...response]
    }, error => { console.log(error) })
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{ id: 0, name: 'All' }, ...response]
    }, error => { console.log(error) })
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId
    this.shopParams.pageIndex = 1
    this.getProducts()
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId
    this.shopParams.pageIndex = 1
    this.getProducts()
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts()
  }

  onPageChanged(page: number) {
    if (this.shopParams.pageIndex !== page) {
      this.shopParams.pageIndex = page
      this.getProducts()
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value
    this.shopParams.pageIndex = 1
    this.getProducts()
    console.log(this.shopParams.search);

  }

  onReset() {
    this.searchTerm.nativeElement.value = ''
    this.shopParams = new ShopParams()
    this.getProducts()
  }

}
