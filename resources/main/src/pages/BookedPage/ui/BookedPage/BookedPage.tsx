import { FC } from "react";
import { Page } from "@/widgets/Page";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Container } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import cls from "./BookedPage.module.scss";

interface BookedPageProps {
	className?: string;
}

export const BookedPage: FC<BookedPageProps> = ({ className }) => {
	return (
		<Page className={cn(cls.BookedPage, {}, [className])}>
			<section className={cls.BookedPage__section}>
				<Container className={cls.BookedPage__container}>
					<Title className={cls.BookedPage__title}>Заброньовані кімнати</Title>
				</Container>
			</section>
		</Page>
	);
};
