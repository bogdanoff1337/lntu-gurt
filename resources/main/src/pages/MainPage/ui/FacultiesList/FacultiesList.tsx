import clsx from "clsx";
import { FC, useMemo } from "react";
import {
	Faculty,
	FacultyItem,
} from "@/entities/Faculties";
import cls from "./FacultiesList.module.scss";

interface FacultiesListProps {
	className?: string;
	data: Faculty[];
}

export const FacultiesList: FC<FacultiesListProps> = ({ className, data }) => {
	const facultiesItems = useMemo(() => {
		return data?.map(({ id, image, slug }) => (
			<FacultyItem key={id} image={image} slug={slug} id={id} />
		));
	}, [data]);

	return (
		<ul className={clsx(cls.FacultiesList, [className])}>
			{facultiesItems}
		</ul>
	);
};
