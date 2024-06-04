import clsx from "clsx";
import {
	FC, useCallback, useEffect, useRef,
} from "react";
import { useSelector } from "react-redux";
import { entityAuthSelectors } from "@/entities/Auth";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PrimaryButton } from "@/shared/ui/Buttons";
import { Container, ContainerModifier } from "@/shared/ui/Container";
import * as pageVerifySelectors from "../../model/selectors";
import { pageVerifyActions } from "../../model/slice/pageVerifySlice";
import cls from "./VerifyPage.module.scss";

interface VerifyPageProps {
	className?: string;
}

export const VerifyPage: FC<VerifyPageProps> = ({ className }) => {
	const dispatch = useAppDispatch();

	const authData = useSelector(entityAuthSelectors.getData);

	const timerRef = useRef<any>(null);

	const isLoading = useSelector(pageVerifySelectors.getIsLoading);
	const verifyData = useSelector(pageVerifySelectors.getData);

	useEffect(() => {
		timerRef.current = setInterval(() => {
			dispatch(pageVerifyActions.setTimer(verifyData!.timer - 1));
		}, 1000);
		return () => clearInterval(timerRef.current);
	}, [dispatch, verifyData]);

	useEffect(() => {
		if (verifyData?.timer === 0) {
			clearInterval(timerRef.current);
		}
	}, [verifyData]);

	useEffect(() => {
		pageVerifyActions.submitForm();
	}, []);

	const onSubmit = useCallback((e: any) => {
		e.preventDefault();

		if (verifyData!.timer === 0) {
			pageVerifyActions.submitForm();
		}
	}, [verifyData]);

	return (
		<div className={clsx(cls.VerifyPage, [className])}>
			<Container className={cls.VerifyPage__container} modifier={ContainerModifier.AUTH}>
				<form onSubmit={onSubmit} className={cls.VerifyPage__shell}>
					<h1 className={cls.VerifyPage__title}>Підтвердження</h1>
					<p className={cls.VerifyPage__text}>
						Надіслано підтвердження на пошту <b className={cls.VerifyPage__bold}>{authData?.email}</b>
					</p>
					<PrimaryButton isLoading={isLoading} type="submit" disabled={verifyData?.timer !== 0}>Надіслати ще раз {verifyData?.timer !== 0 && verifyData?.timer}</PrimaryButton>
				</form>
			</Container>
		</div>
	);
};
