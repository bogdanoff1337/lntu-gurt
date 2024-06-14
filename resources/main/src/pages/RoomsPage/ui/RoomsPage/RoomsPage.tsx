import clsx from "clsx";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { Page } from "@/widgets/Page";
import { DormSelect, GenderSelect } from "@/features/Rooms";
import { Container } from "@/shared/ui/Container";
import { getBreadcrumbs } from "../../model/selectors";
import { RoomsList } from "../RoomsList/RoomsList";
import cls from "./RoomsPage.module.scss";

interface RoomsPageProps {
	className?: string;
}

export const RoomsPage: FC<RoomsPageProps> = memo(({ className }) => {
	const breadcrumbsData = useSelector(getBreadcrumbs);

	return (
		<Page
			className={clsx(cls.RoomsPage, [className])}
			breadcrumbsData={breadcrumbsData}
		>
			<section className={cls.RoomsPage__section}>
				<Container className={cls.RoomsPage__container}>
					<div className={cls.RoomsPage__selectsGroup}>
						<GenderSelect className={cls.Select} />
						<DormSelect className={cls.Select} />
					</div>
					<RoomsList className={cls.RoomsPage__roomsList} />
				</Container>
			</section>
		</Page>
	);
});
