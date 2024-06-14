import clsx from "clsx";
import {
	FC, SyntheticEvent, memo, useCallback, useEffect, useRef,
	useState,
} from "react";
import { useSelector } from "react-redux";
import { entityAuthActions, entityAuthSelectors } from "@/entities/Auth";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PrimaryButton } from "@/shared/ui/Buttons";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import * as pageVerifySelectors from "../../model/selectors";
import { pageVerifyActions } from "../../model/slice/pageVerifySlice";
import cls from "./VerifyPage.module.scss";

interface VerifyPageProps {
	className?: string;
}

export const VerifyPage: FC<VerifyPageProps> = memo(({ className }) => {
	const authData = useSelector(entityAuthSelectors.getData);
	const isLoading = useSelector(pageVerifySelectors.getIsLoading);

	const timerRef = useRef<any>(null);

	const [timer, setTimer] = useState(60);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (timer === 0) {
			clearInterval(timerRef.current);
		} else {
			timerRef.current = setInterval(() => {
				setTimer((timer) => timer - 1);
			}, 1000);
		}

		return () => clearInterval(timerRef.current);
	}, [timer]);

	useEffect(() => {
		dispatch(pageVerifyActions.submitForm());
	}, [dispatch]);

	const onSubmit = useCallback((e: SyntheticEvent) => {
		e.preventDefault();
		if (!timer) {
			dispatch(pageVerifyActions.submitForm()).then((data) => {
				if (data.meta.requestStatus === "fulfilled") {
					setTimer(60);
				}

				if (data.payload === "Email already verified") {
					dispatch(entityAuthActions.getUser());
				}
			});
		}
	}, [dispatch, timer]);

	return (
		<div className={clsx(cls.VerifyPage, [className])}>
			<Container className={cls.VerifyPage__container} modifier={ContainerModifier.AUTH}>
				<form onSubmit={onSubmit} className={cls.VerifyPage__shell}>
					<h1 className={cls.VerifyPage__title}>Підтвердження</h1>
					<p className={cls.VerifyPage__text}>
						Надіслано підтвердження на пошту <b className={cls.VerifyPage__bold}>{authData?.email}</b>
					</p>
					<PrimaryButton isLoading={isLoading} disabled={!!timer} type="submit">
						Надіслати ще раз {timer || undefined}
					</PrimaryButton>
				</form>
			</Container>
		</div>
	);
});
