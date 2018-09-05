import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
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
      .map(response => response.json())
      .catch(this.customErrorThrower);
  }

  create(post) {
    return this.http.post(this.url, JSON.stringify(post))
      .map(response => response.json())
      .catch(this.customErrorThrower);
  }

  remove(post) {
    return this.http.delete(this.url + '/' + post.id)
      .map(response => response.json())
      .catch(this.customErrorThrower);
  }

  private customErrorThrower(err: Response) {
    if (err.status === 400) {
      return Observable.throw(new BadRequest(err.json()));
    }
    if (err.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError());
  }

}
