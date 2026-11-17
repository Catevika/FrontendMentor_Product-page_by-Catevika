import React, {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { INITIAL_STATE } from "./CartContextState";
import CartReducer, { type CartAction } from "./CartReducer";
import type { CartState } from "../../types";

type CartContextValue = CartState & {
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
	dispatch: React.Dispatch<CartAction>;
};

export const CartContext = createContext<CartContextValue | undefined>(
	undefined
);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartContextProvider");
	}
	return context;
};

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
	const [count, setCount] = useState(() => {
		const savedCount = Number(sessionStorage.getItem("count"));
		return Number.isInteger(savedCount) && savedCount > 0 ? savedCount : 0;
	});

	useEffect(() => {
		sessionStorage.setItem("cart", JSON.stringify(state.cart));
	}, [state.cart]);

	useEffect(() => {
		sessionStorage.setItem("count", JSON.stringify(count));
	}, [count]);

	return (
		<CartContext.Provider
			value={{
				cart: state.cart,
				isFetching: state.isFetching,
				error: state.error,
				count,
				setCount,
				dispatch,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
