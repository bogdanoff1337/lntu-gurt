import clsx from "clsx";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Page } from "@/widgets/Page";
import { DormSelect, GenderSelect } from "@/features/Rooms";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { Container } from "@/shared/ui/Container";
import { getBreadcrumbs } from "../../model/selectors";
import { RoomsList } from "../RoomsList/RoomsList";
import cls from "./RoomsPage.module.scss";

interface RoomsPageProps {
	className?: string;
}

export const RoomsPage: FC<RoomsPageProps> = ({ className }) => {
	const breadcrumbsData = useSelector(getBreadcrumbs);

	return (
		<Page
			className={clsx(cls.RoomsPage, [className])}
			Breadcrumbs={<Breadcrumbs data={breadcrumbsData} />}
		>
			<section className={cls.RoomsPage__section}>
				<Container className={cls.RoomsPage__container}>
					<div className={cls.RoomsPage__selectsGroup}>
						<DormSelect />
						<GenderSelect />
					</div>
					<RoomsList className={cls.RoomsPage__roomsList} />
				</Container>
			</section>
		</Page>
	);
};
