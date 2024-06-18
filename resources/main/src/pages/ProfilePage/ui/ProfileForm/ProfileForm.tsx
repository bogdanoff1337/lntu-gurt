import clsx from "clsx";
import {
	FC, FormEvent, useCallback,
	useEffect,
} from "react";
import { useSelector } from "react-redux";
import { CourseSelect, FacultySelect, GenderSelect } from "@/features/Profile";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonModifier, PrimaryButton } from "@/shared/ui/Buttons";
import { PrimaryField, SecondaryField } from "@/shared/ui/Fields";
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

	const cities = useSelector(pageProfileSelectors.getCities);
	const citiesIsLoading = useSelector(pageProfileSelectors.getCitiesIsLoading);

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

	const onChangeFaculty = useCallback((id: number) => {
		dispatch(pageProfileActions.changeFaculty(id));
	}, [dispatch]);

	const onChangeCourse = useCallback((id: number) => {
		dispatch(pageProfileActions.changeCourse(id));
	}, [dispatch]);

	const onChangeAddress = useCallback((option: { id: number; slug: string; }) => {
		dispatch(pageProfileActions.changeAddress(option));
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
	}, []);

	useEffect(() => {
		if (!tempData) {
			dispatch(pageProfileActions.getFormData());
		}
	}, [dispatch, tempData]);

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
					placeholder="Ім’я"
					readOnly={readOnly}
					renderIcon={!readOnly}
					Icon={PenIcon}
				/>
				<PrimaryField
					className={cls.Input}
					onChange={onChangeLastName}
					value={tempData?.last_name}
					placeholder="Прізвище"
					readOnly={readOnly}
					renderIcon={!readOnly}
					Icon={PenIcon}
				/>
				<PrimaryField
					className={cls.Input}
					onChange={onChangeFatherName}
					value={tempData?.middle_name}
					placeholder="По батькові"
					readOnly={readOnly}
					renderIcon={!readOnly}
					Icon={PenIcon}
				/>
				<GenderSelect
					className={cls.Select}
					Icon={PenIcon}
					renderIcon={!readOnly}
					readOnly={readOnly}
					value={tempData!.gender}
					onChange={onChangeGender}
				/>
				<FacultySelect
					className={cls.Select}
					id={tempData!.faculty_id}
					onChange={onChangeFaculty}
					Icon={PenIcon}
					readOnly={readOnly}
					renderIcon={!readOnly}
				/>
				<CourseSelect
					className={cls.Select}
					id={tempData!.course}
					onChange={onChangeCourse}
					Icon={PenIcon}
					readOnly={readOnly}
					renderIcon={!readOnly}
				/>
				<SecondaryField
					className={cls.Input}
					onChange={onChangeAddress}
					action={pageProfileActions.getCities}
					isLoading={citiesIsLoading}
					active={tempData!.city}
					data={cities}
					placeholder="Місце проживання"
					readOnly={readOnly}
					renderIcon={!readOnly}
					Icon={PenIcon}
					isFeature
				/>
				<PrimaryField
					className={cls.Input}
					onChange={onChangePhone}
					value={tempData!.phone}
					placeholder="Номер телефону"
					readOnly={readOnly}
					renderIcon={!readOnly}
					Icon={PenIcon}
				/>
				<PrimaryField
					className={cls.Input}
					onChange={onChangeBenefits}
					value={tempData!.benefits}
					placeholder="Пільга"
					readOnly={readOnly}
					renderIcon={!readOnly}
					Icon={PenIcon}
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
