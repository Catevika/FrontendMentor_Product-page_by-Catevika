import type { CartState, CartItem } from "../../types";

export type CartAction =
	| { type: "ADD_TO_CART"; item: CartItem }
	| { type: "REMOVE_FROM_CART"; id: number }
	| { type: "RESET_CART" };

const CartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case "ADD_TO_CART":
			return {
				...state,
				cart: [...state.cart, action.item],
				isFetching: false,
				error: false,
			};

		case "REMOVE_FROM_CART":
			const index = state.cart.findIndex(
				(cartItem) => cartItem.id === action.id
			);
			const newCart = [...state.cart];
			if (index >= 0) {
				newCart.splice(index, 1);
			}
			return {
				...state,
				cart: newCart,
				isFetching: false,
				error: false,
			};

		case "RESET_CART":
			return {
				...state,
				cart: [],
				isFetching: false,
				error: false,
			};

		default:
			return state;
	}
};

export default CartReducer;
