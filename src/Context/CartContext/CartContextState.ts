import type { CartState } from "../../types";

export const INITIAL_STATE: CartState = {
	cart: [],
	isFetching: false,
	error: false,
};
