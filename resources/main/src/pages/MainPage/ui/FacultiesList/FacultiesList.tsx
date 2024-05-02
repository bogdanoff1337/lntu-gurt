import clsx from "clsx";
import { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
	FacultyItem, entityFacultiesActions, entityFacultiesSelectors,
} from "@/entities/Faculties";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/shared/ui/PageLoader";
import cls from "./FacultiesList.module.scss";

interface FacultiesListProps {
	className?: string
}

export const FacultiesList: FC<FacultiesListProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const facultiesData = useSelector(entityFacultiesSelectors.getEntityFacultiesData);
	const facultiesDataIsLoading = useSelector(entityFacultiesSelectors.getEntityFacultiesIsLoading);

	useEffect(() => {
		dispatch(entityFacultiesActions.getAllFaculties());
	}, [dispatch]);

	const facultiesItems = useMemo(() => {
		return facultiesData?.map(({ id, image, slug }) => (
			<FacultyItem key={id} image={`/photos/uploads/facult/${image}`} slug={slug} id={id} />
		));
	}, [facultiesData]);

	if (facultiesDataIsLoading) {
		return (
			<PageLoader />
		);
	}

	return (
		<div className={clsx(cls.FacultiesList, [className])}>
			{facultiesItems}
		</div>
	);
};
