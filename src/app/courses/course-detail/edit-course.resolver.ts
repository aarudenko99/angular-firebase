import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { CourseService } from '../services/course.service';

@Injectable({ providedIn: "root" })
export class EditCourseResolver implements Resolve<any> {

  constructor(public service: CourseService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      let courseKey = route.paramMap.get('id');
      this.service.getCourse(courseKey)
        .subscribe(
          data => {
            resolve(data);
          }
        );
    })
  }
}
