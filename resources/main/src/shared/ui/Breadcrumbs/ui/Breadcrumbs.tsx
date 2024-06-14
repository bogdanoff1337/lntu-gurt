import clsx from "clsx";
import {
	FC, ReactNode, memo, useMemo,
} from "react";
import { NavLink, To } from "react-router-dom";
import cls from "./Breadcrumbs.module.scss";

interface BreadcrumbsProps {
	className?: string;
	data: BreadcrumbsData[];
}

export interface BreadcrumbsData {
	id: number;
	title: string | ReactNode;
	to?: To;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = memo(({ className, data }) => {
	const breadcrumbsItems = useMemo(() => {
		return data.map(({ id, to, title }) => {
			return (
				<li key={id} className={cls.Breadcrumbs__item}>
					{to ? (
						<NavLink to={to} className={cls.Breadcrumbs__link}>
							{title}
						</NavLink>
					) : (
						<div className={cls.Breadcrumbs__link}>
							{title}
						</div>
					)}
				</li>
			);
		});
	}, [data]);

	return (
		<nav className={clsx(cls.Breadcrumbs, [className])}>
			<ul className={cls.Breadcrumbs__list}>
				{breadcrumbsItems}
			</ul>
		</nav>
	);
});
