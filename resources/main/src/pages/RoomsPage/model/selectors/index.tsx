import { createSelector } from "@reduxjs/toolkit";
import { getMainRoutePath } from "@/shared/config/routes/path";
import { entityFacultiesSelectors } from "@/entities/Faculties";

export const getBreadcrumbs = createSelector([entityFacultiesSelectors.getData], 
	(entityFacultiesData) => {
	return [
		{
			id: 1,
			title: (
				<>
					Факультети: <b>{entityFacultiesData?.[0].slug_short}</b>
				</>
			),
			to: getMainRoutePath(),
		},
		{
			id: 2,
			title: "Кімнати",
		},
	];
});
