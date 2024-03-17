import {
	FC, memo, useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import { Devices } from "@/shared/const/common";
import { classNames as cn } from "@/shared/lib/classNames/classNames";
import DecorateIcon from "../../assets/decorate.svg";
import LogoMobileIcon from "../../assets/logo-mobile.svg";
import LogoPcIcon from "../../assets/logo-pc.svg";
import { Button } from "../Button/Button";
import cls from "./Carrousel.module.scss";

interface CarrouselProps {
	className?: string;
	data: string[];
}

export const Carrousel: FC<CarrouselProps> = memo(({
	className, data,
}) => {
	const listRef = useRef<HTMLUListElement>(null);
	const [maxIndexItem, setMaxIndexItem] = useState(0);
	const [currentIndexItem, setCurrentIndexItem] = useState(0);
	const [isShowLeftButton, setIsShowLeftButton] = useState(false);
	const [isShowRightButton, setIsShowRightButton] = useState(false);
	const isTablet = useMediaQuery({ maxWidth: Devices.TABLET });

	useEffect(() => {
		if (listRef.current) {
			setMaxIndexItem(listRef.current.children.length - 1);
		}
	}, []);

	useEffect(() => {
		if (listRef.current) {
			// @ts-ignore
			const itemWidth = listRef.current.children[currentIndexItem].offsetLeft - listRef.current.offsetLeft;
			listRef.current.scrollTo({
				left: itemWidth,
				behavior: "smooth",
			});

			const { clientWidth, scrollWidth } = listRef.current;
			const scrollWidthPassed = itemWidth + clientWidth;
			if (scrollWidthPassed >= scrollWidth) {
				setIsShowRightButton(false);
			} else {
				setIsShowRightButton(true);
			}
		}

		if (currentIndexItem === 0) {
			setIsShowLeftButton(false);
		} else {
			setIsShowLeftButton(true);
		}
	}, [currentIndexItem]);

	const onClickDotHandler = useCallback((index: number) => () => {
		setCurrentIndexItem(index);
	}, []);

	const dotsItems = useMemo(() => {
		return new Array(maxIndexItem + 1).fill(undefined).map((_, i) => {
			return (
				<li
					key={i}
					className={cn(cls.Carrousel__dotItem, {
						[cls.Carrousel__dotItem_active]: i === currentIndexItem,
					})}
					onClick={onClickDotHandler(i)}
				/>
			);
		}, []);
	}, [currentIndexItem, maxIndexItem, onClickDotHandler]);

	const carrouselItems = useMemo(() => {
		return data.map((photo) => {
			return 				(
				<li className={cls.Carrousel__carrouselItem}>
					<img className={cls.Carrousel__image} src={photo} alt="slide" />
				</li>
			);
		}, []);
	}, [data]);

	return (
		<div className={cn(cls.Carrousel, {
		}, [className])}
		>
			<div className={cls.Carrousel__listWrapper}>
				<ul ref={listRef} className={cls.Carrousel__carrouselList}>
					{carrouselItems}
				</ul>
			</div>
			<div className={cls.Carrousel__navWrapper}>
				<ul className={cls.Carrousel__dotsList}>
					{dotsItems}
				</ul>
			</div>
		</div>
	);
});
