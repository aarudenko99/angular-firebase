export interface Course {
	id: number;
	title: string;
	duration: number;
	duration_unit: string;
	options?: string;
	short_description: string;
	description: string;
	overview: string;
	outline: string;
	objectives: string;
	image_url: string;
	authors: string[];
	featured: boolean;
	who_should_attend: string;
}
