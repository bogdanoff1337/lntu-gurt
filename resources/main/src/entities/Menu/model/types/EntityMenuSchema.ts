import { FunctionComponent, ReactElement, SVGProps } from "react";

export interface EntityMenuSchema {
	data: {
		Icon: FunctionComponent<SVGProps<SVGSVGElement>>,
		name: string;
		is?: boolean;
	}[]
}
