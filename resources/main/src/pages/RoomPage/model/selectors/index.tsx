import { createSelector } from "@reduxjs/toolkit";
import { entityRoomSelectors } from "@/entities/Room";
import {
	getBookedRoutePath, getMainRoutePath, getRoomsRoutePath,
} from "@/shared/config/routes/path";
import { generateQueryString } from "@/shared/lib/generateQueryString";

export const getBreadcrumbs = createSelector(
	[entityRoomSelectors.getData, (state, previousLocationPathname) => previousLocationPathname],
	(entityRoomData, previousLocationPathname) => {
		if (previousLocationPathname === getBookedRoutePath()) {
			return [
				{
					id: 1,
					title: (
						<>
							Факультети{entityRoomData ? <>: <b>{entityRoomData?.faculty.slug_short}</b></> : null}
						</>
					),
					to: getMainRoutePath(),
				},
				{
					id: 2,
					title: "Заброньовані",
					to: getBookedRoutePath(),
				},
				{
					id: 3,
					title: `Кімната${entityRoomData?.number ? `: ${entityRoomData?.number}` : ""}`,
				},
			];
		}

		return [
			{
				id: 1,
				title: (
					<>
						Факультети{entityRoomData ? <>: <b>{entityRoomData?.faculty.slug_short}</b></> : null}
					</>
				),
				to: getMainRoutePath(),
			},
			{
				id: 2,
				title: "Кімнати",
				to: {
					pathname: getRoomsRoutePath(),
					search: generateQueryString({
						faculty_id: entityRoomData?.faculty?.id,
						dormitory_id: entityRoomData?.dormitory?.id,
						gender: entityRoomData?.gender,
					}),
				},
			},
			{
				id: 3,
				title: `Кімната${entityRoomData?.number ? `: ${entityRoomData?.number}` : ""}`,
			},
		];
	},
);
