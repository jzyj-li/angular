import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
  constructor (
    private http: HttpClient
  ) {}

  baseUrl:string = 'http://localhost:3000';

  listUrl = `${this.baseUrl}/asimov/trending/now`;

  // 是否登录
  isLogin:boolean = false;

  // 获取文章列表
  getList (param){
    let url = this.listUrl + `?page=${param.page}&count=${param.count}`
    return this.http.get<any[]>(url)
  }

  // 获取热们主题
  getHot () {
    let url = `${this.baseUrl}/asimov/subscriptions/recommended_collections?except_collection_ids[]=95`;
    return this.http.get<any[]>(url)
  }

  // 获取专栏描述
  getThemeDes (id:{}) {
    let url = `${this.baseUrl}/static/themeDes`;
    return this.http.post<any>(url, id);
  }

  // 获取主题页文章列表
  getThemeArcList (param) {
    let url = `${this.baseUrl}/asimov/collections/slug/${param.id}/public_notes?page=${param.page}&count=${param.count}
    &order_by=${param.orderBy}`;
    return this.http.get<any>(url)
  }

  // 登录前验证
  captchas () {
    let url = `${this.baseUrl}/captchas/new?t=` + String(Date.now()) + '-' + String(Math.random().toString(36).substring(3,6))
    return this.http.get<any>(url)
  }

  // 详情
  articleDetail (id) {
    let url = `${this.baseUrl}/static/articleDet`;
    return this.http.post<any>(url,id);
  }

  // 作者信息
  authorInfo () {

  }

  // mmt 接口测试
  getTest () {

  }


}
