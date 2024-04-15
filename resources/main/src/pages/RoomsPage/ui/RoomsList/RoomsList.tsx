import queryString from "query-string";
import { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	FacultyItem, entityFacultiesActions, entityFacultiesSelectors,
} from "@/entities/Faculties";
import { RoomItem, entityRoomsActions, entityRoomsSelectors } from "@/entities/Rooms";
import { getRoomsRoutePath } from "@/shared/config/routes/path";
import { useQueryParams } from "@/shared/hooks/useQueryParams/useQueryParams";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { updateUrlParams } from "@/shared/lib/updateUrlParams/updateUrlParams";
import { CardGrid } from "@/shared/ui/CardGrid";
import { PageLoader } from "@/shared/ui/PageLoader";
import cls from "./RoomsList.module.scss";

interface RoomsListProps {
	className?: string
}

export const RoomsList: FC<RoomsListProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const roomsData = useSelector(entityRoomsSelectors.getEntityRoomsData);
	const roomsDataIsLoading = useSelector(entityRoomsSelectors.getEntityRoomsIsLoading);

	// const { faculty_id, dormitory_id, gender } = useQueryParams();
	useEffect(() => {
		const { faculty_id, dormitory_id, gender } = queryString.parse(window.location.search);
		dispatch(entityRoomsActions.getRoomsByParams({
			faculty_id: faculty_id as string,
			dormitory_id: dormitory_id as string,
			gender: gender as string,
		}));
	}, [dispatch]);

	const roomsItems = useMemo(() => {
		return roomsData?.map(({ id, images, number }) => (
			<RoomItem key={id} image={`/photos/uploads/room/${images}`} number={number} to={getRoomsRoutePath(id)} />
		));
	}, [roomsData]);

	if (roomsDataIsLoading) {
		return (
			<PageLoader />
		);
	}

	return (
		<div className={cn(cls.RoomsList, {}, [className])}>
			{roomsItems}
		</div>
	);
};
