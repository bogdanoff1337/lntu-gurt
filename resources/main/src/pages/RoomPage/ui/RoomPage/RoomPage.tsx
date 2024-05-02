import clsx from "clsx";
import {
	FC, useCallback, useEffect, useState,
} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Page } from "@/widgets/Page";
import { entityRoomActions, entityRoomSelectors } from "@/entities/Room";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PrimaryButton } from "@/shared/ui/Buttons";
import { Container } from "@/shared/ui/Container";
import { PageLoader } from "@/shared/ui/PageLoader";
import { Title } from "@/shared/ui/Title";
import { SuccessBookModal } from "../SuccessBookModal/SuccessBookModal";
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
	const roomDataIsFetching = useSelector(entityRoomSelectors.getEntityRoomIsFetching);

	const [isOpenModal, setIsOpenModal] = useState(false);

	useEffect(() => {
		dispatch(entityRoomActions.getRoomById({ id: id! }));
	}, [dispatch, id]);

	const onClickBook = useCallback(() => {
		dispatch(entityRoomActions.bookRoom({ id: id! }));
		setIsOpenModal(true);
	}, [dispatch, id]);

	if (roomDataIsLoading) {
		return <PageLoader />;
	}

	return (
		<>
			<SuccessBookModal setIsOpen={setIsOpenModal} isOpen={isOpenModal} />
			<Page className={clsx(cls.RoomPage, [className])}>
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
				<SwiperSection images={roomData!.images} />
				<section className={cls.RoomPage__section}>
					<Container className={cls.RoomPage__container}>
						<PrimaryButton isLoading={roomDataIsFetching} onClick={onClickBook}>Забронювати кімнату</PrimaryButton>
					</Container>
				</section>
			</Page>
		</>

	);
};
