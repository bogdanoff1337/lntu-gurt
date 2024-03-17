import { FC, FormEvent, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input/Input";
import * as pageeBookFormSelectors from "../../model/selectors";
import { pageBookFormActions } from "../../model/slice/pageBookFormSlice";
import cls from "./BookForm.module.scss";

interface BookFormProps {
	className?: string
}

export const BookForm: FC<BookFormProps> = ({ className }) => {
	const dispatch = useAppDispatch();

	const formData = useSelector(pageeBookFormSelectors.getPageBookFormData);



	const onChangeLastName = useCallback((value: string) => {
		dispatch(pageBookFormActions.changeLastName(value));
	}, [dispatch]);

	const onChangeFatherName = useCallback((value: string) => {
		dispatch(pageBookFormActions.changeFatherName(value));
	}, [dispatch]);

	const onChangeFirstName = useCallback((value: string) => {
		dispatch(pageBookFormActions.changeFirstName(value));
	}, [dispatch]);

	const onChangeGender = useCallback((value: string) => {
		dispatch(pageBookFormActions.changeGender(value));
	}, [dispatch]);

	const onChangeAddress = useCallback((value: string) => {
		dispatch(pageBookFormActions.changeAddress(value));
	}, [dispatch]);

	const onChangeBenefits = useCallback((value: string) => {
		dispatch(pageBookFormActions.changeBenefits(value));
	}, [dispatch]);

	const onChangePhone = useCallback((value: string) => {
		dispatch(pageBookFormActions.changePhone(value));
	}, [dispatch]);

	const onSubmit = useCallback((e: FormEvent) => {
		e.preventDefault();

		dispatch(pageBookFormActions.postBookData());
	}, []);

	return (
		<form onSubmit={onSubmit} className={cn(cls.BookForm, {}, [className])}>
			<div className={cls.BookForm__list}>
				<Input
					className={cls.Input}
					onChange={onChangeLastName}
					value={formData.last_name}
					placeholder="Вкажіть прізвище"
				/>
				<Input
					className={cls.Input}
					onChange={onChangeFatherName}
					value={formData.father_name}
					placeholder="Вкажіть по батькові"
				/>
				<Input
					className={cls.Input}
					onChange={onChangeFirstName}
					value={formData.first_name}
					placeholder="Вкажіть ім’я"
				/>
				<Input
					className={cls.Input}
					onChange={onChangeGender}
					value={formData.gender}
					placeholder="Стать"
				/>
				<Input
					className={cls.Input}
					onChange={onChangeAddress}
					value={formData.address}
					placeholder="Місце проживання"
				/>
				<Input
					className={cls.Input}
					onChange={onChangePhone}
					value={formData.phone}
					placeholder="Номер телефону"
				/>
				<Input
					className={cls.Input}
					onChange={onChangeBenefits}
					value={formData.benefits}
					placeholder="Вкажіть пільгу"
				/>
			</div>
			<Button
				type="submit"
				className={cls.BookForm__submit}
			>
				Забронювати кімнату
			</Button>
		</form>
	);
};
