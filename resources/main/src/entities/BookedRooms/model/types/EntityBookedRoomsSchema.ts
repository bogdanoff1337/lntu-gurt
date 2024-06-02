export interface EntityBookedRoomsSchema {
	data?: BookedRoomsData[];
	isLoading?: boolean
	error?: string;
}

export interface BookedRoomsData {
	id: number;
	room: Room;
	status: Status;
}

enum Status {
	NEW = "new",
	APPROVED = "approved",
	REJECTED = "rejected",
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
