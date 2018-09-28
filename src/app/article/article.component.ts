import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AppService} from "../service/app.service";

import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private http: AppService,
    private san: DomSanitizer
  ) { }

  data;
  ngOnInit() {
    this.getArticle()
  }

  // 获取文章详情
  getArticle () {
    let id = this.route.snapshot.paramMap.get('slug');
    this.http.articleDetail({id} ).subscribe(res => {
      this.data = this.san.bypassSecurityTrustHtml(res.note)
    })
  }
}
