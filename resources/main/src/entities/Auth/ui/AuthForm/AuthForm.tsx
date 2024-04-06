import { FC, ReactNode, SyntheticEvent } from "react";
import { CSSTransition } from "react-transition-group";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Buttons";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import cls from "./AuthForm.module.scss";

interface AuthFormProps {
	className?: string;
	children?: ReactNode;
	submitName: string;
	statusErrorMessage?: ReactNode;
	onSubmit: (e: SyntheticEvent) => void;
}

export const AuthForm: FC<AuthFormProps> = ({
	className, children, submitName, onSubmit, statusErrorMessage,
}) => (
	<form className={cn(cls.AuthForm, {}, [className])} onSubmit={onSubmit}>
		<Container className={cls.AuthForm__container} modifier={ContainerModifier.FORM}>
			<CSSTransition
				in={!!statusErrorMessage}
				timeout={300}
				unmountOnExit
				classNames={{
					appear: cls.AuthForm__error_appear,
					appearActive: cls.AuthForm__error_appear_active,
					appearDone: cls.AuthForm__error_appear_done,
					enter: cls.AuthForm__error_enter,
					enterActive: cls.AuthForm__error_enter_active,
					enterDone: cls.AuthForm__error_enter_done,
					exit: cls.AuthForm__error_exit,
					exitActive: cls.AuthForm__error_exit_active,
					exitDone: cls.AuthForm__error_exit_done,
				}}
			>
				<div className={cls.AuthForm__statusError}>{statusErrorMessage}</div>
			</CSSTransition>
			<div className={cls.AuthForm__fields}>
				{children}
			</div>
			<Button type="submit" className={cls.AuthForm__submit}>{submitName}</Button>
		</Container>
	</form>
);
