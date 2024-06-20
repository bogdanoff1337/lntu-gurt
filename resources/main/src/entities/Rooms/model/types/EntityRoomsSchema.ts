export interface EntityRoomsSchema {
	data?: RoomsData;
	params?: {
		faculty_id?: string;
		dormitory_id?: string;
		gender?: string;
		page?: string;
	}
	scrollPosition?: number;
	isLoading?: boolean;
	isFetching?: boolean;
	error?: string;
}

export interface RoomsData {
	breadcrumbs: Breadcrumbs;
	data: Room[];
	links: Link[];
	meta: Meta;
}

interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: Link[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

interface Link {
	url: string | null;
	label: string;
	active: boolean;
}

interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: Link[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

export interface Room {
	id: number;
	images: string;
	dormitory: {
		id: number;
		slug: string;
		address: string;
	};
	faculty: {
		id: number;
		slug: string;
		slug_short: string;
	};
	number: string;
}

export interface Breadcrumbs {
	slug_short: string;
}
