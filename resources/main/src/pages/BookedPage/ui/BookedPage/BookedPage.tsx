import clsx from "clsx";
import { FC } from "react";
import { Page } from "@/widgets/Page";
import { Container } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import cls from "./BookedPage.module.scss";
import { breadcrumbsData } from "../../static/breadcrumbsData";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { BookedRoomsList } from "../BookedRoomsList/BookedRoomsList";

interface BookedPageProps {
	className?: string;
}

export const BookedPage: FC<BookedPageProps> = ({ className }) => {
	return (
		<Page className={clsx(cls.BookedPage, [className])} Breadcrumbs={<Breadcrumbs data={breadcrumbsData} />}>
			<section className={cls.BookedPage__section}>
				<Container className={cls.BookedPage__container}>
					<Title className={cls.BookedPage__title}>Заброньовані кімнати</Title>
					<BookedRoomsList />
				</Container>
			</section>
		</Page>
	);
};
