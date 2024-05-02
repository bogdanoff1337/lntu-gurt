import clsx from "clsx";
import { FC, ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header/Header";
import cls from "./Page.module.scss";

interface PageProps {
	className?: string;
	children?: ReactNode;
	Breadcrumbs?: ReactNode;
}

export const Page: FC<PageProps> = ({ className, children, Breadcrumbs }) => {
	return (
		<div className={cls.Page}>
			<Header className={cls.Page__header} Breadcrumbs={Breadcrumbs} />
			<main className={clsx(cls.Page__main, [className])}>
				{children}
			</main>
			<Footer className={cls.Page__footer} />
		</div>
	);
};
