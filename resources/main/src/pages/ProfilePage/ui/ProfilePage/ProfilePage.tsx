import { FC } from "react";
import { Page } from "@/widgets/Page";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { ProfileForm } from "../ProfileForm/ProfileForm";
import cls from "./ProfilePage.module.scss";

interface ProfilePageProps {
	className?: string;
}

export const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
	return (
		<Page className={cn(cls.ProfilePage, {}, [className])}>
			<section className={cls.ProfilePage__section}>
				<Container className={cls.ProfilePage__container} modifier={ContainerModifier.AUTH}>
					<Title className={cls.ProfilePage__title}>Профіль</Title>
					<ProfileForm className={cls.ProfilePage__form} />
				</Container>
			</section>
		</Page>
	);
};
