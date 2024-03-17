import { FC, useEffect, useMemo } from "react";
import { Page } from "@/widgets/Page";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Button/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Input } from "@/shared/ui/Input/Input";
import { Title } from "@/shared/ui/Title";
import { BookForm } from "../BookForm/BookForm";
import cls from "./BookRoomPage.module.scss";
import { useParams } from "react-router-dom";
import { pageBookFormActions } from "../..";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { entityRoomSelectors } from "@/entities/Room";

interface BookRoomPageProps {
	className?: string;
}

export const BookRoomPage: FC<BookRoomPageProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const entityRoomData = useSelector(entityRoomSelectors.getEntityRoomData);

	useEffect(() => {
		dispatch(pageBookFormActions.changeRoomId(+id!));
	}, [])

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
