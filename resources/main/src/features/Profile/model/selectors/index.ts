import { createSelector } from "@reduxjs/toolkit";
import { entityFacultiesSelectors } from "@/entities/Faculties";

export const getFacultiesOption = createSelector(entityFacultiesSelectors.getData, (entityFaculty) => {
	return entityFaculty?.map(({ id, slug_short }) => ({ id, slug: slug_short }));
});
