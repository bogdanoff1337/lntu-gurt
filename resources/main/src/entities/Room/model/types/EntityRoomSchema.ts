export interface EntityRoomSchema {
	data?: Room;
	isLoading?: boolean;
	isFetching: boolean;
	error?: string;
}

export interface RoomData {
	data: Room[];
}

export interface Room {
	id: number;

	images: string[];
	dormitory: {
		id: number;
		slug: string;
		address: string;
	};
	faculty: {
		id: number;
		slug: string;
		slug_short: string;
		image: string;
	};
	places: number;
	number: string;
	floor: number;
	block: string;
	gender: string;
	section: string;
	booked: boolean;
	faculty_match: boolean;
	gender_match: boolean;
	date: {
		this: string;
		deadline: boolean;
	}

}
