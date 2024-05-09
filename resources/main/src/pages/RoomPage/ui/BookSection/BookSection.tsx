import clsx from "clsx";
import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { entityRoomActions, entityRoomSelectors } from "@/entities/Room";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PrimaryButton } from "@/shared/ui/Buttons";
import { Container } from "@/shared/ui/Container";
import cls from "../RoomPage/RoomPage.module.scss";
import { SuccessBookModal } from "../SuccessBookModal/SuccessBookModal";

interface BookSectionProps {
	className?: string
}

export const BookSection: FC<BookSectionProps> = ({ className }) => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const [isOpenModal, setIsOpenModal] = useState(false);
	const roomDataIsFetching = useSelector(entityRoomSelectors.getEntityRoomIsFetching);

	const onClickBook = useCallback(() => {
		id && dispatch(entityRoomActions.bookRoom({ id }));
		setIsOpenModal(true);
	}, [dispatch, id]);

	return (
		<>
			<SuccessBookModal setIsOpen={setIsOpenModal} isOpen={isOpenModal} />
			<section className={clsx(cls.BookSection, [className])}>
				<Container className={cls.RoomPage__container}>
					<PrimaryButton isLoading={roomDataIsFetching} onClick={onClickBook}>Забронювати кімнату</PrimaryButton>
				</Container>
			</section>
		</>
	);
};
