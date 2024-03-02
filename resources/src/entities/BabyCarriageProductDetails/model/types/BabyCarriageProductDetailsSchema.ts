export interface BabyCarriageProductDetailsSchema {
	data?: BabyCarriageData;
	isLoading: boolean;
	isError?: boolean
}

export interface BabyCarriageData {
	id: number;
	title: string;
	available?: boolean;
	code: string;
	price: number;
	discountPrice: number;
	discountPercent: number;

	productsGender: {
		id: number;
		list: ProductsGender[];
	},
	productsColor: {
		id: number;
		list: ProductsColor[];
	}
	productsFeedback: {
		id: number;
		list: ProductsFeedback[];
	}
	productsImage: {
		id: number;
		list: Image[];
	},
	productsDesc: {
		id: number;
		list: ProductsDesc[];
	},
	productsCharacter: {
		id: number;
		list: ProductsCharacter[];
	}
}

export interface ProductsGender {
	id: number;
	gender: string;
}

export interface ProductsColor {
	id: number;
	color: string;
}

export interface ProductsCharacter {
	id: number;
	name: string;
	character: string;
}

export interface ProductsDesc extends Image {
	text: string;
}

export interface ProductsFeedback {
	id: number;
	date: string;
	name: string;
	rating: number;
	text: string;
	images: Image[]
}

export interface Image {
	id: number;
	src: string;
	alt: string;
}
