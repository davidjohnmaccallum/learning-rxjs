import { ajax } from 'rxjs/ajax';
import { get } from 'request';
import { Observable, bindCallback } from 'rxjs';
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
