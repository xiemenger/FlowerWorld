import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import "rxjs/add/operator/map";
import {ProductProvider} from "../../providers/product/product";
import { ProductDetailPage } from '../product-detail/product-detail';
import { FilterModalPage } from '../filter-modal/filter-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allProducts = [];
  private femaleSelected: boolean = true;
  private maleSelected: boolean = true;

  constructor(public navCtrl: NavController,
              private productsService: ProductProvider,
              private modelCtrl: ModalController) {

  }

  // Navigation guard, you can use this event to write code
  // the will determine if a user can enter a page even before
  // the navigatetion process begins.
  // This function expects a Boolean value to be returned.
  // Where return true 
  // ionViewCanEnter(){

  // }

  // Fires when all internals are set up and ready to go
  // Is great for one-time heavy lifting
  // Fires only once in the lift cycle of a page.
  ionViewDidLoad(){
    this.productsService.getProducts()
      .subscribe(data => {
        this.allProducts = data;
      }
      );
  }

  goToProductDetailPage(product){
    this.navCtrl.push(ProductDetailPage, {
      productDetails : product
    });
  }

  openFilterModal(){
    // A Modal is a content pane that goes over the user's current 
    // page. 
    // Usually it is used for making a choice or editing an item.
    let filterStateFromMainPage: object = {
      femaleSelected: this.femaleSelected,
      maleSelected: this.maleSelected
    }
    let openFilterModal = this.modelCtrl.create(FilterModalPage, filterStateFromMainPage);
    openFilterModal.onDidDismiss((filterState) => {
      this.femaleSelected = filterState.femaleSelected;
      this.maleSelected = filterState.maleSelected;
      this.productsService.getProducts()
        .subscribe(allProducts => {
          let products = allProducts;
          if (filterState.maleSelected && filterState.femaleSelected){
            this.allProducts = products;
          } else if (filterState.maleSelected){
            this.allProducts = products.filter((product) => {
              return product.gender !== "female";
            });
          } else if (filterState.femaleSelected){
            this.allProducts = products.filter((product) => {
              return product.gender !== "male";
            });
          } else {
            this.allProducts = [];
          }
        })
    });

    openFilterModal.present();
  }

  // Signals that start of the transition to bring the page into view
  // is greate for actions that are not dependent on visibility or
  // refreshing data for the view to be displayed.
  // ionViewWillEnter(){

  // }

  //
  // ionViewDidEnter(){

  // }

  // guard to determine if a user can actually leave a current page.
  // is a greate place to prompt users before they leave.
  // ionViewCanLeave(){

  // }

  // Signals that start of the transition to remove 
  // the page from the view
  // is a greate palce to prefetch data for the next page.
  // Fires every time a page is being navigated away from.
  // ionViewWillLeave(){

  // }

  // Singal that the page is no longer visible and has been left.
  // is a greate place to cancel all view updates and fire analytics.
  // Fire every time a page is being navigated away from.
  // ionViewDidLeave(){

  // }
  
  // Signals that the page will be unlaoded and removed from memory.
  // Is a greate place to unsubscribe from event listeners and observables.
  // Fires only once and page is destroyed.
  // ionViewWillUnload(){
    
  // }

}
