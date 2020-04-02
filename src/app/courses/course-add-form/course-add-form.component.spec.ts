import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddFormComponent } from './course-add-form.component';

describe('CourseAddFormComponent', () => {
  let component: CourseAddFormComponent;
  let fixture: ComponentFixture<CourseAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
