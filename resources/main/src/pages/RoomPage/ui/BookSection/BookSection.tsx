import clsx from "clsx";
import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { entityRoomActions, entityRoomSelectors } from "@/entities/Room";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ButtonModifier, PrimaryButton } from "@/shared/ui/Buttons";
import { Container } from "@/shared/ui/Container";
import { FulfilledBookModal } from "../FulfilledBookModal/FulfilledBookModal";
import { FulfilledRemoveBookModal } from "../FulfilledRemoveBookModal/FulfilledRemoveBookModal";
import { RejectedRemoveBookModal } from "../RejectedRemoveBookModal/RejectedRemoveBookModal";
import cls from "../RoomPage/RoomPage.module.scss";

interface BookSectionProps {
	className?: string
}

export const BookSection: FC<BookSectionProps> = ({ className }) => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const [isOpenFulfilledBookModal, setIsOpenFulfilledBookModal] = useState(false);
	const [isOpenFulfilledRemoveBookModal, setIsOpenFulfilledRemoveBookModal] = useState(false);
	const [isOpenRejectedRemoveBookModal, setIsOpenRejectedRemoveBookModal] = useState(false);

	const roomDataIsFetching = useSelector(entityRoomSelectors.getIsFetching);
	const roomData = useSelector(entityRoomSelectors.getData);
	const roomDataError = useSelector(entityRoomSelectors.getError);

	const onClickBook = useCallback(() => {
		id && dispatch(entityRoomActions.bookRoom({ id })).then((data) => {
			if (data.meta.requestStatus === "fulfilled") {
				setIsOpenFulfilledBookModal(true);
			}
		});
	}, [dispatch, id]);

	const onClickRemoveBook = useCallback(() => {
		id && dispatch(entityRoomActions.removeBookRoom({ id })).then((data) => {
			if (data.meta.requestStatus === "fulfilled") {
				setIsOpenFulfilledRemoveBookModal(true);
			}

			if (data.meta.requestStatus === "rejected") {
				setIsOpenRejectedRemoveBookModal(true);
			}
		});
	}, [dispatch, id]);

	const ConditionRenderButton = useCallback(() => {
		if (roomData?.booked) {
			return (
				<PrimaryButton
					modifier={ButtonModifier.RED}
					isLoading={roomDataIsFetching}
					onClick={onClickRemoveBook}
				>
					Відмінити бронювання
				</PrimaryButton>
			);
		}
		return (
			<PrimaryButton
				isLoading={roomDataIsFetching}
				onClick={onClickBook}
			>
				Забронювати кімнату
			</PrimaryButton>
		);
	}, [onClickBook, onClickRemoveBook, roomData?.booked, roomDataIsFetching]);

	return (
		<>
			<RejectedRemoveBookModal
				setIsOpen={setIsOpenRejectedRemoveBookModal}
				isOpen={isOpenRejectedRemoveBookModal}
				message={roomDataError!}
			/>
			<FulfilledRemoveBookModal
				setIsOpen={setIsOpenFulfilledRemoveBookModal}
				isOpen={isOpenFulfilledRemoveBookModal}
			/>
			<FulfilledBookModal
				setIsOpen={setIsOpenFulfilledBookModal}
				isOpen={isOpenFulfilledBookModal}
			/>

			<section className={clsx(cls.BookSection, [className])}>
				<Container className={cls.RoomPage__container}>
					<ConditionRenderButton />
				</Container>
			</section>
		</>
	);
};
