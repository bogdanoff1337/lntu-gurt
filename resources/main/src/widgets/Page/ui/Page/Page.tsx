import clsx from "clsx";
import {
	FC, ReactNode,
	memo,
} from "react";
import { BreadcrumbsData } from "@/shared/ui/Breadcrumbs";
import { PageLoader } from "@/shared/ui/PageLoader";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header/Header";
import cls from "./Page.module.scss";

interface PageProps {
	className?: string;
	children?: ReactNode;
	breadcrumbsData?: BreadcrumbsData[];
	isLoading?: boolean;
}

export const Page: FC<PageProps> = memo(({
	className, children, breadcrumbsData, isLoading = false,
}) => {
	return (
		<div className={cls.Page}>
			<Header className={cls.Page__header} breadcrumbsData={breadcrumbsData} />
			<main className={clsx(cls.Page__main, [className])}>
				{isLoading ? <PageLoader /> : children}
			</main>
			<Footer className={cls.Page__footer} />
		</div>
	);
});
