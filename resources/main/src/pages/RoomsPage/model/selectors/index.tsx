import { createSelector } from "@reduxjs/toolkit";
import queryString from "query-string";
import { entityRoomsSelectors } from "@/entities/Rooms";
import { getMainRoutePath } from "@/shared/config/routes/path";
import { entityFacultiesSelectors } from "@/entities/Faculties";

export const getBreadcrumbs = createSelector([entityFacultiesSelectors.getEntityFacultiesData], (entityFacultiesData) => {
	const { faculty_id } = queryString.parse(window.location.search);
	const activeFaculty = entityFacultiesData?.find((faculty) => faculty.id === Number(faculty_id));
	return [
		{
			id: 1,
			//! hardcore
			title: (
				<>
					Факультети: <b>{activeFaculty?.slug_short}</b>
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
