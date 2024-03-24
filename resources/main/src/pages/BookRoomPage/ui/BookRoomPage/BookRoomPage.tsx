import { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Page } from "@/widgets/Page";
import { entityRoomSelectors } from "@/entities/Room";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Container } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { pageBookFormActions } from "../..";
import { BookForm } from "../BookForm/BookForm";
import cls from "./BookRoomPage.module.scss";

interface BookRoomPageProps {
	className?: string;
}

export const BookRoomPage: FC<BookRoomPageProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const entityRoomData = useSelector(entityRoomSelectors.getEntityRoomData);

	useEffect(() => {
		dispatch(pageBookFormActions.changeRoomId(+id!));
	}, [dispatch, id]);

	return (
		<Page className={cn(cls.BookRoomPage, {}, [className])}>
			<section className={cls.BookRoomPage__section}>
				<Container className={cls.BookRoomPage__container}>
					<Title className={cls.BookRoomPage__title}>Бронювання кімнати {entityRoomData?.number}</Title>
					<BookForm className={cls.BookRoomPage__form} />
				</Container>
			</section>
		</Page>
	);
};
