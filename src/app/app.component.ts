import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

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
      .subscribe((newPost: Response) => {
        post['id'] = newPost.json().id;
        this.posts.splice(0, 0, post);
      },
        (resources: AppError) => {
          if (resources instanceof BadRequest) {
            alert('Content not Found');
            // this.form.setErrors(error.originalError)
          }
          else {
            alert('Unexpected error occured');
          }
        }
      );
  }

  removePost(post) {

    this.service.remove(post)
      .subscribe((remove: Response) => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            alert('Content Not Found');
          } else {
            alert('Unexpected error occured');
          }
        }
      );
  }

  ngOnInit() {
    this.service.getAll().subscribe((response: Response) => {
      this.posts = response.json();
    },
      (resources: AppError) => {
        if (resources instanceof NotFoundError) {
          alert('Content Not Found');
        }
        else {
          alert('Unexpected Error Occurred');
        }
      }
    );
  }
}
