import {
	FC,
} from "react";
import { Page } from "@/widgets/Page";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import cls from "./MainPage.module.scss";


interface MainPageProps {
	className?: string
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
	return (
		<Page className={cn(cls.MainPage, {}, [className])}>
			MainPage
		</Page>
	);
};
