import { DependencyList, useEffect } from "react";

interface UseClickWindow {
	onClick: () => void;
}

export const useClickWindow = ({ onClick }: UseClickWindow, [...args]: DependencyList) => {
	useEffect(() => {
		window.addEventListener("click", onClick);

		return () => {
			window.removeEventListener("click", onClick);
		};
	}, [onClick, ...args]);
};
