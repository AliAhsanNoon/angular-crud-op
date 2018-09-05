import { Component, OnInit } from '@angular/core';

import { FetchDataService } from './fetch-data.service';
import { AppError } from './app-err';
import { NotFoundError } from './not-found-err';
import { BadRequest } from './bad-req';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private documentTitle: string = 'CRUD | Angularjs | API';

  private posts: any[];

  constructor(private service: FetchDataService) { }

  insertPost(userInput: HTMLInputElement) {
    let post = { title: userInput.value };
    userInput.value = '';
    this.service.create(post)
      .subscribe((newPost) => {
        post['id'] = newPost.id;
        this.posts.splice(0, 0, post);
      },
        (error: AppError) => {
          if (error instanceof BadRequest) { alert('Content not Found'); }
          // this.form.setErrors(error.originalError)
          else throw error;
        }
      );
  }

  removePost(post) {

    this.service.remove(post)
      .subscribe(() => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
        (error: AppError) => {
          if (error instanceof NotFoundError) { alert('Content Not Found'); }
          else { throw error; }
        }
      );
  }

  ngOnInit() {
    this.service.getAll().subscribe((response) => {
      this.posts = response;
    },
      (error: AppError) => {
        if (error instanceof NotFoundError) { alert('Content Not Found'); }
        else { throw error; }
      }
    );
  }
}
