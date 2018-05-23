import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {
  public femaleSelected: boolean = true;
  public maleSelected: boolean = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewContrl: ViewController) {
      this.femaleSelected = this.navParams.get("femaleSelected");
      this.maleSelected = this.navParams.get("maleSelected");
  }

  ionViewDidLoad() {
    console.log("IonViewDidLoad FilterModalPage");
  }

  closeModel(){
    let filterState: object = {
      femaleSelected: this.femaleSelected,
      maleSelected: this.maleSelected
    };
    this.viewContrl.dismiss(filterState);
    //this.navCtrl.pop();
  }

}
