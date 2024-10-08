import clsx from "clsx";
import { FC } from "react";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { LoginAuthForm } from "../LoginAuthForm/LoginAuthForm";
import cls from "./LoginPage.module.scss";

interface LoginPageProps {
	className?: string;
}

export const LoginPage: FC<LoginPageProps> = ({ className }) => {
	return (
		<div className={clsx(cls.LoginPage, [className])}>
			<Container className={cls.LoginPage__container} modifier={ContainerModifier.AUTH}>
				<Title className={cls.LoginPage__title}>Бронювання кімнати студентом</Title>
				<LoginAuthForm />
			</Container>
		</div>
	);
};
