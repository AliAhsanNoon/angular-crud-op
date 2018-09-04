import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { NotFoundError } from './not-found-err';
import { AppError } from './app-err';
import { BadRequest } from './bad-req';

@Injectable()
export class FetchDataService {

  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) { }

  getAll() {
    return this.http.get(this.url)
      .catch((err: Response) => {
        if (err.status === 404) {
          return Observable.throw(new NotFoundError());
        }
        else {
          return Observable.throw(new AppError());
        }
      });
  }

  create(post) {
    return this.http.post(this.url, JSON.stringify(post))
      .catch((err: Response) => {
        if (err.status === 400) {
          return Observable.throw(new BadRequest(err.json()));
        }
        else {
          return Observable.throw(new AppError(err.json()))
        }
      });
  }

  remove(post) {
    return this.http.delete(this.url + '/' + post.id)
      .catch((err: Response) => {
        if (err.status === 404) {
          return Observable.throw(new NotFoundError());
        }
        else {
          return Observable.throw(new AppError())
        }
      });
  }

}
