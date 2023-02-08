import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  countdown: number = 3;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.homepage()
  }

  homepage() {
    setTimeout(() => {
      this.countdown -= 1;
      setTimeout(() => {
        this.countdown -= 1;
        setTimeout(() => {
          setTimeout(() => {
            this.router.navigateByUrl('/')
          }, 500)
        }, 1000)
      }, 1000)
    }, 1000)    
  }
}
