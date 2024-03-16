import { FC, useEffect } from "react";
import { Page } from "@/widgets/Page";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Container } from "@/shared/ui/Container";
import cls from "./RoomPage.module.scss";
import { useParams } from "react-router-dom";
import { Title } from "@/shared/ui/Title";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { entityRoomActions, entityRoomSelectors } from "@/entities/Room";
import { useSelector } from "react-redux";
import { PageLoader } from "@/shared/ui/PageLoader";

interface RoomPageProps {
	className?: string;
}

export const RoomPage: FC<RoomPageProps> = ({ className }) => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const roomData = useSelector(entityRoomSelectors.getEntityRoomData);
	const roomDataIsLoading = useSelector(entityRoomSelectors.getEntityRoomIsLoading);


	useEffect(() => {
		dispatch(entityRoomActions.getRoomById({ id: id! }));
	}, [])


	if (roomDataIsLoading) {
		return <PageLoader />
	}

	return (
		<Page className={cn(cls.RoomPage, {}, [className])}>
			<section className={cls.RoomPage__section}>
				<Container className={cls.RoomPage__container}>
					<Title>Кімната</Title>
					<ul className="RoomPage__list">
						<li>Вільних місць:</li>
						<li>Стояк: <b></b></li>
						<li>Стояк:</li>
						<li>Поверх:</li>
						<li>Секція: </li>
					</ul>
				</Container>
			</section>
		</Page>
	);
};
