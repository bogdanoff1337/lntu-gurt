import { FC, ReactNode } from "react";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header/Header";
import cls from "./Page.module.scss";

interface PageProps {
	className?: string;
	children?: ReactNode;
}

export const Page: FC<PageProps> = ({ className, children }) => {
	return (
		<div className={cls.Page}>
			<Header className={cls.Page__header} />
			<main className={cn(cls.Page__main, {}, [className])}>
				{children}
			</main>
			<Footer className={cls.Page__footer} />
		</div>
	);
};
