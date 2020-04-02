import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseAddFormComponent } from './course-add-form/course-add-form.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';



@NgModule({
  declarations: [CourseDetailComponent,
    CourseAddFormComponent, CoursesListComponent,
    CourseCardComponent,

  ],
  imports: [
    CommonModule, SharedModule, CoursesRoutingModule
  ]
})
export class CoursesModule { }
