import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations'
import {AppService} from "../service/app.service";
//import geet from '../../assets/js/gt'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', animate('1000ms ease-in', style({
        transform: 'translateX(-100%)'
      }))),
      transition(':leave', animate('1000ms ease-out', style({
        transform: 'translateX(100%)'
      })))
    ])
  ]
})


export class LoginComponent implements OnInit {

  constructor(
    private appService: AppService
  ) { }
  state:string = 'true';
  show:Boolean = true;

  ngOnInit() {
    console.log()
  }

  // 登录
  login () {
    this.appService.captchas().subscribe(data => {
      console.log(data)
    })
  }
}
