import { Transition } from "@headlessui/react";
import clsx from "clsx";
import {
	FC, ReactNode, SyntheticEvent, useMemo,
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
	statusErrorMessage?: ReactNode;
	onSubmit: (e: SyntheticEvent) => void;
	isLoading: boolean;
	modifier: AuthFormModifier;
}

export enum AuthFormModifier {
	register = "register",
	login = "login",
}

export const AuthForm: FC<AuthFormProps> = ({
	className, children, onSubmit, statusErrorMessage, isLoading, modifier,
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
				<Transition
					as="div"
					className={cls.AuthForm__statusError}
					show={!!statusErrorMessage}
					enter={cls.AuthForm__statusError_enter}
					enterFrom={cls.AuthForm__statusError_enterFrom}
					enterTo={cls.AuthForm__statusError_enterTo}
					leave={cls.AuthForm__statusError_leave}
					leaveFrom={cls.AuthForm__statusError_leaveFrom}
					leaveTo={cls.AuthForm__statusError_leaveTo}
				>
					{statusErrorMessage}
				</Transition>
				<div className={cls.AuthForm__fields}>
					{children}
				</div>
				<div className={cls.AuthForm__buttons}>
					<PrimaryButton isLoading={isLoading} type="submit" Icon={LntuLogoIcon} className={cls.AuthForm__submit}>{authType.submitName}</PrimaryButton>
					<NavLinkButton modifier={ButtonModifier.INVERTION} to={authType.link.to}>{authType.link.name}</NavLinkButton>
				</div>
			</Container>
		</form>
	);
};
