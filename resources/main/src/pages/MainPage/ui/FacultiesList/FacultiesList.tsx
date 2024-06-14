import clsx from "clsx";
import {
	FC, memo, useEffect, useMemo,
} from "react";
import { useSelector } from "react-redux";
import {
	FacultyItem,
	entityFacultiesActions,
	entityFacultiesSelectors,
} from "@/entities/Faculties";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PageLoader } from "@/shared/ui/PageLoader";
import cls from "./FacultiesList.module.scss";

interface FacultiesListProps {
	className?: string;
}

export const FacultiesList: FC<FacultiesListProps> = memo(({ className }) => {
	const facultiesData = useSelector(entityFacultiesSelectors.getData);
	const facultiesIsLoading = useSelector(entityFacultiesSelectors.getIsLoading);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!facultiesData) {
			dispatch(entityFacultiesActions.getAllFaculties());
		}
	}, [dispatch, facultiesData]);

	const facultiesItems = useMemo(() => {
		return facultiesData?.map(({ id, image, slug }) => (
			<FacultyItem key={id} image={image} slug={slug} id={id} />
		));
	}, [facultiesData]);

	if (facultiesIsLoading) {
		return <PageLoader />;
	}

	return (
		<ul className={clsx(cls.FacultiesList, [className])}>
			{facultiesItems}
		</ul>
	);
});
