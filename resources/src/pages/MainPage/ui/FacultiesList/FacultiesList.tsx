import { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { FacultyItem, FacultyItemSkeleton, entityFacultiesActions, entityFacultiesSelectors } from "@/entities/Faculties";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { CardGrid } from "@/shared/ui/CardGrid";
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
			<FacultyItem key={id} image={image} slug={slug} />
		));
	}, [facultiesData]);

	if (facultiesDataIsLoading) {
		<CardGrid className={cn(cls.FacultiesList, {}, [className])}>
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
		</CardGrid>;
	}

	return (
		<CardGrid className={cn(cls.FacultiesList, {}, [className])}>
			{facultiesItems}
         <FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
			<FacultyItemSkeleton />
		</CardGrid>
	);
};
