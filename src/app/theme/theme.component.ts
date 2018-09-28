import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AppService} from "../service/app.service";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})

export class ThemeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private appServeice: AppService,
    private router:Router
  ) {}
  id:string = '';
  info:{};
  list;
  tab = ['最新收录', '最新评论', '热门'];
  currentTabIndex:number = 1;
  cache: any[] = new Array(3);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('slug');
    this.getThemeDes();
    this.getList(1)
  };

  // 关注
  follow () {
    this.router.navigate(['/login'])
  };

  // 获取列表
  getList (i:number, isLoadMore?:boolean) {

    // 列表排列顺序
    let listOrder: string[] = ['added_at','commented_at','top'];
    let param = {
      page: 1,
      count: 10,
      id: this.id,
      orderBy: listOrder[i]
    };

    isLoadMore && param.page ++
    this.appServeice.getThemeArcList(param).subscribe(data => {
      this.list = data;
      this.cache[i] = data;
    })
  };

  // 获取主题描述
  getThemeDes () {
    this.appServeice.getThemeDes({id: this.id}).subscribe((data) => {
      this.info = data;
    })
  };

  // tab 切换
  clickTab (i) {
    this.currentTabIndex = i;

    if (this.cache[i]) {
      this.list = this.cache[i];
      return;
    }
    this.getList(i);
  };

  // 加载更多
  onLoadMore () {
    this.getList(this.currentTabIndex, true)
  }

}
