export interface PageBookRoomSchema {
	data: FormData
}

export interface FormData {
	room_id?: number;
	first_name?: string
	last_name?: string
	father_name?: string
	address?: string
	gender?: string
	phone?: string
	benefits?: string
}
