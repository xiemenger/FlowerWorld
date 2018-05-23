import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ProductDetailPage } from '../product-detail/product-detail';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public bestSellerProducts = [];

  constructor(public navCtrl: NavController,
              public productService: ProductProvider) {

  }

  ionViewDidLoad(){
    this.productService.getProducts()
      .subscribe((allProduct) => {
        this.bestSellerProducts = allProduct.filter(product=> product.bestSeller==true);
      });
  }

  goToProductDtails(product){
    this.navCtrl.push(ProductDetailPage, {
      product:product
    });
  }
}
