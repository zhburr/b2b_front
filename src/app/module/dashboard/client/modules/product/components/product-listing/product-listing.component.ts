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
  pageIndex: number = 0;
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

  isLoading: boolean = false;
  fileToUpload: File | null = null;

  addProductModal: boolean = false;
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
      },
      {
        type: AppConstants.SUCCESS,
        text: 'Add',
      },
      {
        type: AppConstants.PRIMARY,
        text: 'Upload image',
      }
    );
    this.getProductList(this.pageSize, this.pageIndex);
  }

  async getProductList(pageSize: number, pageIndex: number) {
    try {
      const data = {
        pageSize,
        pageIndex,
      };
      const res: ApiResponse<{ products: Product[]; totalProduct: number }> =
        await this.productService.getProductList(data);

      this.isLoading = true;
      if (res.Succeed) {
        this.products = res.Content.products;
        this.totalProducts = res.Content.totalProduct;
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.isLoading = true;
      this.sharedService.showErrorToast(error.message);
    }
  }

  async pagination(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    await this.getProductList(event.pageSize, event.pageIndex);
  }

  async buttonCallback(event: any) {
    switch (event) {
      case 0:
        // on save
        await this.updateProduct();
        this.myModal = false;
        this.selectedProduct = {};
        this.fileToUpload = null;
        await this.getProductList(this.pageSize, this.pageIndex);
        break;
      case 1:
        // on cancel
        this.myModal = false;
        this.selectedProduct = {};

        break;

      default:
        break;
    }
  }

  openModal(product: Product) {
    this.selectedProduct = JSON.parse(JSON.stringify(product));
    this.fileToUpload = null;
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

  async updateProduct() {
    try {
      const data = {
        sku: this.selectedProduct.sku,
        title: this.selectedProduct.title,
        description: this.selectedProduct.description,
      };

      const res: ApiResponse<String> = await this.productService.updateProduct(
        data
      );
      if (res.Succeed) {
        this.sharedService.showSuccessToast(res.message!);
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  openFileInput() {
    document.getElementById('file')?.click();
  }

  checkFile(event: any) {
    const files: FileList = event.target.files;
    this.fileToUpload = files.item(0);

    if (!this.fileToUpload) {
      this.fileToUpload = null;
      this.selectedProduct.image = null;
      return;
    }

    this.convertToDataUrl(this.fileToUpload!);

    if (!this.fileToUpload?.name) {
      this.sharedService.showErrorToast('File name is required');
      this.fileToUpload = null;
      this.selectedProduct.image = null;
    }
  }

  convertToDataUrl(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedProduct.image = reader.result;
    };

    reader.readAsDataURL(file);
  }

  async uploadImage() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload!, this.fileToUpload!.name);
    formData.append('productSKU', this.selectedProduct.sku!);

    try {
      const res: ApiResponse<null> =
        await this.productService.uploadProductImage(formData);
      if (res.Succeed) {
        this.sharedService.showSuccessToast(res.message!);
        this.myModal = false;
        await this.getProductList(this.pageSize, this.pageIndex);
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }

  async addNewProduct() {
    try {
      const data = {
        Name: this.selectedProduct.title,
        SKU: this.selectedProduct.sku,
        Description: this.selectedProduct.description,
        Quantity: this.selectedProduct.quantity,
        Price: this.selectedProduct.price,
        Weight: this.selectedProduct.weight,
      };

      await this.validatorService.validateRequired(
        [
          ['SKU', 'SKU'],
          ['Name', 'Title'],
          ['Quantity', 'Quantity'],
          ['Price', 'Price'],
          ['Weight', 'Weight'],
        ],
        data
      );

      await this.validatorService.validateGreaterThanZero(
        [
          ['Quantity', 'Quantity'],
          ['Price', 'Price'],
          ['Weight', 'Weight'],
        ],
        data
      );

      const res: ApiResponse<null> = await this.productService.addNewProduct(
        data
      );
      if (res.Succeed) {
        this.sharedService.showSuccessToast(res.message!);
        this.addProductModal = false;
        this.selectedProduct = {};
      } else {
        this.sharedService.showErrorToast(res.message!);
      }
    } catch (error: any) {
      this.sharedService.showErrorToast(error.message);
    }
  }
}
