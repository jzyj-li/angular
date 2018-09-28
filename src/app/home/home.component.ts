import { Component, OnInit } from '@angular/core';
import {AppService} from "../service/app.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private appservice:AppService
  ) {}

  page:number = 1;
  count:number = 15;
  list:any[]=[];

  ngOnInit() {
    this.getList()
  }

  getList () {
    this.appservice.getList({page: this.page, count:this.count}).subscribe(data => {
      this.list.push(...data);
    })
  }

  onLoadMore(value) {
    this.page++;
    this.getList()
  }

}
