import clsx from "clsx";
import { FC, useEffect } from "react";
import { Page } from "@/widgets/Page";
import { DormSelect, GenderSelect } from "@/features/Rooms";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { Container } from "@/shared/ui/Container";
import { RoomsList } from "../RoomsList/RoomsList";
import cls from "./RoomsPage.module.scss";
import { useSelector } from "react-redux";
import { getBreadcrumbs } from "../../model/selectors";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { entityRoomsActions, entityRoomsSelectors } from "@/entities/Rooms";
import queryString from "query-string";
import { PageLoader } from "@/shared/ui/PageLoader";

interface RoomsPageProps {
	className?: string;
}


export const RoomsPage: FC<RoomsPageProps> = ({ className }) => {
	const breadcrumbsData = useSelector(getBreadcrumbs);
	const dispatch = useAppDispatch();
	const roomsData = useSelector(entityRoomsSelectors.getEntityRoomsData);
	const roomsDataIsLoading = useSelector(entityRoomsSelectors.getEntityRoomsIsLoading);
	
	useEffect(() => {
		const { faculty_id, dormitory_id, gender } = queryString.parse(window.location.search);
		dispatch(entityRoomsActions.getRoomsByParams({
			faculty_id,
			dormitory_id,
			gender,
		}));
	}, [dispatch]);


	if (roomsDataIsLoading) {
		return (
			<PageLoader />
		);
	}

	return (
		<Page className={clsx(cls.RoomsPage, [className])} Breadcrumbs={<Breadcrumbs data={breadcrumbsData} />}>
			<section className={cls.RoomsPage__section}>
				<Container className={cls.RoomsPage__container}>
					<div className={cls.RoomsPage__selectsGroup}>
						<DormSelect />
						<GenderSelect />
					</div>
					<RoomsList data={roomsData} />
				</Container>
			</section>
		</Page>
	);
};
