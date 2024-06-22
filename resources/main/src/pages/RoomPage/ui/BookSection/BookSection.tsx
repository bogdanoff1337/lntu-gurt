import clsx from "clsx";
import {
	FC, memo, useCallback, useState,
} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { entityAuthSelectors } from "@/entities/Auth";
import { entityRoomActions, entityRoomSelectors } from "@/entities/Room";
import { getProfileRoutePath } from "@/shared/config/routes/path";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ButtonModifier, NavLinkButton, PrimaryButton } from "@/shared/ui/Buttons";
import { Container } from "@/shared/ui/Container";
import { FulfilledBookModal } from "../FulfilledBookModal/FulfilledBookModal";
import { FulfilledRemoveBookModal } from "../FulfilledRemoveBookModal/FulfilledRemoveBookModal";
import { RejectedRemoveBookModal } from "../RejectedRemoveBookModal/RejectedRemoveBookModal";
import cls from "./BookSection.module.scss";

interface BookSectionProps {
	className?: string
}

export const BookSection: FC<BookSectionProps> = memo(({ className }) => {
	const roomDataIsFetching = useSelector(entityRoomSelectors.getIsFetching);
	const roomData = useSelector(entityRoomSelectors.getData);
	const roomDataError = useSelector(entityRoomSelectors.getError);

	const authData = useSelector(entityAuthSelectors.getData);

	const [isOpenFulfilledBookModal, setIsOpenFulfilledBookModal] = useState(false);
	const [isOpenFulfilledRemoveBookModal, setIsOpenFulfilledRemoveBookModal] = useState(false);
	const [isOpenRejectedRemoveBookModal, setIsOpenRejectedRemoveBookModal] = useState(false);

	const { id } = useParams();
	const dispatch = useAppDispatch();

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

	const ConditionRenderButton = useCallback(({ className }: { className?: string }) => {
		if (roomData?.booked) {
			return (
				<PrimaryButton
					className={className}
					modifier={ButtonModifier.RED}
					isLoading={roomDataIsFetching}
					onClick={onClickRemoveBook}
				>
					Відмінити бронювання
				</PrimaryButton>
			);
		}

		if (roomData?.date.deadline) {
			return (
				<p className={clsx(cls.BookSection__text, [cls.BookSection__text_red])}>
					Час бронювання кімнат було завершено {roomData?.date.this}
				</p>
			);
		} else if (!authData?.profileFilled) {
			return (
				<p className={clsx(cls.BookSection__text, [cls.BookSection__text_red])}>
					Ви не можете забронювати кімнату, якщо профіль не заповнений
					&nbsp;
					<NavLinkButton
						className={cls.RequiredProfileModal__link}
						to={getProfileRoutePath()}
						modifier={ButtonModifier.CLEAR}
					>
						перейдіть до вашого профілю
					</NavLinkButton>
				</p>
			);
		} else if (!roomData?.faculty_match) {
			return (
				<p className={clsx(cls.BookSection__text, [cls.BookSection__text_red])}>
					Ви не можете забронювати кімнату іншого факультету
				</p>
			);
		} else if (!roomData?.gender_match) {
			return (
				<p className={clsx(cls.BookSection__text, [cls.BookSection__text_red])}>
					Ви не можете забронювати кімнату іншої статі
				</p>
			);
		} else if (!roomData.places) {
			return (
				<>
					<p className={clsx(cls.BookSection__text, [cls.BookSection__text_red])}>
						Ви не можете забронювати кімнату, якщо вільних місць немає
					</p>
					<p className={cls.BookSection__text}>
						Забронювати кімнату можна до {roomData?.date.this}
					</p>
				</>
			);
		} else {
			return (
				<>
					<PrimaryButton
						className={className}
						isLoading={roomDataIsFetching}
						onClick={onClickBook}
					>
						Забронювати кімнату
					</PrimaryButton>
					<p className={cls.BookSection__text}>Забронювати кімнату можна до {roomData.date.this}</p>
				</>

			);
		}
	}, [authData?.profileFilled, onClickBook, onClickRemoveBook, roomData?.booked, roomData?.date.deadline, roomData?.date.this, roomData?.faculty_match, roomData?.gender_match, roomData?.places, roomDataIsFetching]);

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
				<Container className={cls.BookSection__container}>
					<ConditionRenderButton className={cls.BookSection__button} />
				</Container>
			</section>
		</>
	);
});
