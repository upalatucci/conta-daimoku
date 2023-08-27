export const getEditURL = (/** @type {string | null} */ id, /** @type {string} */ editCode) => {
	// @ts-ignore
	if (typeof window === 'undefined') return;

	if (!id) {
		return null;
	}

	return `${window.location.origin}/${id}/edit?editCode=${editCode}`;
};
