import { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
	FacultyItem, FacultyItemSkeleton, entityFacultiesActions, entityFacultiesSelectors,
} from "@/entities/Faculties";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { CardGrid } from "@/shared/ui/CardGrid";
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
			<FacultyItem key={id} image={image} slug={slug} id={id} />
		));
	}, [facultiesData]);

	if (facultiesDataIsLoading) {
		return (
			<PageLoader />
		);
	}

	return (
		<div className={cn(cls.FacultiesList, {}, [className])}>
			{facultiesItems}
		</div>
	);
};
