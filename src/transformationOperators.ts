import { interval, of } from "rxjs";
import { buffer, bufferCount, bufferTime, bufferToggle, bufferWhen, concatMap } from "rxjs/operators";

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

if (true) {
  log('concatMap');

  const obs$ = interval(1000).pipe(
    concatMap(i => of(`${i}.1`, `${i}.2`, `${i}.3`))
  );
  obs$.subscribe(log);

}
// concatMapTo

if (false) {
  log('concatMapTo');


}
// exhaust

if (false) {
  log('exhaust');


}
// exhaustMap

if (false) {
  log('exhaustMap');


}
// expand

if (false) {
  log('expand');


}
// groupBy

if (false) {
  log('groupBy');


}
// map

if (false) {
  log('map');


}
// mapTo

if (false) {
  log('mapTo');


}
// mergeMap

if (false) {
  log('mergeMap');


}
// mergeMapTo

if (false) {
  log('mergeMapTo');


}
// mergeScan

if (false) {
  log('mergeScan');


}
// pairwise

if (false) {
  log('pairwise');


}
// partition

if (false) {
  log('partition');


}
// pluck

if (false) {
  log('pluck');


}
// scan

if (false) {
  log('scan');


}
// switchMap

if (false) {
  log('switchMap');


}
// switchMapTo

if (false) {
  log('switchMapTo');


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
