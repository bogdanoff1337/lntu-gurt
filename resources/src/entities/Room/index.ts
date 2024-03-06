export {
	getRoomsData, getRoomsIsLoading, getRoomsError,
} from "./model/selectors/roomSelector";

export type { RoomSchema } from "./model/types/Room";

export { fetchRooms } from "./model/services/fetchRooms";
export { roomSlice } from "./model/slice/roomSlice";
