# Rating Component

## Overview

The Rating component allows users to provide ratings through an interactive set of icons (stars). The component supports full, half, and empty states for the icons and allows customization of the icons used.

## Props

The Rating component accepts the following props:

- `value` (Number): The initial value of the rating. Should be between 0.5 and 5. Default is `undefined`.
- `steps` (Number): The step value for the rating increments. Can be `0.5` or `1`. Default is `0.5`.
- `emptyIcon` (String): Path to the empty icon. Default is `empty.svg`.
- `halfFilledIcon` (String): Path to the half-filled icon. Default is `half.svg`.
- `filledIcon` (String): Path to the filled icon. Default is `filled.svg`.

## Features

### Initial Setup

- The component should render 5 rating icons in the initial empty state.
- Each icon should be rendered in an `img` tag using the `src` property to set the corresponding icon.
- Each icon must have the `data-testid="rating-icon"`.
- The icons must be rendered inside a container that must have the `data-testid="star-rating-container"`.
- If a valid value is passed as a prop to the component, the corresponding icons must be rendered as filled. For example, if a value of 3 is passed, the first 3 icons must be filled, and the remaining must be empty.

### Hovering States

- When the mouse hovers over the icons, all the stars leading up to the icon where the mouse hovers should be filled. This indicates the prospective value of the component.
- If half ratings are allowed:
  - Hovering on the left side (0-50% of the width) of the icon should show the half rating icon.
  - Hovering on the right side of the icon (51-100% of the width) must show the filled icon.
- If the mouse is moved away from the icon, all the icons must revert back to their earlier state (filled if it was filled, and empty if it was empty).

### Persist State on Click

- When a star is clicked, the rating should be set to the corresponding value and should persist even if the mouse moves away.

### Accessibility

- The component must allow updating the value using only the keyboard.
  - Clicking on the right arrow key must increment the value by steps (0.5 if half rating and 1 if full rating).
  - Clicking on the left arrow key must decrement the value by steps (0.5 if half rating and 1 if full rating).
  - Clicking on a numeric key between 1 to 5 must update the value equal to the corresponding pressed key.

### Customization

- The component can accept any icon set to render using the `emptyIcon`, `halfFilledIcon`, and `filledIcon` props.
- If no custom icons are provided, the default icons (`empty.svg`, `half.svg`, `filled.svg`) must be used.

### Optimistic Toggle

- The component must allow updating the value programmatically when the prop `value` is modified by the parent.
  - If the value of the `ratingValue` changes in the parent programmatically, the component must update its state accordingly.


