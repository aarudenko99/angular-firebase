import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseAddFormComponent } from './course-add-form/course-add-form.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { EditCourseResolver } from './course-detail/edit-course.resolver';



const routes: Routes = [
  {
    path: "", pathMatch: "full",
    component: CoursesListComponent
  },

  {
    path: "course-add", //Angular 8 Notation with Promise
    component: CourseAddFormComponent
  },

  {
    path: ":id", component: CourseDetailComponent,
    resolve: { data: EditCourseResolver }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
