import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FirebaseModule } from '../firebase/firebase.module';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FormsModule,
		FirebaseModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatRadioModule,
		MatCardModule,
		MatListModule,
		MatButtonModule,
		HttpClientModule
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatRadioModule,
		MatCardModule,
		MatListModule,
		MatButtonModule,
		FirebaseModule,
		HttpClientModule
	]
})
export class SharedModule {}
