import clsx from "clsx";
import { FC, ReactNode } from "react";
import { PageLoader } from "@/shared/ui/PageLoader";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header/Header";
import cls from "./Page.module.scss";

interface PageProps {
	className?: string;
	children?: ReactNode;
	Breadcrumbs?: ReactNode;
	isLoading?: boolean;
}

export const Page: FC<PageProps> = ({
	className, children, Breadcrumbs, isLoading = false,
}) => {
	return (
		<div className={cls.Page}>
			<Header className={cls.Page__header} Breadcrumbs={Breadcrumbs} />
			<main className={clsx(cls.Page__main, [className])}>
				{isLoading ? <PageLoader /> : children}
			</main>
			<Footer className={cls.Page__footer} />
		</div>
	);
};
