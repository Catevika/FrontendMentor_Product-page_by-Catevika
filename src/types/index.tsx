import type { MouseEventHandler } from "react";

export interface NavbarType {
	isMenuOpen: boolean;
	toggleMenu: MouseEventHandler<HTMLElement>;
	isCartOpen: boolean;
	handleClick: () => void;
}

export interface CartItem {
	id: number;
	imageSrc: string;
	title: string;
	quantity?: number;
}

export interface CartState {
	cart: CartItem[];
	isFetching: boolean;
	error: boolean;
}
