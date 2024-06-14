import clsx from "clsx";
import {
	FC, memo,
} from "react";
import { entityCoursesModel } from "@/entities/Courses";
import { SelectSecondaryProps } from "@/shared/ui/Select";
import { SelectSecondary } from "@/shared/ui/Select/ui/SelectSecondary/SelectSecondary";
import cls from "./CourseSelect.module.scss";

type ModifiedSelectSecondaryProps = Omit<SelectSecondaryProps, "onChange">;

interface CourseSelectProps extends ModifiedSelectSecondaryProps {
	className?: string;
	onChange: (id: number) => void;
	id?: number | null;
}

export const CourseSelect: FC<CourseSelectProps> = memo(({
	className, onChange, id, ...otherProps
}) => {
	return (
		<SelectSecondary
			className={clsx(cls.CourseSelect, [className])}
			id={id}
			placeholder="Курс"
			onChange={onChange}
			options={entityCoursesModel}
			{...otherProps}
		/>
	);
});
