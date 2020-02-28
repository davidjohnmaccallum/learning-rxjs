import { ajax } from 'rxjs/ajax';
import { mergeMap } from 'rxjs/operators';
import { get } from 'request';
import * as fetch from 'node-fetch';
import { concat, Observable, bindCallback, bindNodeCallback, defer, of, empty, EMPTY, interval, from, fromEvent, fromEventPattern, generate, range, throwError, timer, iif } from 'rxjs';
const log = console.log;

// Creation Operators
// ==================

// ajax

if (false) {
  // Only works in browser
  const obs$ = ajax('http://localhost:3000');
  obs$.subscribe(log);
}

// bindCallback

if (true) {
  log('bindCallback');

  get('http://localhost:3000', (err, res) => {
    console.log('get with callback', res.body)
  });
  get('http://localhost:3001', (err, res) => {
    console.log('get with callback error', err)
  });

  const getAsObs: (url) => Observable<any> = bindCallback(get);
  getAsObs('http://localhost:3000').subscribe({
    next: (res) => {
      log('bindCallback next', res[1].body);
    },
    error: (err) => {
      // Will never get called
    },
    complete: () => {
      log('bindCallback complete');
    }
  });

  getAsObs('http://localhost:3001').subscribe({
    next: (res) => {
      log('bindCallback next with error', res);
    },
    error: (err) => {
      // Will never get called
    },
    complete: () => {
      log('bindCallback complete');
    }
  });

}

// bindNodeCallback

if (false) {
  log('bindNodeCallback');

  get('http://localhost:3000', (err, res) => {
    console.log('get with callback', res.body);
  });
  get('http://localhost:3001', (err, res) => {
    console.log('get with callback error', err);
  });

  const getAsObs = bindNodeCallback(get);
  getAsObs('http://localhost:3000').subscribe({
    next: res => {
      console.log('bindNodeCallback next', res[0].body);
    },
    error: err => {
      console.log('bindNodeCallback error', err);
    },
    complete: () => {
      console.log('bindNodeCallback complete');
    }
  });
  getAsObs('http://localhost:3001').subscribe({
    error: err => {
      console.log('bindNodeCallback error', err);
    }
  })

}

// defer

if (false) {
  log('defer');

  // create a normal observable
  const obs$ = of(new Date());
  const i1 = setInterval(() => {

    // will print the same date
    obs$.subscribe(it => log('not deferred', it));

  }, 1000);
  setTimeout(() => clearInterval(i1), 4000);

  // create a deferred observable
  const obsDefer$ = defer(() => {
    return of(new Date());
  });
  const i2 = setInterval(() => {

    // will print a new date each time
    obsDefer$.subscribe(it => log('deferred', it));

  }, 1000);
  setTimeout(() => clearInterval(i2), 4000);

}

// empty

if (false) {
  log('empty');

  // deprecated
  const obs$ = empty();
  obs$.subscribe(log);

  // in favour of
  const obs1$ = EMPTY;
  obs1$.subscribe(log);

  // how you might use it
  const interval$ = interval(1000);
  const result = interval$.pipe(
    mergeMap(x => x % 2 == 1 ? of('a', 'b', 'c') : EMPTY)
  );
  result.subscribe(log);

}

// from

if (false) {
  log('from');

  const obs$ = from([1, 2, 3]);
  obs$.subscribe(log);

  const obsFromPromise = from(fetch('http://localhost:3000', {}));

  obsFromPromise.subscribe(log);

}

// fromEvent

if (false) {
  log('fromEvent');

  // Must run in a browser
  const obs$ = fromEvent(document, 'click');
  obs$.subscribe(log);

}

// fromEventHandler

if (false) {
  log('fromEventHandler');

  // Must run in browser
  const obs$ = fromEventPattern(
    handler => document.addEventListener('click', handler),
    handler => document.removeEventListener('click', handler),
  );
  obs$.subscribe(log);

}

// generate

if (false) {
  log('generate');

  const obs$ = generate(0, x => x < 10, x => ++x);
  obs$.subscribe(log);

}

// iterate

if (false) {
  log('iterate');

  const obs$ = interval(500);
  obs$.subscribe(log);

}

// of

if (false) {
  log('of');

  const obs$ = of('one', 'two', 3);
  obs$.subscribe(it => console.log(it));

}

// range

if (false) {
  log('range');

  const obs$ = range(5, 10);
  obs$.subscribe(log);

}

// throwError

if (false) {
  log('throwError');

  const obs$ = concat(range(1, 5), throwError(new Error('Crap')));
  obs$.subscribe(log);

}

// timer

if (false) {
  log('timer');

  const obs$ = timer(3000, 1000);
  obs$.subscribe(log);

}

// iif

if (false) {
  log('iif');

  // simple example
  let subscribeToFirst;
  const obs$ = iif(
    () => subscribeToFirst,
    of('first'),
    of('second'),
  );

  subscribeToFirst = true;
  obs$.subscribe(log);

  subscribeToFirst = false;
  obs$.subscribe(log);

  // access control example
  let accessGranted;
  const obs1$ = iif(
    () => accessGranted,
    of('it seems you have access')
  );

  accessGranted = true;
  obs1$.subscribe(log);

  accessGranted = false;
  obs1$.subscribe(log);

}