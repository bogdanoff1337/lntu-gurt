import clsx from "clsx";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Page } from "@/widgets/Page";
import { entityFacultiesActions, entityFacultiesSelectors } from "@/entities/Faculties";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Container } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { FacultiesList } from "../FacultiesList/FacultiesList";
import cls from "./MainPage.module.scss";

interface MainPageProps {
	className?: string;
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const facultiesData = useSelector(entityFacultiesSelectors.getData);

	useEffect(() => {
		if (!facultiesData) {
			dispatch(entityFacultiesActions.getAllFaculties());
		}
	}, [dispatch]);

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
