import { FC, useEffect, useState } from "react";
import { $api } from "@/shared/api/api";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Faculty } from "../../model/types/FacultiesSchema";
import { FacultyItem } from "../FacultyItem/FacultyItem";
import cls from "./FacultiesList.module.scss";

interface FacultiesListProps {
	className?: string;
}

export const FacultiesList: FC<FacultiesListProps> = ({ className }) => {
	const dispatch = useAppDispatch();

	const [data, setData] = useState<Faculty[]>([]);

	useEffect(() => {
		$api.get("faculties")
			.then((response) => {
				console.log(response.data.data);
				setData(response.data.data);
			});
	}, []);

	return (
		<div className={classNames(cls.FacultiesList, {}, [className])}>
			{data.map((item) => (
				<FacultyItem
					key={item.id}
					alt={item.slug}
					src={item.image}
					facultName={item.slug}
				/>
			))}
		</div>
	);
};
