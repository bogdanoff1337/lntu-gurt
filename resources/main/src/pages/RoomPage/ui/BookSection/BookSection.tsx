import clsx from "clsx";
import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { entityRoomActions, entityRoomSelectors } from "@/entities/Room";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ButtonModifier, PrimaryButton } from "@/shared/ui/Buttons";
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
	const roomDataIsFetching = useSelector(entityRoomSelectors.getIsFetching);
	const roomData = useSelector(entityRoomSelectors.getData);

	const onClickBook = useCallback(() => {
		id && dispatch(entityRoomActions.bookRoom({ id })).then((data) => {
			if (data.meta.requestStatus === "fulfilled") {
				setIsOpenModal(true);
			}
		});
		
	}, [dispatch, id]);


	const onClickRemoveBook = useCallback(() => {
		id && dispatch(entityRoomActions.removeBookRoom({ id }));
	}, [dispatch, id]);

	const ConditionRenderButton = useCallback(() => {
		if (roomData?.booked) {
			return <PrimaryButton modifier={ButtonModifier.RED} isLoading={roomDataIsFetching} onClick={onClickRemoveBook}>Відмінити бронювання</PrimaryButton>;
		} else {
			return <PrimaryButton isLoading={roomDataIsFetching} onClick={onClickBook}>Забронювати кімнату</PrimaryButton>;
		}
	}, [roomData, roomDataIsFetching]);

	return (
		<>
			<SuccessBookModal setIsOpen={setIsOpenModal} isOpen={isOpenModal} />
			<section className={clsx(cls.BookSection, [className])}>
				<Container className={cls.RoomPage__container}>
					<ConditionRenderButton />
				</Container>
			</section>
		</>
	);
};
