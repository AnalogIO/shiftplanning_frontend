import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {

  isCollapsed = true;
  isLogin = false;

  constructor(router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes("login")) this.isLogin = true;
        else this.isLogin = false;
      }
    });
  }

  ngOnInit() { }

}
