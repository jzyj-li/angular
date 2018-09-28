import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  constructor() { }
  @Input ()src;
  @Input ()scrollTop;

  newSrc:string;

  ngOnInit() {}


}
