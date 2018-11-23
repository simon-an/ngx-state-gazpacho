import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatTooltipModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { HeaderWithSidenavComponent } from './components/header-with-sidenav/header-with-sidenav.component';
import { AddSafeItemDialogComponent } from './container/add-safe-item-dialog/add-safe-item-dialog.component';
import { SafeItemFormComponent } from './components/safe-item-form/safe-item-form.component';
import { FormsModule } from '@angular/forms';
import { LoginDialogComponent } from './container/login-dialog/login-dialog.component';
import { LoginComponent } from './container/login/login.component';
import { UserExistsDirective } from './directives/user-exists-validator.directive';
import { SpecialAdminValidatorDirective } from './directives/admin-email-validator.directive';
import { FileSizePipe } from './directives/file-size.pipe';
import { SafeListComponent } from './components/safe-list/safe-list.component';
import { SafeComponent } from './container/safe/safe.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromSafe from './store/safe/state';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('safe', fromSafe.reducers, { metaReducers: fromSafe.metaReducers }),
  ],
  declarations: [
    HeaderWithSidenavComponent,
    AddSafeItemDialogComponent,
    SafeItemFormComponent,
    LoginDialogComponent,
    LoginComponent,
    UserExistsDirective,
    SpecialAdminValidatorDirective,
    FileSizePipe,
    SafeListComponent,
    SafeComponent,
    ItemListComponent
  ],
  exports: [
    HeaderWithSidenavComponent,
    AddSafeItemDialogComponent,
    SafeItemFormComponent,
    MatFormFieldModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatTooltipModule,
    LoginDialogComponent,
    LoginComponent,
    MatProgressSpinnerModule,
    UserExistsDirective,
    SpecialAdminValidatorDirective,
    FileSizePipe,
    SafeComponent,
    SafeListComponent,
    ItemListComponent
  ],
  entryComponents: [AddSafeItemDialogComponent, LoginDialogComponent]
})
export class SharedModule {}
