import { createSelector } from "@reduxjs/toolkit";
import queryString from "query-string";
import { entityFacultiesSelectors } from "@/entities/Faculties";
import { getMainRoutePath } from "@/shared/config/routes/path";

export const getBreadcrumbs = createSelector(
	[entityFacultiesSelectors.getData],
	(entityFacultiesData) => {
		const { faculty_id } = queryString.parse(window.location.search);
		return [
			{
				id: 1,
				title: (
					<>
						Факультети: <b>{entityFacultiesData?.find(({ id }) => id === Number(faculty_id))?.slug_short}</b>
					</>
				),
				to: getMainRoutePath(),
			},
			{
				id: 2,
				title: "Кімнати",
			},
		];
	},
);
