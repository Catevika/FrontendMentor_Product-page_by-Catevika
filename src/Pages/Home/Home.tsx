import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import LightBox from "../../components/LightBox/LightBox";
import Cart from "../../components/Cart/Cart";
import minus from "../../assets/icons/icon-minus.svg";
import plus from "../../assets/icons/icon-plus.svg";
import { useCart } from "../../Context/CartContext/CartContextProvider";
import { bigImages, thumbnailImages } from "../../data";

const Home = ({ isCartOpen }: { isCartOpen: boolean }) => {
	const { count, setCount, dispatch } = useCart();

	// for bigImages
	const imageIndexStr = sessionStorage.getItem("selectedIndex") || "1";
	const imageIndex = parseInt(imageIndexStr);

	const [selectedIndex, setSelectedIndex] = useState(imageIndex);

	// for bigImages on mobile devices
	const isSmallScreen = useMediaQuery({ maxWidth: 855 });

	const handlePrevious = () => {
		if (selectedIndex > 0) {
			setSelectedIndex((selectedIndex) => selectedIndex - 1);
			sessionStorage.setItem(
				"selectedIndex",
				JSON.stringify(selectedIndex - 1)
			);
		} else {
			setSelectedIndex(bigImages.length - 1);
			sessionStorage.setItem(
				"selectedIndex",
				JSON.stringify(bigImages.length - 1)
			);
		}
	};

	const handleNext = () => {
		if (selectedIndex < bigImages.length - 1) {
			setSelectedIndex((selectedIndex) => selectedIndex + 1);
			sessionStorage.setItem(
				"selectedIndex",
				JSON.stringify(selectedIndex + 1)
			);
		} else {
			setSelectedIndex(0);
			sessionStorage.setItem("selectedIndex", "0");
		}
	};

	// For Lightbox
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

	const toggleLightbox = () => {
		setIsLightboxOpen(!isLightboxOpen);
		sessionStorage.setItem("selectedIndex", JSON.stringify(selectedIndex));
	};

	// For Cart
	const addToCart = () => {
		dispatch({
			type: "ADD_TO_CART",
			item: {
				id: selectedIndex,
				imageSrc: bigImages[0].imageSrc,
				title: "Fall Limited Edition Sneakers",
			},
		});
	};

	// For Quantity button
	const handleMinus = () => {
		if (count > 0) {
			setCount((count) => count - 1);
		}

		if (count - 1 === 0) {
			dispatch({ type: "RESET_CART" });
		}
	};

	return (
		<main className="product-section">
			<div className="product-container">
				<div className="product-images-container">
					<div className="product-images">
						<div className="product-big-images">
							{isSmallScreen ?
								<p className="lightbox-arrow left" onClick={handlePrevious}>
									<svg
										role="img"
										className="lightbox-arrow-icon"
										width="12"
										height="18"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>Arrow left icon</title>
										<path
											d="M11 1 3 9l8 8"
											stroke="currentColor"
											strokeWidth="3"
											fill="none"
											fillRule="nonzero"
										/>
									</svg>
								</p>
							:	null}
							{isSmallScreen ?
								bigImages.map((bigImage) => (
									<img
										key={bigImage.id}
										id={JSON.stringify(bigImage.id)}
										src={bigImage.imageSrc}
										alt={`sneaker-${bigImage.id + 1}`}
										className={`product-big-image ${bigImage.id === selectedIndex ? "active" : ""}`}
									/>
								))
							:	bigImages.map((bigImage) => (
									<img
										key={bigImage.id}
										id={JSON.stringify(bigImage.id)}
										src={bigImage.imageSrc}
										alt={`sneaker-${bigImage.id + 1}`}
										className={`product-big-image ${bigImage.id === selectedIndex ? "active" : ""}`}
										onClick={toggleLightbox}
									/>
								))
							}

							{isSmallScreen ?
								<p className="lightbox-arrow right" onClick={handleNext}>
									<svg
										role="img"
										className="lightbox-arrow-icon"
										width="13"
										height="18"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>Arrow right icon</title>
										<path
											d="m2 1 8 8-8 8"
											stroke="currentColor"
											strokeWidth="3"
											fill="none"
											fillRule="nonzero"
										/>
									</svg>
								</p>
							:	null}
						</div>
						<div className="product-img-thumbnails">
							{thumbnailImages.map((thumbnailImage) => {
								return (
									<div
										key={thumbnailImage.id}
										onClick={() => {
											setSelectedIndex(thumbnailImage.id);
										}}
										className={
											thumbnailImage.id === selectedIndex ?
												"product-img-thumbnail-div active"
											:	"product-img-thumbnail-div"
										}
									>
										<img
											src={thumbnailImage.imageSrc}
											alt={`sneaker-thumbnail-${thumbnailImage.id + 1}`}
											className={
												thumbnailImage.id === selectedIndex ?
													"product-img-thumbnail active"
												:	"product-img-thumbnail"
											}
										/>
									</div>
								);
							})}
						</div>
					</div>
					{isLightboxOpen ?
						<LightBox toggleLightbox={toggleLightbox} />
					:	null}
				</div>
				<section className="product-text-container">
					<div className="product-text">
						<div className="product-titles">
							<h1 className="product-title">Fall Limited Edition Sneakers</h1>
							<h2 className="product-subtitle">sneaker company</h2>
						</div>

						<div className="product-description">
							<p>
								These low-profile sneakers are your perfect casual wear
								companion. Featuring a durable rubber outer sole, they&apos;ll
								withstand everything the weather can offer.
							</p>
						</div>

						<div className="product-prices">
							<p className="product-price">
								$125.00 <span>50%</span>
							</p>
							<p className="product-price crossed-text">
								<s>$250.00</s>
							</p>
						</div>

						<div className="product-buttons">
							<p className="product-quantity-btn">
								<span onClick={handleMinus}>
									<img
										src={minus}
										alt="Minus sign icon"
										className="product-minus-icon"
									/>
								</span>
								<span className="product-quantity">{count}</span>
								<span
									onClick={() => {
										setCount((count) => count + 1);
									}}
								>
									<img
										src={plus}
										alt="Plus sign icon"
										className="product-plus-icon"
									/>
								</span>
							</p>
							<button
								type="button"
								className="product-cart-btn"
								onClick={addToCart}
							>
								<svg
									role="img"
									className="cart-icon"
									width="22"
									height="20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Cart icon</title>
									<path
										d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
										fill="currentColor"
										fillRule="nonzero"
									/>
								</svg>
								Add to cart
							</button>
						</div>
						{isCartOpen === true ?
							<Cart />
						:	null}
					</div>
				</section>
			</div>
		</main>
	);
};

export default Home;
