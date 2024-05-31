import clsx from "clsx";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Page } from "@/widgets/Page";
import { entityFacultiesSelectors } from "@/entities/Faculties";
import { Container } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { FacultiesList } from "../FacultiesList/FacultiesList";
import cls from "./MainPage.module.scss";

interface MainPageProps {
	className?: string;
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
	const facultiesData = useSelector(entityFacultiesSelectors.getData);

	return (
		<Page className={clsx(cls.MainPage, {}, [className])}>
			<section className={cls.MainPage__section}>
				<Container className={cls.MainPage__container}>
					<Title className={cls.MainPage__title}>Факультети</Title>
					<FacultiesList data={facultiesData!} />
				</Container>
			</section>
		</Page>
	);
};
