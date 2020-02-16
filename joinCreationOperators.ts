import { of, combineLatest, interval, concat, forkJoin, merge, race, zip } from "rxjs";
import { map, mapTo } from "rxjs/operators";

const log = console.log;

// combineLatest

if (false) {
  log('combineLatest');

  const obs$ = combineLatest(
    interval(500),
    interval(1000),
    interval(1500),
  );
  obs$.subscribe(log);

}

// concat

if (false) {
  log('concat');

  const obs$ = concat(
    of(1, 2, 3),
    of(4, 5, 6)
  );
  obs$.subscribe(log);

}

// forkJoin

if (false) {
  log('forkJoin');

  const obs$ = forkJoin(
    of(1, 2, 3),
    of(4, 5, 6)
  );
  obs$.subscribe(log);

}

// merge

if (false) {
  log('merge');

  const obs$ = merge(
    interval(1000).pipe(map(it => `A ${it}`)),
    interval(1000).pipe(map(it => `B ${it}`)),
  );
  obs$.subscribe(log);

}

// race

if (false) {
  log('race');

  const obs$ = race(
    interval(1000).pipe(mapTo('A won')),
    interval(1000).pipe(mapTo('B won')),
  );
  obs$.subscribe(log);

}

// zip

if (true) {
  log('zip');

  const obs$ = zip(
    of('David', 'Peter', 'Paul'),
    of('Mac', 'Smith', 'Jones'),
    of(21, 40, 32),
  );
  obs$.subscribe(log);

}
