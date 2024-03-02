import { getBabyCarriageRoutePath, getMainRoutePath } from "@/shared/config/routes/path";

interface BreadcrumbsModel {
	path: string;
	name: string;
}

export const breadcrumbsModel: BreadcrumbsModel[] = [
	{
		path: getMainRoutePath(),
		name: "Головна",
	},
	{
		path: getBabyCarriageRoutePath(),
		name: "Дитячі коляски",
	},
];
