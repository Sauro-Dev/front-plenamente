import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd, RouterLink} from "@angular/router";
import {filter} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    RouterLink, CommonModule
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<any> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // No mostramos el breadcrumb en el login
        const currentUrl = this.router.url;
        if (currentUrl !== '/login') {
          this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
        }
      });
  }

  buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<any> = []): Array<any> {
    const label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    const path = route.routeConfig ? route.routeConfig.path : '';

    const nextUrl = `${url}${path}/`;
    const breadcrumb = { label, url: nextUrl };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];

    if (route.firstChild) {
      return this.buildBreadcrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
