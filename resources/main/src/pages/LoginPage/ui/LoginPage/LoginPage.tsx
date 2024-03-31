import { FC } from "react";
import { Page } from "@/widgets/Page";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Buttons";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import { PrimaryField } from "@/shared/ui/Fields";
import { Title } from "@/shared/ui/Title";
import cls from "./LoginPage.module.scss";
import { LoginAuthForm } from "../LoginAuthForm/LoginAuthForm";

interface LoginPageProps {
	className?: string;
}

export const LoginPage: FC<LoginPageProps> = ({ className }) => {
	return (
		<Page className={cn(cls.LoginPage, {}, [className])}>
			<section className={cls.LoginPage__section}>
				<Container className={cls.LoginPage__container} modifier={ContainerModifier.CONTAINER_AUTH}>
					<Title className={cls.LoginPage__title}>Бронювання кімнати студентом</Title>
					<LoginAuthForm />
				</Container>
			</section>
		</Page>
	);
};
