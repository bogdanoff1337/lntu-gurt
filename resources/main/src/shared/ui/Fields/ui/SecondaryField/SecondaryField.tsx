import { Transition } from "@headlessui/react";
import clsx from "clsx";
import {
	ChangeEvent, FC, InputHTMLAttributes, useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { useDebounce } from "@/shared/hooks/useDebaunce/useDebaunce";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Loader } from "@/shared/ui/Loader";
import CrossIcon from "../../assets/cross.svg?react";
import cls from "./SecondaryField.module.scss";

interface Option {
	id: number;
	slug: string;
}

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

interface SecondaryFieldProps extends InputAttributes {
	className?: string;
	placeholder: string;
	onChange?: (option: Option) => void;
	onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
	errorMessage?: string;
	isSuccess?: boolean;
	type?: string;
	readOnly?: boolean;
	Icon?: FC<React.SVGProps<SVGSVGElement>>;
	renderIcon?: boolean;
	isFeature?: boolean;
	action: any;
	isLoading?: boolean;
	data?: Option[];
	active?: Option | null;
}

export const SecondaryField: FC<SecondaryFieldProps> = ({
	className, placeholder, onChange, onBlur, errorMessage, type = "text", isSuccess,
	Icon, renderIcon = true, readOnly, isFeature, isLoading, action, data, active, ...anotherProps
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isEmpty, setIsEmpty] = useState(true);
	const [isFocused, setIsFocused] = useState(false);
	const [value, setValue] = useState(active?.slug || "");
	const [isSelected, setIsSelected] = useState(false);

	const dispatch = useAppDispatch();
	const debounce = useDebounce();

	useEffect(() => {
		setIsEmpty(!value);
	}, [value]);

	useEffect(() => {
		if (active) {
			setIsSelected(true);
		}
	}, [active]);

	useEffect(() => {
		if (value.length > 2) {
			debounce(() => dispatch(action({ search: value })), 500);
		}
	}, [action, debounce, dispatch, value]);

	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	const onClickRemoveSelect = useCallback(() => {
		inputRef.current?.focus();
		setIsSelected(false);
		setValue("");
	}, []);

	const onBlurHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		onBlur?.(e);
		setIsFocused(false);

		if (!isSelected && active) {
			setValue(active.slug);
			setIsSelected(true);
		} else if (!isSelected && !active) {
			setValue("");
			setIsSelected(false);
		}
	}, [active, isSelected, onBlur]);

	const onFocusHandler = useCallback(() => {
		setIsFocused(true);
	}, []);

	const onClickItemHandler = useCallback((option: Option) => () => {
		onChange?.(option);
		setValue(option.slug);
		setIsSelected(true);
		setIsFocused(false);
	}, [onChange]);

	const optionItems = useMemo(() => {
		return data?.map((option) => (
			<li key={option.id} className={cls.List__item} onMouseDown={onClickItemHandler(option)}>
				{option.slug}
			</li>
		));
	}, [data, onClickItemHandler]);

	const renderLoader = isLoading && !isSelected && value.length > 2;
	const renderOptions = !isLoading && value.length > 2 && !isSelected && data && data.length > 0;
	const renderNoOptions = !isLoading && value.length > 2 && !isSelected && (data?.length === 0 || !data);

	return (
		<div className={clsx(cls.SecondaryField, {
			[cls.SecondaryField_error]: errorMessage,
			[cls.SecondaryField_success]: isSuccess,
			[cls.SecondaryField_empty]: !isEmpty,
			[cls.SecondaryField_readOnly]: readOnly,
		}, className)}
		>
			<span className={cls.SecondaryField__placeholder}>{placeholder}</span>
			<div className={cls.SecondaryField__wrapper}>
				<input
					ref={inputRef}
					className={cls.SecondaryField__input}
					type={type}
					placeholder={placeholder}
					value={value}
					readOnly={readOnly || isSelected}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					onFocus={onFocusHandler}
					spellCheck="false"
					{...anotherProps}
				/>
				<Transition
					show={isSelected && !readOnly}
					as="button"
					onClick={onClickRemoveSelect}
					className={clsx(cls.SecondaryField__iconWrapper, cls.SecondaryField__iconWrapper_cross)}
					enter={cls.SecondaryField__iconWrapper_enter}
					enterFrom={cls.SecondaryField__iconWrapper_enterFrom}
					enterTo={cls.SecondaryField__iconWrapper_enterTo}
					leave={cls.SecondaryField__iconWrapper_leave}
					leaveFrom={cls.SecondaryField__iconWrapper_leaveFrom}
					leaveTo={cls.SecondaryField__iconWrapper_leaveTo}
				>
					<CrossIcon className={cls.SecondaryField__removeIcon} />
				</Transition>
				<Transition
					show={renderIcon}
					as="div"
					className={clsx(cls.SecondaryField__iconWrapper, cls.SecondaryField__iconWrapper_pen)}
					enter={cls.SecondaryField__iconWrapper_enter}
					enterFrom={cls.SecondaryField__iconWrapper_enterFrom}
					enterTo={cls.SecondaryField__iconWrapper_enterTo}
					leave={cls.SecondaryField__iconWrapper_leave}
					leaveFrom={cls.SecondaryField__iconWrapper_leaveFrom}
					leaveTo={cls.SecondaryField__iconWrapper_leaveTo}
				>
					{Icon && <Icon className={cls.SecondaryField__icon} />}
				</Transition>
			</div>
			{errorMessage && <span className={cls.SecondaryField__error}>{errorMessage}</span>}
			<Transition
				show={isFocused && renderLoader || renderOptions || renderNoOptions}
				as="ul"
				className={clsx(cls.SecondaryField__list, cls.List)}
				enter={cls.List_enter}
				enterFrom={cls.List_enterFrom}
				enterTo={cls.List_enterTo}
				leave={cls.List_leave}
				leaveFrom={cls.List_leaveFrom}
				leaveTo={cls.List_leaveTo}
			>
				{renderLoader && (
					<li className={clsx(cls.List__item, [cls.List__item_center])}>
						<Loader className={cls.List__loader} />
					</li>
				)}
				{renderOptions && optionItems}
				{renderNoOptions && (
					<li className={clsx(cls.List__item, [cls.List__item_center])}>
						Немає варіантів
					</li>
				)}
			</Transition>
		</div>
	);
};
