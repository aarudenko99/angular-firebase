import { Component, OnInit } from '@angular/core';
import { Author } from '../../authors/model/author';
import { AuthorService } from '../../authors/services/author.service';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import 'firebase/firestore';

@Component({
	selector: 'app-course-add-form',
	templateUrl: './course-add-form.component.html',
	styleUrls: [ './course-add-form.component.css' ]
})
export class CourseAddFormComponent implements OnInit {
	authors: Author[];
	durationUnits = [ 'Days', 'Weeks', 'Months' ];
	selectedFile = null;

	constructor(private authorService: AuthorService, private courseService: CourseService) {}

	ngOnInit(): void {
		this.authorService.getAuthors().subscribe({
			next: (authors: Author[]) => {
				this.authors = authors;
			}
		});
	}

	onFileSelected(event) {
		this.selectedFile = event.target.files[0];
	}

	onAddCourse(newCourse) {
		this.courseService.addCourse(newCourse.value, this.selectedFile);
	}
}
