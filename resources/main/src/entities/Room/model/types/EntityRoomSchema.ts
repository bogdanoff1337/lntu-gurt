export interface EntityRoomSchema {
	data?: Room;
	isLoading?: boolean;
	error?: string;
}

export interface RoomData {
	data: Room[];
}


export interface Room {
	id: number;
	photos: string;
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
