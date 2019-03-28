import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialListComponent } from './social-list/social-list.component';
import { CompanyBusinessComponent } from './company-business/company-business.component';
import { PrivateBusinessComponent } from './private-business/private-business.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { MyPostComponent } from './post/post-my/my-post.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';

const routes: Routes = [
  {
    path: 'list',
    component: SocialListComponent
  },
  {
    path: 'business/:id',
    component: CompanyBusinessComponent
  },
  {
    path: 'private',
    component: PrivateBusinessComponent
  },
  {
    path: 'allpost',
    component: PostListComponent
  },
  {
    path: 'mypost',
    component: MyPostComponent
  },
  {
    path: 'edit/:id',
    component: PostEditComponent
  },
  {
    path: 'business',
    component: CompanyBusinessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
