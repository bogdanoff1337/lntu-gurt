export interface EntityBookedRoomsSchema {
	data?: RoomsData;
	isLoading?: boolean
	error?: string;
}

export interface RoomsData {
	data: Room[];
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