
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {ListComponent} from "./list/list.component";
import {HotTopicComponent} from "./hot-topic/hot-topic.component";
import {DownloadComponent} from "./download/download.component";
import {ImgComponent} from "./img/img.component";
import {LoginComponent} from "./login/login.component";
import {ArticleComponent} from "./article/article.component";
import {ThemeComponent} from "./theme/theme.component";
import { AuthorHomeComponent } from './author-home/author-home.component';

// 服务
import {AppService} from "./service/app.service";

// 管道 过滤器
import {imgSrc} from "./pipe/img-src.pipe";

// 指令
import {ViewshowDirective} from "./directive/viewshow.directive";

// 路由
import {AppRoutingModule} from '../app-routing.module';



@NgModule({  // 程序入口
  declarations: [ // 声明所有自己写的东西 包括组件 管道
    AppComponent,
    HomeComponent,
    ListComponent,
    HotTopicComponent,

    ImgComponent,
    DownloadComponent,
    ArticleComponent,
    LoginComponent,

    AuthorHomeComponent,
    ThemeComponent,

    imgSrc,

    ViewshowDirective
  ],
  providers: [
    AppService
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
