import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/module/shared/interface/product.type';
import { User } from 'src/app/module/shared/interface/user.type';
import { BaseComponent } from 'src/app/module/shared/utilities/base.component';
import { UserService } from '../../service/user.service';
import { ApiResponse } from 'src/app/module/shared/interface/response.type';
import { AppConstants } from 'src/app/module/shared/utilities/app-constants';
import { UtilitiesService } from 'src/app/module/shared/utilities/utilities.service';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { SharedService } from 'src/app/module/shared/services/shared.service';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss'],
})
export class UserProductComponent extends BaseComponent implements OnInit {
  @ViewChild('template', { static: true }) template?: ElementRef;
  appConstants = AppConstants;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  products: Product[] = [];
  savedProducts: Product[] = [];
  totalProducts: number = 0;
  user: User = {};
  packagingType: string[] = ['Parcel', 'Large'];

  constructor(
    private router: Router,
    private userService: UserService,
    private utilitiesService: UtilitiesService,
    private sharedService: SharedService
  ) {
    super();
    if (this.router.getCurrentNavigation()?.extras?.state) {
      let data: any = this.router.getCurrentNavigation()?.extras?.state;
      this.user = data.data;
      this.getSelectedUserProduct(this.pageSize, this.pageIndex);
    } else {
      this.back();
    }
  }

  ngOnInit(): void {
    this.buttons.push({
      type: AppConstants.SUCCESS,
      text: 'Save',
    });
  }

  async getSelectedUserProduct(pageSize: number, pageIndex: number) {
    try {
      const data = {
        pageSize,
        pageIndex,
        selectedUserId: this.user.id,
      };
      const res: ApiResponse<{ products: Product[]; totalProduct: number }> =
        await this.userService.getSelectedUserProduct(data);
      if (res.Succeed) {
        this.products = res.Content.products;
        this.totalProducts = res.Content.totalProduct;
        this.savedProducts = JSON.parse(JSON.stringify(this.products));
      }
    } catch (error) {}
  }

  async pagination(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    await this.getSelectedUserProduct(event.pageSize, event.pageIndex);
  }

  changesProduct(product: Product, index: number) {
    return this.utilitiesService.compareObjects(
      this.savedProducts[index],
      product
    );
  }

  async updateProduct(product: Product, index: number) {
    try {
      const data = {
        productId: product.id,
        productWeight: product.weight ?? 0,
        productLocation: product.location ?? '',
        productPackaging: product.packaging ?? '',
        productQuantity: product.quantity ?? 0,
      };

      const res: ApiResponse<Product> =
        await this.userService.updateUserProductByAdmin(data);
      if (res.Succeed) {
        this.sharedService.showSuccessToast(res.message!);
        // product = res.Content;
        this.savedProducts[index] = res.Content;
        product = res.Content;
        // this.getSelectedUserProduct(this.pageSize, this.pageIndex);
      }
    } catch (error) {}
  }

  test() {
    const element = this.template!.nativeElement;

    html2canvas(element).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('template.pdf');
    });
  }
}
