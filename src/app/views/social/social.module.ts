import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { SocialRoutingModule } from './social-routing.module';
import { PostModule } from './post/post.module';

import { SocialListComponent } from './social-list/social-list.component';
import { CompanyBusinessComponent } from './company-business/company-business.component';
import { PrivateBusinessComponent } from './private-business/private-business.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    NgbModule,
    HttpClientModule,
    FileUploadModule,
    MultiselectDropdownModule,
    SharedPipesModule,
    SocialRoutingModule,
    PostModule
  ],
  declarations: [SocialListComponent, CompanyBusinessComponent, PrivateBusinessComponent]
})
export class SocialModule { }
