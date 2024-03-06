export interface RoomSchema {
	data?: RoomData,
	isLoading?: boolean,
	error?: string
}

export interface RoomData {
	data: Room[];
	links: any;
	meta: any;
}

export interface Room {
	photos: any,
	id: number,
	dormitory_id: number,
	places: number,
	number: number,
	floor: number,
	block: string,
	gender: string,
	section: string
}
