import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { ProductService } from '../../service/product.service';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { Product } from 'src/app/module/shared/interface/product.type';
import { LoaderService } from 'src/app/module/shared/services/loader.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent extends BaseComponent implements OnInit {
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  products: Product[] = [];
  totalProducts: number = 0;
  constructor(
    private sharedService: SharedService,
    private productService: ProductService,
    private loaderService: LoaderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getProductList(this.pageSize, 0);
  }

  async getProductList(pageSize: number, pageIndex: number) {
    try {
      const data = {
        pageSize,
        pageIndex,
      };
      const res: ApiResponse<{ products: Product[]; totalProduct: number }> =
        await this.productService.getProductList(data);
      if (res.Succeed) {
        this.products = res.Content.products;
        this.totalProducts = res.Content.totalProduct;
      }
    } catch (error) {}
  }

  async pagination(event: any) {
    await this.getProductList(event.pageSize, event.pageIndex);
  }
}
