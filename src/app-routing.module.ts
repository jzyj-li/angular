/*
*
* 路由
* */
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./app/home/home.component";
import {ArticleComponent} from "./app/article/article.component";
import {ThemeComponent} from "./app/theme/theme.component";
import {LoginComponent} from "./app/login/login.component";

const routes:Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'article/:slug', component: ArticleComponent},
  {path: 'theme/:slug', component: ThemeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: HomeComponent}
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
