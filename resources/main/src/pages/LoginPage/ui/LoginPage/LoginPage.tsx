import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { LoginAuthForm } from "../LoginAuthForm/LoginAuthForm";
import cls from "./LoginPage.module.scss";

interface LoginPageProps {
	className?: string;
}

export const LoginPage: FC<LoginPageProps> = ({ className }) => {
	return (
		<div className={cn(cls.LoginPage, {}, [className])}>
			<Container className={cls.LoginPage__container} modifier={ContainerModifier.CONTAINER_AUTH}>
				<Title className={cls.LoginPage__title}>Бронювання кімнати студентом</Title>
				<LoginAuthForm />
			</Container>
		</div>
	);
};
