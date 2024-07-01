import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import empty from './assets/icons/empty.svg';
import half from './assets/icons/half.svg';
import filled from './assets/icons/Filled.svg';

const Rating = ({
	value: initialValue = undefined,
	steps = 0.5,
	emptyIcon = empty,
	halfFilledIcon = half,
	filledIcon = filled,
}) => {
	const [rating, setRating] = useState(initialValue);
	const [hoverRating, setHoverRating] = useState(undefined);

	const DefaultEmptyIcon = () => <img src={emptyIcon} alt='Empty' />;
	const DefaultHalfFilledIcon = () => <img src={halfFilledIcon} alt='Half Filled' />;
	const DefaultFilledIcon = () => <img src={filledIcon} alt='Filled' />;

	useEffect(() => {
		setRating(initialValue);
	}, [initialValue]);

	const handleRating = (newValue) => {
		setRating(newValue);
		setHoverRating(undefined);
	};

	const handleMouseOver = (event, value, index) => {
		if (steps !== 0.5) {
			const x = value === index + 1 ? value : index + 1;
			setHoverRating(x);
		} else {
			const isHalf = isLessThanHalf(event);
			const x = value === index + 1 ? value : index + 1;
			setHoverRating(isHalf ? x - 0.5 : x);
		}
	};

	const handleMouseLeave = () => {
		setHoverRating(undefined);
	};

	const isLessThanHalf = (event) => {
		const { target } = event;
		const boundingClientRect = target.getBoundingClientRect();
		let mouseAt = event.clientX - boundingClientRect.left;
		mouseAt = Math.round(Math.abs(mouseAt));
		const halfWidth = boundingClientRect.width / 2;
		return mouseAt <= halfWidth;
	};

	const handleKeyDown = (event) => {
		if (event.key === 'ArrowRight') {
			const increment = steps === 0.5 ? 0.5 : steps;
			const rate = rating === undefined ? 0 : rating;
			const newRating = rate + increment;
			if (newRating <= 5) {
				handleRating(newRating);
			}
		} else if (event.key === 'ArrowLeft') {
			const decrement = steps === 0.5 ? 0.5 : steps;
			const newRating = rating - decrement;
			if (newRating >= 0) {
				handleRating(newRating);
			}
		} else if (event.key >= '1' && event.key <= '5') {
			const numericValue = parseInt(event.key, 10);
			const newRating = numericValue;
			handleRating(newRating);
		}
	};

	useEffect(() => {
		const handleKeyPress = (event) => {
			handleKeyDown(event);
		};

		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [rating, steps]);

	const renderSymbol = (value, index) => {
		let IconComponent;
		if (hoverRating !== undefined) {
			const x = value === index + 1 ? value : index + 1;
			if (hoverRating >= x) {
				IconComponent = <DefaultFilledIcon />;
			} else if (hoverRating >= x - 0.5) {
				IconComponent = <DefaultHalfFilledIcon />;
			} else {
				IconComponent = <DefaultEmptyIcon />;
			}
		} else {
			const x = value === index + 1 ? value : index + 1;
			if (rating >= x) {
				IconComponent = <DefaultFilledIcon />;
			} else if (rating >= x - 0.5) {
				IconComponent = <DefaultHalfFilledIcon />;
			} else {
				IconComponent = <DefaultEmptyIcon />;
			}
		}

		return (
			<div
				key={index}
				className='rating-icon'
				data-testid='rating-icon'
				onClick={() => handleRating(value)}
				onMouseMove={(e) => handleMouseOver(e, value, index)}
				onMouseLeave={handleMouseLeave}
				style={{ cursor: 'pointer'}}
				tabIndex={0}
			>
				{IconComponent}
			</div>
		);
	};

	const maxRating = 5;
	const ratingArray = Array.from(
		{ length: maxRating * (1 / steps) },
		(_, index) => (index + 1) * steps
	);

	return (
		<div className='rating-component' data-testid='star-rating-container'>
			{ratingArray.slice(0, maxRating).map((value, index) => renderSymbol(value, index))}
		</div>
	);
};

Rating.propTypes = {
	value: PropTypes.number,
	steps: PropTypes.number,
	emptyIcon: PropTypes.elementType,
	halfFilledIcon: PropTypes.elementType,
	filledIcon: PropTypes.elementType,
};

export default Rating;
