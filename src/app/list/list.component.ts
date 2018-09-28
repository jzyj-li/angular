import {Component, OnInit, Input, EventEmitter, Output, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor() {
  }

  @Input() list;
  @Output() onLoadMore = new EventEmitter<boolean>();

  scrollTop: number = 0;

  ngOnInit() {
    this.listScroll()
  }

  ngOnDestory() {
    window.removeEventListener('scroll');
  }

  loadMore(value): void {
    this.onLoadMore.emit(true)
  }


  // 滚动事件
  listScroll(): void {
    let self = this;
    let fn = this.debouce(function () {
      self.scrollTop = document.documentElement.scrollTop
    }, 300)

    window.addEventListener('scroll', fn, false)
  }

  // 防抖
  debouce(fn, delay) {

    let current = null;
    return function () {
      clearTimeout(current);
      current = setTimeout(function () {
        fn()
      }, delay)
    }
  }
}





