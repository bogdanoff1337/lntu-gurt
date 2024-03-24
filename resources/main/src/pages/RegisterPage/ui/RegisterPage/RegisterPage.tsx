import { FC } from "react";
import { Page } from "@/widgets/Page";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Buttons";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import { PrimaryField } from "@/shared/ui/Fields";
import { Title } from "@/shared/ui/Title";
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
					<form className={cls.Shell}>
						<Container className={cls.Shell__container} modifier={ContainerModifier.FORM}>
							<div className={cls.Shell__fields}>
								<PrimaryField placeholder="Ім'я" value="" />
								<PrimaryField placeholder="Логін" value="" />
								<PrimaryField placeholder="Пароль" value="" />
								<PrimaryField placeholder="Email" value="" />
							</div>
							<Button type="submit" className={cls.Shell__submit}>Зареєструватися</Button>
						</Container>
					</form>
				</Container>
			</section>
		</Page>
	);
};
