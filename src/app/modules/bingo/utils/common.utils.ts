import { ActivatedRoute } from '@angular/router';

export function getFullTreeParams(route: ActivatedRoute, params: any = {}): any {
  if (route) {
    if (route.snapshot) {
      params = { ...params, ...route.snapshot.params };
    }
    return route.parent ? getFullTreeParams(route.parent, params) : params;
  }
  return params;
}
