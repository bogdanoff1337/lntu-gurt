import clsx from "clsx";
import { FC, memo } from "react";
import { Page } from "@/widgets/Page";
import { Container } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { breadcrumbsData } from "../../static/breadcrumbsData";
import { BookedRoomsList } from "../BookedRoomsList/BookedRoomsList";
import cls from "./BookedPage.module.scss";

interface BookedPageProps {
	className?: string;
}

export const BookedPage: FC<BookedPageProps> = memo(({ className }) => {
	return (
		<Page className={clsx(cls.BookedPage, [className])} breadcrumbsData={breadcrumbsData}>
			<section className={cls.BookedPage__section}>
				<Container className={cls.BookedPage__container}>
					<Title className={cls.BookedPage__title}>Заброньовані кімнати</Title>
					<BookedRoomsList />
				</Container>
			</section>
		</Page>
	);
});
