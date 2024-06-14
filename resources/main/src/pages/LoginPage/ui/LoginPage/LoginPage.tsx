import clsx from "clsx";
import { FC, memo } from "react";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { LoginAuthForm } from "../LoginAuthForm/LoginAuthForm";
import cls from "./LoginPage.module.scss";

interface LoginPageProps {
	className?: string;
}

export const LoginPage: FC<LoginPageProps> = memo(({ className }) => {
	return (
		<div className={clsx(cls.LoginPage, [className])}>
			<Container className={cls.LoginPage__container} modifier={ContainerModifier.AUTH}>
				<Title className={cls.LoginPage__title}>Вхід</Title>
				<LoginAuthForm />
			</Container>
		</div>
	);
});
