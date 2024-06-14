import clsx from "clsx";
import {
	FC, memo, useCallback, useMemo,
} from "react";
import { entityGendersModal } from "@/entities/Genders";
import { SelectSecondary, SelectSecondaryProps } from "@/shared/ui/Select/ui/SelectSecondary/SelectSecondary";
import cls from "./GenderSelect.module.scss";

type ModifiedSelectSecondaryProps = Omit<SelectSecondaryProps, "onChange">;

interface GenderSelectProps extends ModifiedSelectSecondaryProps {
	className?: string;
	onChange: (value: string) => void;
	value: string | null;
}

export const GenderSelect: FC<GenderSelectProps> = memo(({
	className, onChange, value, ...otherProps
}) => {
	const idByName = useMemo(() => {
		return entityGendersModal.find((item) => item.slug === value)?.id;
	}, [value]);

	const onChangeGender = useCallback((id: number) => {
		const value = entityGendersModal.find((item) => item.id === id)!.slug;

		onChange(value);
	}, [onChange]);

	return (
		<SelectSecondary
			className={clsx(cls.GenderSelect, [className])}
			id={idByName}
			placeholder="Стать"
			onChange={onChangeGender}
			options={entityGendersModal}
			{...otherProps}
		/>
	);
});
