import { createSelector } from "@reduxjs/toolkit";
import queryString from "query-string";
import { entityFacultiesSelectors } from "@/entities/Faculties";
import { getMainRoutePath } from "@/shared/config/routes/path";

export const getBreadcrumbs = createSelector(
	[entityFacultiesSelectors.getData, (state) => window.location.search],
	(entityFacultiesData, search) => {
		const { faculty_id } = queryString.parse(search);

		const faculty = entityFacultiesData?.find(({ id }) => id === Number(faculty_id));

		return [
			{
				id: 1,
				title: (
					<>
						Факультети: <b>{faculty?.slug_short}</b>
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
