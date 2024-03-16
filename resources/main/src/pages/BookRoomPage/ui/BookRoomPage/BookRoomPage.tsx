import { FC } from "react";
import { Page } from "@/widgets/Page";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Button/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Input } from "@/shared/ui/Input/Input";
import { Title } from "@/shared/ui/Title";
import cls from "./BookRoomPage.module.scss";

interface BookRoomPageProps {
	className?: string;
}

export const BookRoomPage: FC<BookRoomPageProps> = ({ className }) => {
	return (
		<Page className={cn(cls.BookRoomPage, {}, [className])}>
			<section className={cls.BookRoomPage__section}>
				<Container className={cls.BookRoomPage__container}>
					<Title className={cls.BookRoomPage__title}>Бронювання кімнати 721</Title>
					<form className={`${cls.Form} ${cls.BookRoomPage__form}`}>
						<div className={cls.Form__list}>
							<Input className={cls.Input} placeholder="Вкажіть прізвище" />
							<Input className={cls.Input} placeholder="Вкажіть прізвище" />
							<Input className={cls.Input} placeholder="Вкажіть прізвище" />
							<Input className={cls.Input} placeholder="Вкажіть прізвище" />
							<Input className={cls.Input} placeholder="Вкажіть прізвище" />
							<Input className={cls.Input} placeholder="Вкажіть прізвище" />
							<Input className={cls.Input} placeholder="Вкажіть прізвище" />
						</div>
						<Button className={cls.Form__submit}>Забронювати кімнату</Button>
					</form>
				</Container>
			</section>
		</Page>
	);
};
