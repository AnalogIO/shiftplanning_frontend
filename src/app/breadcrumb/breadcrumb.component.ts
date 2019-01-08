import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

    links: [string, string][];
    activeLink: string;

    constructor(private breadcrumbService: BreadcrumbService) { }

    ngOnInit() {
        this.links = new Array();

        this.breadcrumbService.reset.subscribe(_ => this.links = new Array());

        this.breadcrumbService.linksChange.subscribe(links => {
            this.links.push(links);
        });

        this.breadcrumbService.activeLinkChange.subscribe(link => {
            this.activeLink = link;
        })

    }



}
