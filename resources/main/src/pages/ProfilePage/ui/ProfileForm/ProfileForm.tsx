import clsx from "clsx";
import {
	FC, FormEvent, useCallback,
	useEffect,
} from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonModifier, PrimaryButton } from "@/shared/ui/Buttons";
import { PrimaryField } from "@/shared/ui/Fields";
import { PageLoader } from "@/shared/ui/PageLoader";
import PenIcon from "../../assets/pen.svg?react";
import * as pageProfileSelectors from "../../model/selectors";
import { pageProfileActions } from "../../model/slice/pageProfileSlice";
import cls from "./ProfileForm.module.scss";

interface ProfileFormProps {
	className?: string
}

export const ProfileForm: FC<ProfileFormProps> = ({ className }) => {
	const dispatch = useAppDispatch();

	const tempData = useSelector(pageProfileSelectors.getTempData);
	const isLoading = useSelector(pageProfileSelectors.getIsLoading);
	const isFetching = useSelector(pageProfileSelectors.getIsFetching);
	const readOnly = useSelector(pageProfileSelectors.getReadOnly);

	const onChangeLastName = useCallback((value: string) => {
		dispatch(pageProfileActions.changeLastName(value));
	}, [dispatch]);

	const onChangeFatherName = useCallback((value: string) => {
		dispatch(pageProfileActions.changeFatherName(value));
	}, [dispatch]);

	const onChangeFirstName = useCallback((value: string) => {
		dispatch(pageProfileActions.changeFirstName(value));
	}, [dispatch]);

	const onChangeGender = useCallback((value: string) => {
		dispatch(pageProfileActions.changeGender(value));
	}, [dispatch]);

	const onChangeAddress = useCallback((value: string) => {
		dispatch(pageProfileActions.changeAddress(value));
	}, [dispatch]);

	const onChangeBenefits = useCallback((value: string) => {
		dispatch(pageProfileActions.changeBenefits(value));
	}, [dispatch]);

	const onChangePhone = useCallback((value: string) => {
		dispatch(pageProfileActions.changePhone(value));
	}, [dispatch]);

	const onClickEdit = useCallback(() => {
		dispatch(pageProfileActions.setReadOnly(false));
	}, [dispatch]);

	const onClickSave = useCallback(() => {
		dispatch(pageProfileActions.setReadOnly(true));
		dispatch(pageProfileActions.patchFormData());
	}, [dispatch]);

	const onClickCancel = useCallback(() => {
		dispatch(pageProfileActions.setReadOnly(true));
	}, [dispatch]);

	const onSubmit = useCallback((e: FormEvent) => {
		e.preventDefault();

		
	}, [dispatch]);

	useEffect(() => {
		dispatch(pageProfileActions.getFormData());
	}, [dispatch]);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<form className={clsx(cls.ProfileForm, {}, [className])} onSubmit={onSubmit}>
			<div className={cls.ProfileForm__list}>
				<PrimaryField
					className={cls.Input}
					onChange={onChangeFirstName}
					value={tempData?.first_name}
					placeholder="Вкажіть ім’я"
					readOnly={readOnly}
					Icon={!readOnly ? PenIcon : undefined}
				/>
				<PrimaryField
					className={cls.Input}
					onChange={onChangeLastName}
					value={tempData?.last_name}
					placeholder="Вкажіть прізвище"
					readOnly={readOnly}
					Icon={!readOnly ? PenIcon : undefined}
				/>
				<PrimaryField
					className={cls.Input}
					onChange={onChangeFatherName}
					value={tempData?.father_name}
					placeholder="Вкажіть по батькові"
					readOnly={readOnly}
					Icon={!readOnly ? PenIcon : undefined}
				/>
				<PrimaryField
					className={cls.Input}
					onChange={onChangeGender}
					value={tempData?.gender}
					placeholder="Стать"
					readOnly={readOnly}
					Icon={!readOnly ? PenIcon : undefined}
				/>
				<PrimaryField
					className={cls.Input}
					onChange={onChangeAddress}
					value={tempData?.address}
					placeholder="Місце проживання"
					readOnly={readOnly}
					Icon={!readOnly ? PenIcon : undefined}
				/>
				<PrimaryField
					className={cls.Input}
					onChange={onChangePhone}
					value={tempData?.phone}
					placeholder="Номер телефону"
					readOnly={readOnly}
					Icon={!readOnly ? PenIcon : undefined}
				/>
				<PrimaryField
					className={cls.Input}
					onChange={onChangeBenefits}
					value={tempData?.benefits}
					placeholder="Вкажіть пільгу"
					readOnly={readOnly}
					Icon={!readOnly ? PenIcon : undefined}
				/>
			</div>
			<div className={cls.ProfileForm__buttons}>
				{readOnly && !isFetching ? (
					<PrimaryButton
						type="button"
						onClick={onClickEdit}
						className={cls.ProfileForm__submit}
						Icon={PenIcon}
					>
						Редагувати
					</PrimaryButton>
				) : (
					<>
						<PrimaryButton
							type="button"
							className={cls.ProfileForm__submit}
							isLoading={isFetching}
							onClick={onClickSave}
						>
							Зберегти
						</PrimaryButton>
						<Button
							type="button"
							modifier={ButtonModifier.RED}
							className={cls.ProfileForm__submit}
							onClick={onClickCancel}
						>
							Скасувати
						</Button>
					</>

				)}
			</div>
		</form>
	);
};
