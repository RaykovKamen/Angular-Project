import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { FilterPipe } from '../shared/filter.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { PageNotFoundPageComponent } from './page-not-found-page/page-not-found-page.component';

@NgModule({
  declarations: [
    CartComponent,
    ProductsComponent,
    FilterPipe,
    PageNotFoundPageComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
})
export class FeatureModule {}
