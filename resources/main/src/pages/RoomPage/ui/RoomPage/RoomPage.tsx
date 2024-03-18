import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Page } from "@/widgets/Page";
import { entityRoomActions, entityRoomSelectors } from "@/entities/Room";
import { getBookRoutePath } from "@/shared/config/routes/path";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { NavLinkButton } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { PageLoader } from "@/shared/ui/PageLoader";
import { Title } from "@/shared/ui/Title";
import { SwiperSection } from "../SwiperSection/SwiperSection";
import cls from "./RoomPage.module.scss";

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
	}, [dispatch, id]);

	if (roomDataIsLoading) {
		return <PageLoader />;
	}

	return (
		<Page className={cn(cls.RoomPage, {}, [className])}>
			<section className={cls.RoomPage__section}>
				<Container className={cls.RoomPage__container}>
					<Title className={cls.RoomPage__title}>Кімната {roomData?.number}</Title>
					<ul className={cls.RoomPage__list}>
						<li className={cls.RoomPage__item}>
							<span className={cls.RoomPage__name}>Вільних місць:</span>
							<b className={cls.RoomPage__bold}>{roomData?.places}</b>
						</li>
						<li className={cls.RoomPage__item}>
							<span className={cls.RoomPage__name}>Стояк:</span>
							<b className={cls.RoomPage__bold}>{roomData?.block}</b>
						</li>
						<li className={cls.RoomPage__item}>
							<span className={cls.RoomPage__name}>Поверх:</span>
							<b className={cls.RoomPage__bold}>{roomData?.floor}</b>
						</li>
						<li className={cls.RoomPage__item}>
							<span className={cls.RoomPage__name}>Секція:</span>
							<b className={cls.RoomPage__bold}>{roomData?.section}</b>
						</li>
					</ul>

				</Container>
			</section>
			<SwiperSection photos={roomData!.photos} />
			<div className={cls.RoomPage__section}>
				<div className={cls.RoomPage__container}>
					<NavLinkButton to={getBookRoutePath(id)}>Забронювати кімнату</NavLinkButton>
				</div>
			</div>
		</Page>
	);
};
