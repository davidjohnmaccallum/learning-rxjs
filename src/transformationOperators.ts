import { interval, of } from "rxjs";
import {
  buffer, bufferCount, bufferTime, bufferToggle, bufferWhen, concatMap, concatMapTo, exhaust, map, take, exhaustMap,
  expand, groupBy, mergeMap, reduce, mapTo, mergeMapTo, mergeScan, pairwise, pluck, scan, switchMap, switchMapTo
} from "rxjs/operators";

const log = console.log;

// buffer

if (false) {
  log('buffer');

  const obs$ = interval(100).pipe(
    buffer(interval(1000))
  );
  obs$.subscribe(log);


}

// bufferCount

if (false) {
  log('bufferCount');

  const obs$ = interval(100).pipe(
    bufferCount(10)
  );
  obs$.subscribe(log);

}

// bufferTime

if (false) {
  log('bufferTime');

  const obs$ = interval(100).pipe(
    bufferTime(1000)
  );
  obs$.subscribe(log);

}

// bufferToggle

if (false) {
  log('bufferToggle');

  // Every second start buffering. 
  // Buffer for 100ms, 200ms, 300ms, 400ms,
  const obs$ = interval(100).pipe(
    bufferToggle(interval(1000), i => {
      log(`buffering for ${i * 100} ms`);
      return interval(i * 100);
    })
  );
  obs$.subscribe(log);

}

// bufferWhen

if (false) {
  log('bufferWhen');

  const obs$ = interval(100).pipe(
    bufferWhen(() => {
      const bufferTime = Math.round(Math.random() * 1000);
      log(`bufferTime ${bufferTime}`);
      return interval(bufferTime);
    })
  );
  obs$.subscribe(log);

}
// concatMap

if (false) {
  log('concatMap');

  const obs$ = interval(1000).pipe(
    concatMap(i => of(`${i}.1`, `${i}.2`, `${i}.3`))
  );
  obs$.subscribe(log);

}
// concatMapTo

if (false) {
  log('concatMapTo');

  const obs$ = interval(1000).pipe(
    concatMapTo(of('x.0', 'x.1', 'x.2'))
  );
  obs$.subscribe(log);

}
// exhaust

if (false) {
  log('exhaust');

  const obs$ = interval(1000).pipe(
    map(i => interval(Math.random() * 500).pipe(
      map(j => `${i}.${j}`),
      take(5)
    ))
  );
  obs$.pipe(exhaust()).subscribe(log);

}
// exhaustMap

if (false) {
  log('exhaustMap');

  const obs$ = interval(1000).pipe(
    exhaustMap(i => interval(Math.random() * 500).pipe(
      map(j => `${i}.${j}`),
      take(5)
    ))
  );
  obs$.subscribe(log);

}
// expand

if (false) {
  log('expand');

  const obs$ = of(1).pipe(
    expand(x => of(x + 1)),
    take(5)
  );
  obs$.subscribe(log);

}
// groupBy

if (false) {
  log('groupBy');

  const obs$ = of(
    {
      productId: 12,
      quantity: 2,
      price: 50.99
    },
    {
      productId: 2,
      quantity: 1,
      price: 1.20
    },
    {
      productId: 12,
      quantity: 5,
      price: 50.99
    },
    {
      productId: 2,
      quantity: 20,
      price: 1.20
    },
  ).pipe(
    groupBy(it => it.productId),
    mergeMap(group$ => group$.pipe(reduce((acc, cur) => [...acc, cur], [])))
  );
  obs$.subscribe(log);

}
// map

if (false) {
  log('map');

  const obs$ = interval(1000).pipe(
    map(i => of(`${i}.0`, `${i}.1`, `${i}.2`))
  );
  obs$.subscribe(i$ => i$.subscribe(log));

}
// mapTo

if (false) {
  log('mapTo');

  const obs$ = interval(1000).pipe(
    mapTo(of(`x.0`, `x.1`, `x.2`))
  );
  obs$.subscribe(i$ => i$.subscribe(log));

}
// mergeMap

if (false) {
  log('mergeMap');

  const obs$ = interval(1000).pipe(
    mergeMap(i => of(`${i}.0`, `${i}.1`, `${i}.2`))
  );
  obs$.subscribe(log);

}
// mergeMapTo

if (false) {
  log('mergeMapTo');

  const obs$ = interval(1000).pipe(
    mergeMapTo(of(`x.0`, `x.1`, `x.2`))
  );
  obs$.subscribe(log);

}
// mergeScan

if (false) {
  log('mergeScan');

  const obs$ = interval(1000).pipe(
    mapTo(1),
    take(5),
    mergeScan((acc, value) => of(acc + value), 0)
  );

  obs$.subscribe(log);

}
// pairwise

if (false) {
  log('pairwise');

  const obs$ = interval(1000).pipe(take(5), pairwise());
  obs$.subscribe(log);

}
// partition

if (false) {
  log('partition');

  // This should work. It's straight from the docs: https://www.learnrxjs.io/learn-rxjs/operators/transformation/partition

  // const source = from([1, 2, 3, 4, 5, 6]);
  // //first value is true, second false
  // const [evens, odds] = source.pipe(partition(val => val % 2 === 0));
  // /*
  //   Output:
  //   "Even: 2"
  //   "Even: 4"
  //   "Even: 6"
  //   "Odd: 1"
  //   "Odd: 3"
  //   "Odd: 5"
  // */
  // merge(
  //   evens.pipe(map(val => `Even: ${val}`)),
  //   odds.pipe(map(val => `Odd: ${val}`))
  // ).subscribe(val => console.log(val));

}
// pluck

if (false) {
  log('pluck');

  const obs$ = of(
    {
      a: {
        b: 'bee'
      }
    },
    {
      a: {
        b: 'bee'
      }
    }
  ).pipe(
    pluck('a', 'b')
  );
  obs$.subscribe(log);

}
// scan

if (false) {
  log('scan');

  const sales$ = of(
    { productName: 'shoes', quantity: 2 },
    { productName: 'shirt', quantity: 2 },
    { productName: 'shoes', quantity: 2 },
    { productName: 'shoes', quantity: 2 },
    { productName: 'shirt', quantity: 2 },
    { productName: 'shirt', quantity: 2 },
    { productName: 'trousers', quantity: 2 },
    { productName: 'trousers', quantity: 2 },
  ).pipe(
    scan((acc: any, sale) => {

      // Is this a new product, if so add it to the aggregator
      if (acc[sale.productName] === undefined) acc[sale.productName] = { totalSales: 0 };

      // Increment the total sales quantity
      acc[sale.productName].totalSales += sale.quantity;

      return acc;

    }, {})
  );

  sales$.subscribe(log);

}
// switchMap

if (false) {
  log('switchMap');

  const obs$ = interval(1000).pipe(
    switchMap(i => interval(Math.random() * 500).pipe(
      map(j => `${i}.${j}`)
    ))
  );

  obs$.subscribe(log);

}
// switchMapTo

if (true) {
  log('switchMapTo');

  const obs$ = interval(1000).pipe(
    switchMapTo(interval(Math.random() * 500).pipe(
      map(j => `x.${j}`)
    ))
  );
  obs$.subscribe(log);

}
// window

if (false) {
  log('window');


}
// windowCount

if (false) {
  log('windowCount');


}
// windowTime

if (false) {
  log('windowTime');


}
// windowToggle

if (false) {
  log('windowToggle');


}
// windowWhen

if (false) {
  log('windowWhen');


}
