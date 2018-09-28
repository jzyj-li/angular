import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service'

@Component({
  selector: 'app-hot-topic',
  templateUrl: './hot-topic.component.html',
  styleUrls: ['./hot-topic.component.css']
})
export class HotTopicComponent implements OnInit {

  constructor(private listService: AppService) {}
  hotClumn:any[];

  ngOnInit() {
    this.getHotClumn()
  }

  getHotClumn () {
    this.listService.getHot().subscribe(data => {
      this.hotClumn = [...data]
    })
  }

  changeHot () {
     this.getHotClumn()
  }

}
