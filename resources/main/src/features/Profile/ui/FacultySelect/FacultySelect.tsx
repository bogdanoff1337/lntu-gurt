import clsx from "clsx";
import {
	FC, memo,
} from "react";
import { useSelector } from "react-redux";
import { SelectSecondaryProps } from "@/shared/ui/Select";
import { SelectSecondary } from "@/shared/ui/Select/ui/SelectSecondary/SelectSecondary";
import * as selectors from "../../model/selectors";
import cls from "./FacultySelect.module.scss";

type ModifiedSelectSecondaryProps = Omit<SelectSecondaryProps, "onChange">;

interface FacultySelectProps extends ModifiedSelectSecondaryProps {
	className?: string;
	onChange: (id: number) => void;
	id?: number | null;
}

export const FacultySelect: FC<FacultySelectProps> = memo(({
	className, onChange, id, ...otherProps
}) => {
	const facultiesOption = useSelector(selectors.getFacultiesOption);

	return (
		<SelectSecondary
			className={clsx(cls.FacultySelect, [className])}
			id={id}
			placeholder="Факультет"
			onChange={onChange}
			options={facultiesOption}
			{...otherProps}
		/>
	);
});
