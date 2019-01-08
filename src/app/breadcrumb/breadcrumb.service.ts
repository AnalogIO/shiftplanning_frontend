import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  linksChange: EventEmitter<[string, string]> = new EventEmitter();
  activeLinkChange: EventEmitter<string> = new EventEmitter();
  reset: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.processEvent(event);
    });
  }

  ngOnInit() {
  }

  processEvent(event: NavigationEnd) {
    this.resetLinks();
    let scheduleDetailRegex = /^\/schedules\/\d+$/g;
    let scheduleRegex = /^\/schedules$/g;
    let shiftsRegex = /^\/shifts$/g;

    let url = event.urlAfterRedirects.toLowerCase();

    if (scheduleDetailRegex.test(url)) {
      let id = url.substr(url.lastIndexOf('/') + 1);
      this.setLinks(["/schedules", "Schedules"]);
      this.activeLinkChange.emit(id);
    }

    if (scheduleRegex.test(url)) {
      this.setActiveLink("Schedules");
    }

    if (shiftsRegex.test(url)) {
      this.setActiveLink("Shifts");
    }

  }

  setLinks(link: [string, string]): void {
    this.linksChange.emit(link);
  }

  setActiveLink(link: string): void {
    this.activeLinkChange.emit(link);
  }

  resetLinks(): void {
    this.reset.emit();
  }
}
