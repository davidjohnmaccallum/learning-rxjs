import fetch from 'node-fetch';
import { from, EMPTY } from 'rxjs';
import { mergeMap, expand, tap, map, reduce, first, take } from 'rxjs/operators';

const accessToken = "mzKEB_v4EED0HPD39z4IB7yrrjbOLTx1b_HhcRw20uipRKGffS5AS_E6wdpsdHkgBbnbj0jzt156WgmjHaczGn50OhWB27ovzuIsGV7IXj_Jvz7t9GFWAt0="; // Replace me.
const headers = {
  Authorization: `Bearer ${accessToken}`
}

// Creates an observable from a fetch call. Returns a JSON object.
const get = url => from(fetch(url, { headers })).pipe(
  tap((it: any) => console.log(url, it.status, it.statusText)),
  tap((res: Response) => {
    if (res.ok === false) throw Error(`${res.status} ${res.statusText}`);
  }),
  mergeMap((res: any) => from(res.json())),
);

// Gets the commits for a repo and adds those commits to the repo object. Returns a repo object.
const addCommitsToRepo$ = repo => get(`https://api.bitbucket.org/2.0/repositories/${repo.path}/commits`).pipe(
  // expand((res: any) => res.next ? get(res.next) : EMPTY),
  mergeMap((res: any) => from(res.values)),
  map((bcommit: any) => ({
    message: bcommit.message,
    author: bcommit.author && bcommit.author.raw,
    date: bcommit.date,
    html: bcommit.links.html.href,
  })),
  take(5),
  reduce((acc, value) => [...acc, value], []),
  map(commits => ({ ...repo, commits })),
);

// Gets all repos. The result from bitbucket is paginated. This function 
// pages through all the results. Returns an array of repo objects.
const allRepos$ = get('https://api.bitbucket.org/2.0/repositories/?role=member').pipe(
  expand((res: any) => res.next ? get(res.next) : EMPTY),
  map((res: any) => res.values.map((brepo: any) => ({
    name: brepo.name,
    description: brepo.description,
    path: brepo.full_name,
    html: brepo.links.html.href,
    updatedOn: new Date(brepo.updated_on),
  }))),
  reduce((acc, value) => [...acc, ...value], []),
);

// Sorts the array of repo objects. Most recently updated repos first.
const allReposSorted$ = allRepos$.pipe(
  map((repos: any) => repos.sort((a, b) => a.updatedOn < b.updatedOn ? 1 : -1)),
);

// Gets all repos, sorts them and gets their commits.
allReposSorted$.pipe(
  mergeMap((repos: any) => from(repos)),
  take(5),
  mergeMap((brepo: any) => addCommitsToRepo$(brepo)),
).subscribe(console.log);
