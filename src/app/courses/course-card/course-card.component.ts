import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-course',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.course);
  }

  showDetail() {
    alert('button clicked');
  }
}
