import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faGithubSquare=faGithub;
  faLinkedinIn=faLinkedin;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
