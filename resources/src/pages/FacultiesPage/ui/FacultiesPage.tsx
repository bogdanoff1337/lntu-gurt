import { FC } from "react";
import { Page } from "@/widgets/Page";
import { FacultiesList } from "@/entities/Faculties";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Container } from "@/shared/ui/Container";
import cls from "./FacultiesPage.module.scss";

interface FacultiesPageProps {
	className?: string
}

export const FacultiesPage: FC<FacultiesPageProps> = ({ className }) => {
	return (
		<Page className={cn(cls.FacultiesPage, {}, [className])}>
			<Container className={cls.FacultiesPage__container}>
				<h1 className={cls.FacultiesPage__title}>Факультети</h1>
				<FacultiesList />
			</Container>
		</Page>
	);
};
