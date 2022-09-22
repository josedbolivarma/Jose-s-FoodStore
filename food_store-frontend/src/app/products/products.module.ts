import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TagsComponent } from './components/tags/tags.component';
import { SearchComponent } from './components/search/search.component';
import { TagsContainerComponent } from './containers/tags-container/tags-container.component';
import { RouterModule } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { SharedModule } from '../shared/shared.module';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    DetailPageComponent,
    CartPageComponent,
    TagsComponent,
    SearchComponent,
    TagsContainerComponent,
    CheckoutPageComponent,
  ],
  exports: [
    HomePageComponent,
    DetailPageComponent,
    CartPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class ProductsModule { }
