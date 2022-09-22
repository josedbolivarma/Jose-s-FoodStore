import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './components/title/title.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { InputValidationComponent } from './components/input-validation/input-validation.component';
import { InputContainerComponent } from './components/input-container/input-container.component';
import { DefaultButtonComponent } from './components/default-button/default-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from '../products/products.module';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
       LoaderComponent,
       HeaderComponent,
       TitleComponent,
       NotFoundComponent,
       TextInputComponent,
       InputValidationComponent,
       InputContainerComponent,
       DefaultButtonComponent
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    TitleComponent,
    NotFoundComponent,
    TextInputComponent,
    InputValidationComponent,
    InputContainerComponent,
    DefaultButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
