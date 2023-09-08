import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/module/shared/services/shared.service';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { ProductService } from '../../service/product.service';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { Product } from 'src/app/module/shared/interface/product.type';
import { LoaderService } from 'src/app/module/shared/services/loader.service';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { ValidatorService } from 'src/app/module/shared/utilities/validator.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent extends BaseComponent implements OnInit {
  appConstants = AppConstants;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  products: Product[] = [];
  totalProducts: number = 0;
  myModal: boolean = false;
  updateQuantityModal: boolean = false;
  modalHeight: string = 'auto';
  modalMaxHeight: string = 'calc(70% + 10rem)';
  selectedProduct: Partial<Product> = {};
  updateQuantityObj: Partial<{
    previousQuantity: number;
    newQuantity: number;
  }> = {};
  constructor(
    private sharedService: SharedService,
    private productService: ProductService,
    private loaderService: LoaderService,
    private validatorService: ValidatorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buttons.push(
      {
        type: AppConstants.SUCCESS,
        text: 'Save',
      },
      {
        type: AppConstants.DANGER,
        text: 'Cancel',
      },
      {
        type: AppConstants.INFO,
        text: 'Update quantity',
      }
    );
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
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  async pagination(event: any) {
    await this.getProductList(event.pageSize, event.pageIndex);
  }

  buttonCallback(event: any) {
    switch (event) {
      case 0:
        // on save
        break;
      case 1:
        // on cancel
        this.myModal = false;

        break;

      default:
        break;
    }
  }

  openModal(product: Product) {
    this.selectedProduct = JSON.parse(JSON.stringify(product));
    this.myModal = true;
  }

  openUpdateQuantityModal() {
    this.updateQuantityObj.previousQuantity = this.selectedProduct.quantity!;
    this.updateQuantityObj.newQuantity = 0;
    this.updateQuantityModal = true;
  }

  async updateProductQuantity() {
    try {
      const data = {
        sku: this.selectedProduct.sku,
        newQuantity: Number(this.updateQuantityObj.newQuantity),
      };

      await this.validatorService.validateGreaterThanZero(
        [['newQuantity', 'Add quantity']],
        data
      );
      const res: ApiResponse<String> =
        await this.productService.updateProductQuantity(data);
      if (res.Succeed) {
        this.sharedService.showSuccessToast(res.message!);
        this.updateQuantityModal = false;
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }
}
