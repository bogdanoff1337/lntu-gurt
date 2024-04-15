import { FC } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import { Title } from "@/shared/ui/Title";
import { RegisterAuthForm } from "../RegisterAuthForm/RegisterAuthForm";
import cls from "./RegisterPage.module.scss";

interface RegisterPageProps {
	className?: string;
}

export const RegisterPage: FC<RegisterPageProps> = ({ className }) => {
	return (
		<div className={cn(cls.RegisterPage, {}, [className])}>
			<Container className={cls.RegisterPage__container} modifier={ContainerModifier.CONTAINER_AUTH}>
				<Title className={cls.RegisterPage__title}>Бронювання кімнати студентом</Title>
				<RegisterAuthForm />
			</Container>
		</div>
	);
};
