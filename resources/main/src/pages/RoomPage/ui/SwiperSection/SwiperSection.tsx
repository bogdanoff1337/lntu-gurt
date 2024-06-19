import "swiper/css";

import clsx from "clsx";
import {
	FC, memo, useEffect, useMemo,
	useRef,
} from "react";
import { useMediaQuery } from "react-responsive";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";
import { Devices } from "@/shared/const/common";
import { Container } from "@/shared/ui/Container";
import { Img } from "@/shared/ui/Img";
import cls from "./SwiperSection.module.scss";

interface SwiperSectionProps {
	className?: string;
	images?: string[];
}

const images = [ // !hardcore
	"https://kartinki.pics/uploads/posts/2022-03/1647619378_1-kartinkin-net-p-petukhi-kartinki-1.jpg",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxHpRFPjKzOsmAUfJtb913G3agNMlKdzOQdsLRMEIpWkKKPTGvnRvyFUH18DNbfX0Z5hw&usqp=CAU",
	"https://cdn.abo.media/upload/article/res/770-430/ffxcd3hf1bms2au1hc5u.jpg",
];

export const SwiperSection: FC<SwiperSectionProps> = memo(({ className }) => {
	const isMobile = useMediaQuery({ maxWidth: Devices.MOBILE });

	const swiperSlidesItems = useMemo(() => {
		return images?.map((image, i) => {
			return (
				<li className="swiper-slide" key={i}>
					<Img
						className={{
							image: cls.Image,
							skeleton: cls.Image,
						}}
						src={image}
						alt=""
					/>
				</li>
			);
		});
	}, []);

	const swiperContainerRef = useRef(null);
	const nextButtonRef = useRef(null);
	const prevButtonRef = useRef(null);
	const paginationRef = useRef(null);
	const swiperInstanceRef = useRef<any>(null);

	useEffect(() => {
		if (swiperContainerRef.current) {
			swiperInstanceRef.current = new Swiper(swiperContainerRef.current, {
				spaceBetween: 50,
				slidesPerView: 1,
				navigation: {
					nextEl: nextButtonRef.current,
					prevEl: prevButtonRef.current,
				},
				modules: [Navigation, Pagination],
				pagination: {
					el: paginationRef.current,
					clickable: true,
					type: "bullets",
					bulletClass: `${cls.Bullets__bullet}`,
					bulletActiveClass: `${cls.Bullets__bullet_active}`,
					bulletElement: "li",
				},
				centeredSlides: true,
				breakpoints: {
					768: {
						slidesPerView: "auto",
					},
				},
			});
		}

		return () => {
			if (swiperInstanceRef.current) {
				swiperInstanceRef.current.destroy(true, true);
			}
		};
	}, []);

	return (
		<section className={clsx(cls.SwiperSection, [className])}>
			<Container isDisabled={!isMobile}>
				<div
					className={clsx(cls.SwiperSection__swiperContainer, "swiper-container")}
					ref={swiperContainerRef}
				>
					<div className="swiper-wrapper">
						{swiperSlidesItems}
					</div>
					<div className={cls.SwiperSection__navigation}>
						<button aria-label="prev-slide" className={clsx(cls.ArrowButton)} ref={prevButtonRef}>
							<ArrowIcon className={clsx(cls.ArrowButton__icon, [cls.ArrowButton__icon_prev])} />
						</button>

						<ul
							className={clsx(
								cls.Bullets,
								[cls.SwiperSection__pagination],
							)}
							ref={paginationRef}
						/>
						<button aria-label="next-slide" className={clsx(cls.ArrowButton)} ref={nextButtonRef}>
							<ArrowIcon className={clsx(cls.ArrowButton__icon, [cls.ArrowButton__icon_next])} />
						</button>
					</div>

				</div>
			</Container>
		</section>
	);
});
