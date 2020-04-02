import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../model/course';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course;

  constructor(private activatedRoute: ActivatedRoute,
    private service: CourseService) { }

  ngOnInit() {

    this.activatedRoute.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.course = data.payload.data();
        this.course.id = data.payload.id;
      }
    })


  }

}
