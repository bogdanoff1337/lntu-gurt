import clsx from "clsx";
import { FC } from "react";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { RegisterAuthForm } from "../RegisterAuthForm/RegisterAuthForm";
import cls from "./RegisterPage.module.scss";

interface RegisterPageProps {
	className?: string;
}

export const RegisterPage: FC<RegisterPageProps> = ({ className }) => {
	return (
		<div className={clsx(cls.RegisterPage, [className])}>
			<Container className={cls.RegisterPage__container} modifier={ContainerModifier.AUTH}>
				<Title className={cls.RegisterPage__title}>Реєстрація</Title>
				<RegisterAuthForm />
			</Container>
		</div>
	);
};
