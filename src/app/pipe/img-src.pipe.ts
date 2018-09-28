/*
*
* 管道 添加img src
* */
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'imgSrc'})

export class imgSrc implements PipeTransform {
  transform(value: string): string {
    return value + '?imageMogr2/auto-orient/strip|imageView2/1/w/160/h/160/format/webp'
  }
}
