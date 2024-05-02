import clsx from "clsx";
import { FC } from "react";
import { Page } from "@/widgets/Page";
import { DormSelect, GenderSelect } from "@/features/Rooms";
import { Container } from "@/shared/ui/Container";
import { RoomsList } from "../RoomsList/RoomsList";
import cls from "./RoomsPage.module.scss";

interface RoomsPageProps {
	className?: string;
}

export const RoomsPage: FC<RoomsPageProps> = ({ className }) => {
	return (
		<Page className={clsx(cls.RoomsPage, [className])}>
			<section className={cls.RoomsPage__section}>
				<Container className={cls.RoomsPage__container}>
					<div className={cls.RoomsPage__selectsGroup}>
						<DormSelect />
						<GenderSelect />
					</div>
					<RoomsList />
				</Container>
			</section>
		</Page>
	);
};
