import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  RouterLink,
} from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
      });
  }

  buildBreadcrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<{ label: string; url: string }> = []
  ): Array<{ label: string; url: string }> {
    const children: ActivatedRoute[] = route.children;
  
    // Si no hay hijos, no hay más rutas por procesar
    if (children.length === 0) {
      return breadcrumbs;
    }
  
    for (const child of children) {
      const routeConfig = child.routeConfig;
      if (routeConfig && routeConfig.data && routeConfig.data['breadcrumb']) {
        const label = routeConfig.data['breadcrumb'];
        const path = routeConfig.path ? routeConfig.path : '';
        const nextUrl = `${url}${path}/`;
  
        const breadcrumb = { label, url: nextUrl };
        breadcrumbs.push(breadcrumb); // Añade el breadcrumb actual al array
  
        // Recursivamente construye el breadcrumb con las rutas hijas
        return this.buildBreadcrumb(child, nextUrl, breadcrumbs);
      }
    }
  
    return breadcrumbs;
  }
}
