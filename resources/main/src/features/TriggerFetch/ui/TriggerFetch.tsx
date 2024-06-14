import clsx from "clsx";
import {	forwardRef, memo } from "react";
import cls from "./TriggerFetch.module.scss";

interface TriggerFetchProps {
	className?: string;
}

export const TriggerFetch = memo(forwardRef<HTMLDivElement, TriggerFetchProps>(({ className }, ref) => {
	return (
		<div className={clsx(cls.TriggerFetch, [className])} ref={ref} />
	);
}));
