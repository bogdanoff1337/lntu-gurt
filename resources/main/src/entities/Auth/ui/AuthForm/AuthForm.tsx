import clsx from "clsx";
import {
	FC, ReactNode, SyntheticEvent, memo, useMemo,
} from "react";
import LntuLogoIcon from "@/shared/assets/common/lntu-logo.svg?react";
import { getLoginRoutePath, getRegisterRoutePath } from "@/shared/config/routes/path";
import { ButtonModifier, NavLinkButton } from "@/shared/ui/Buttons";
import { PrimaryButton } from "@/shared/ui/Buttons/ui/PrimaryButton/PrimaryButton";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import cls from "./AuthForm.module.scss";

interface AuthFormProps {
	className?: string;
	children?: ReactNode;
	onSubmit: (e: SyntheticEvent) => void;
	isLoading: boolean;
	modifier: AuthFormModifier;
	error?: {
		title: string;
		text: string;
	};
}

export enum AuthFormModifier {
	register = "register",
	login = "login",
}

export const AuthForm: FC<AuthFormProps> = memo(({
	className, children, onSubmit, isLoading, modifier, error,
}) => {
	const authType = useMemo(() => {
		if (modifier === AuthFormModifier.register) {
			return {
				link: {
					to: getLoginRoutePath(),
					name: "Увійти",
				},
				submitName: "Зареєструватися",
			};
		}
		return {
			link: {
				to: getRegisterRoutePath(),
				name: "Реєстрація",
			},
			submitName: "Увійти",
		};
	}, [modifier]);

	return (
		<form className={clsx(cls.AuthForm, [className])} onSubmit={onSubmit}>
			<Container className={cls.AuthForm__container} modifier={ContainerModifier.FORM}>
				<div className={clsx(cls.StatusError, [cls.AuthForm__statusError])}>
					<h2 className={cls.StatusError__title}>{error?.title}</h2>
					<p className={cls.StatusError__text}>{error?.text}</p>
				</div>
				<div className={cls.AuthForm__fields}>
					{children}
				</div>
				<div className={cls.AuthForm__buttons}>
					<PrimaryButton
						isLoading={isLoading}
						type="submit"
						Icon={LntuLogoIcon}
						className={cls.AuthForm__submit}
					>
						{authType.submitName}
					</PrimaryButton>
					<NavLinkButton
						modifier={ButtonModifier.INVERTION}
						to={authType.link.to}
					>
						{authType.link.name}
					</NavLinkButton>
				</div>
			</Container>
		</form>
	);
});
