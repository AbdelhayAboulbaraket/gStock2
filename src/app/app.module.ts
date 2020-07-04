import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UnitModule } from './unit/unit.module';
import { ProviderModule } from './provider/provider.module';
import { Warehouse } from './warehouse/model/warehouse';
import { WarehouseModule } from './warehouse/warehouse.module';
import { UserModule } from './user/user.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthHtppInterceptorService } from './authentification/services/basic-auth-htpp-interceptor.service';
import { StockModule } from './stock/stock.module';
import { MouvementModule } from './mouvement/mouvement.module';
import { InventoryModule } from './inventory/inventory.module';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProductModule,
    CategoryModule,
    UnitModule,
    ProviderModule,
    WarehouseModule,
    UserModule,
    AuthentificationModule,
    StockModule,
    MouvementModule,
    InventoryModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
})
export class AppModule {}
