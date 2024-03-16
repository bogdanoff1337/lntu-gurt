import { FC } from "react";
import { Page } from "@/widgets/Page";
import { DormSelect, GenderSelect } from "@/features/Rooms";
import { useQueryParams } from "@/shared/hooks/useQueryParams/useQueryParams";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Container } from "@/shared/ui/Container";
import { Select } from "@/shared/ui/Select/ui/Select/Select";
import { Title } from "@/shared/ui/Title";
import { RoomsList } from "../RoomsList/RoomsList";
import cls from "./RoomsPage.module.scss";

interface RoomsPageProps {
	className?: string;
}

export const RoomsPage: FC<RoomsPageProps> = ({ className }) => {
	const { dormitory_id } = useQueryParams();

	return (
		<Page className={cn(cls.RoomsPage, {}, [className])}>
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
