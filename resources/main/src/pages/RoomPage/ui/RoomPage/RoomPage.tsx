import clsx from "clsx";
import {
	FC,
	memo,
	useEffect,
} from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Page } from "@/widgets/Page";
import { entityRoomActions, entityRoomSelectors } from "@/entities/Room";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Container } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { getBreadcrumbs } from "../../model/selectors";
import { BookSection } from "../BookSection/BookSection";
import { SwiperSection } from "../SwiperSection/SwiperSection";
import cls from "./RoomPage.module.scss";

interface RoomPageProps {
	className?: string;
}

export const RoomPage: FC<RoomPageProps> = memo(({ className }) => {
	const location = useLocation();
	const breadcrumbsData = useSelector((state) => getBreadcrumbs(state, location.state));

	const { id } = useParams();
	const dispatch = useAppDispatch();
	const roomData = useSelector(entityRoomSelectors.getData);
	const roomDataIsLoading = useSelector(entityRoomSelectors.getIsLoading);

	useEffect(() => {
		if (id) {
			dispatch(entityRoomActions.getRoomById({ id }));
		}
	}, [dispatch, id]);

	return (
		<Page
			className={clsx(cls.RoomPage, [className])}
			breadcrumbsData={breadcrumbsData}
			isLoading={roomDataIsLoading}
		>
			<section className={cls.RoomPage__section}>
				<Container className={cls.RoomPage__container}>
					<Title className={cls.RoomPage__title}>Кімната {roomData?.number}</Title>
					<ul className={cls.RoomPage__list}>
						<li className={cls.RoomPage__item}>
							<span className={cls.RoomPage__name}>Вільних місць:</span>
							<b className={cls.RoomPage__bold}>{roomData?.places}</b>
						</li>
						<li className={cls.RoomPage__item}>
							<span className={cls.RoomPage__name}>Блок:</span>
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
						<li className={cls.RoomPage__item}>
							<span className={cls.RoomPage__name}>Стать:</span>
							<b className={cls.RoomPage__bold}>{roomData?.gender}</b>
						</li>
						<li className={cls.RoomPage__item}>
							<span className={cls.RoomPage__name}>Факультет:</span>
							<b className={cls.RoomPage__bold}>{roomData?.faculty.slug_short}</b>
						</li>
					</ul>
				</Container>
			</section>
			<SwiperSection images={roomData?.images} />
			<BookSection />
		</Page>
	);
});
