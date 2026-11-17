import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import type { NavbarType } from "../../types";

const BasicLayout = ({
	isMenuOpen,
	toggleMenu,
	isCartOpen,
	handleClick,
}: NavbarType) => {
	return (
		<>
			<Navbar
				isCartOpen={isCartOpen}
				handleClick={handleClick}
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
			/>
			<Outlet />
		</>
	);
};

export default BasicLayout;
