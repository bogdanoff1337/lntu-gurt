import { createSelector } from "@reduxjs/toolkit";
import { entityRoomSelectors } from "@/entities/Room";
import {
	getBookedRoutePath, getMainRoutePath, getRoomsRoutePath,
} from "@/shared/config/routes/path";

export const getBreadcrumbs = createSelector(
	[entityRoomSelectors.getData, (state, locationState) => locationState],
	(entityRoomData, locationState) => {
		if (locationState.previousLocationPathname === getBookedRoutePath()) {
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
					search: locationState.previousLocationSearch,
				},
			},
			{
				id: 3,
				title: `Кімната${entityRoomData?.number ? `: ${entityRoomData?.number}` : ""}`,
			},
		];
	},
);
