import { FC } from "react";
import { Page } from "@/widgets/Page";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Buttons";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import { PrimaryField } from "@/shared/ui/Fields";
import { Title } from "@/shared/ui/Title";
import { RegisterAuthForm } from "../RegisterAuthForm/RegisterAuthForm";
import cls from "./RegisterPage.module.scss";

interface RegisterPageProps {
	className?: string;
}

export const RegisterPage: FC<RegisterPageProps> = ({ className }) => {
	return (
		<Page className={cn(cls.RegisterPage, {}, [className])}>
			<section className={cls.RegisterPage__section}>
				<Container className={cls.RegisterPage__container} modifier={ContainerModifier.CONTAINER_AUTH}>
					<Title className={cls.RegisterPage__title}>Бронювання кімнати студентом</Title>
					<RegisterAuthForm />
				</Container>
			</section>
		</Page>
	);
};
