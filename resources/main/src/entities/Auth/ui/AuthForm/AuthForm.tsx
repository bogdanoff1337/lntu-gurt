import { FC, ReactNode, SyntheticEvent } from "react";
import LntuLogoIcon from "@/shared/assets/common/lntu-logo.svg?react";
import { PrimaryButton } from "@/shared/ui/Buttons/ui/PrimaryButton/PrimaryButton";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import cls from "./AuthForm.module.scss";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

interface AuthFormProps {
	className?: string;
	children?: ReactNode;
	submitName: string;
	statusErrorMessage?: ReactNode;
	onSubmit: (e: SyntheticEvent) => void;
	isLoading: boolean;
}

export const AuthForm: FC<AuthFormProps> = ({
	className, children, submitName, onSubmit, statusErrorMessage, isLoading,
}) => {
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
				<PrimaryButton isLoading={isLoading} type="submit" Icon={LntuLogoIcon} className={cls.AuthForm__submit}>{submitName}</PrimaryButton>
			</Container>
		</form>
	);
};
