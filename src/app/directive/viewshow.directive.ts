/*
*
* 指令（属性型）图片懒加载
* */
import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit} from '@angular/core'


@Directive({
  selector: '[eleViewShow]'
})
export class ViewshowDirective {

  constructor(private el: ElementRef) {
  }

  @Input('eleViewShow') scrollTop: string;
  @Input() defaultSrc: string;

  ngOnChanges () {
    this.show()
  }
  show(): void {
    if (this.el.nativeElement.src) return;

    let ele = this.getParent(this.el.nativeElement)
    let top = ele.offsetTop - window.innerHeight;

    if (Number(this.scrollTop) > top) { // 是否在可视区域
      this.loadImg(this.defaultSrc).then(res => {
        this.el.nativeElement.src = this.defaultSrc
      })
    }
  }

  loadImg(src: string) {
    return new Promise((reslove, reject) => {
      var img = new Image()
      img.onload = () => {
        reslove(true)
      }
      img.src = src;
    })
  }


  // 获取一个没有定位属性的父级元素
  getParent(ele) {
    let eleParent = ele.offsetParent;
    while (true) {

      if (eleParent.nodeName == 'BODY') {
        break;
      } else {
        ele = eleParent;
        eleParent = eleParent.offsetParent;
      }
    }
    return ele;
  }
}
