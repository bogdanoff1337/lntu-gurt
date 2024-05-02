import clsx from "clsx";
import { FC, SVGProps } from "react";
import cls from "./Icon.module.scss";

type SvgProps = Omit<SVGProps<SVGSVGElement>, "className">;

interface IconProps extends SvgProps {
	Svg: FC<SVGProps<SVGSVGElement>>;
	className?: string;
}

export const Icon: FC<IconProps> = ({ className, Svg, ...props }) => (
	<Svg className={clsx(cls.Icon, [className])} {...props} />
);
