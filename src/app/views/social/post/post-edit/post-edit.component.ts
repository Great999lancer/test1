import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  postText: any;
  countNumber: number;
  fullText = true;
  showMore = false;
  showLess = false;
  rmTextShort = '';
  rmTextFull = '';
  inputWords = [];
  description = '';
  postTitle: String;
  postPicture: String;

  constructor(private router: Router) { }
  @ViewChild('search') searchElement: ElementRef;

  ngOnInit() {
    this.postTitle = 'Post Title1111';
    this.postPicture = 'http://localhost:8080/api/displayAvatarFromFS/3.png';
    this.postText = 'The main global search engine role is to help you find webpages images, videos...of businesses all over the world in an easy innovative and fast way! The main global search engine role is to help you find information, webpages, images, videos...of businesses all over the world in an easy innovative and fast way! The main global search engine role is to help you find information, webpages, images, videos...of businesses all over the world in an easy innovative and fast way! The main global search engine role is to help you find information, webpages, images, videos...of businesses all over the world in an easy innovative and fast way!';
    this.countNumber = this.postText.split(/\W+/).length;
    this.rmTextFull = this.postText;
    this.inputWords = this.postText.split(' ');
    if (this.inputWords.length > 50) {
      this.fullText = false;
      this.showMore = true;
      this.rmTextShort = this.inputWords.slice(0, 50).join(' ') + '...';
      this.description = this.rmTextShort;
    } else {
      if (this.inputWords.length < 50) {
        this.fullText = true;
        this.showMore = false;
        this.rmTextShort = this.inputWords.slice(0, 50).join(' ') + '...';
      }
    }
  }
  readMore(flag) {
    console.log(flag);
    if (flag) {
      this.showMore = false;
      this.fullText = true;
      this.showLess = true;
      this.description = this.postText;
    } else {
      this.showLess = false;
      this.showMore = true;
      this.fullText = false;
      this.description = this.rmTextShort;
    }
  }

  returnPost() {
    this.router.navigate([`/social/allpost`]);
  }
  sendRecommend() {
    alert('Send recommendation? I am testing..');
  }
  addMyfavorite() {
    alert('Add favorite? I am testing..');
  }
  showSearch() {
    this.searchElement.nativeElement.focus();
  }
  onChange() {
    alert(123);
  }
} 
