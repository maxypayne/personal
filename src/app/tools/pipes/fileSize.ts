import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'fileSize'})

export class FileSizePipe implements PipeTransform {
  transform(value: any, ...args): any {
    console.log(args)
    return 'MB';
  }
}
