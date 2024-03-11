import { FC } from "react";
import { Page } from "@/widgets/Page";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Container } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { FacultiesList } from "../FacultiesList/FacultiesList";
import cls from "./MainPage.module.scss";

interface MainPageProps {
	className?: string;
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
	return (
		<Page className={cn(cls.MainPage, {}, [className])}>
			<section className={cls.MainPage__section}>
				<Container className={cls.MainPage__container}>
					<Title className={cls.MainPage__title}>Факультети</Title>
					<FacultiesList />
				</Container>
			</section>
		</Page>
	);
};
