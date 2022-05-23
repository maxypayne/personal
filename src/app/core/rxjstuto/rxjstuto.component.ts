import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, interval, observable, Observable, of, Subscription } from "rxjs";
import { filter, map, take } from "rxjs/operators";
import { RxjstutoService } from "./rxjstuto.service";

@Component({
  selector: 'app-rxjstuto',
  templateUrl: './rxjstuto.component.html',
  styleUrls: ['./rxjstuto.component.scss']
})
export class RxjstutoComponent implements OnInit, AfterViewInit {
  @ViewChild('myDiv') myDiv: ElementRef;
  subscription: Subscription = new Subscription();
  test1 = Promise.resolve({name : 'max'});
  test2 = of('my name is max');
  constructor(private RxjsService: RxjstutoService) {
  }
  ngOnInit() {
    // const observer = {
    //   next: item => console.log(`Tout va bien ${item}`),
    //   error: err => console.log(`Oup une erreur ${err}`),
    //   complete: () => console.log('terminé plus rien'),
    // }
    // const stream = new Observable(observer => {
    //   observer.next('Ma boite 1');
    //   observer.next('Ma boite 2');
    //   observer.error(new Error());
    //   observer.next('Ma boite 3');
    //   observer.complete();
    // });
    const streamOf = of('item 1', 'item 2', 'item 3');
    const streamFrom = from(['item 1', 'item 2', 'item 3']);
    // // stream.subscribe(observer);
    // const subscription = stream.subscribe(
    //   item => console.log(`Tout va bien ${item}`),
    //   err => console.log(`Oup une erreur ${err}`),
    //   () => console.log('terminé plus rien'),
    // );
    // subscription.unsubscribe();
  }
  ngAfterViewInit() {
    console.log('here');
    const stream = fromEvent(this.myDiv.nativeElement, 'click').subscribe(console.log);
  }
  start(): void {
    const stream = interval(1000);
    // const stream = from(['item 1', 'item 2', 'item 3']);
    this.subscription.add(stream.subscribe(
      item => console.log(`Ma valeur ${item}`),
      err => console.log(`Oup une erreur ${err}`),
      () => console.log('terminé plus rien'),
    ))
    this.subscription.add(stream.subscribe(
      item => console.warn(`Ma valeur ${item}`),
      err => console.log(`Oup une erreur ${err}`),
      () => console.warn('terminé plus rien'),
    ))
  }
  stop() {
    this.subscription.unsubscribe();
  }
  operators() {
    of(1, 2,3).pipe(
      map(x => x * 2)
    ).subscribe(console.log);
    const obs = new Observable(subscriber => {
      subscriber.next(1)
    });
    obs.subscribe(x => {
      console.log({x})
    })
    //
    const double = (source: Observable<number>) => {
      // la source emet des next
      console.log(source)
      return new Observable(subscriber => {
        source.subscribe({
          next: value => subscriber.next(2 * value),
          error: err => subscriber.error(err),
          complete: () => subscriber.complete(),
        })
      })
    }
    // from([1,3,5]).pipe(double).subscribe(console.log)
    const stream = new Observable<number>(observer => {
      observer.next(1);
      observer.next(3);
      observer.next(7);
      observer.complete();
    });
    stream.pipe(double, double, take(2)).subscribe(console.log)
  }
  getTodos() {
    this.RxjsService.getTodos()
      .pipe(map((items : [{ id: number }]) => items.filter(this.filterArray)))
      .subscribe(this.handleSucces, this.handleErrors, this.handleComplete)
  }
  filterArray(arr: any) {
   return arr.filter(x => x.id > 20 && x.id < 50);
  }
  handleSucces(data) {
    console.log(data);
  }
  handleErrors(err) {
    console.log(err);
  }
  handleComplete() {
    console.log('Complete');
  }
  testObs() {
    const interact = source => new Observable(subscriber => {
      console.log('in interact')
      source.subscribe(data => {
        subscriber.next(data + ' from interact');
      })
    })
    const observable = new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next('This is from sub');
      }, 2000);
    });
    observable.pipe(interact).subscribe(data => {
      console.log(data);
    })
  }
}
