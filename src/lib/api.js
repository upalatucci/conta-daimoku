export function fetchDaimoku() {
	return fetch('/api/daimoku', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => res.json());
}

/**
 * @param {number} daimoku
 */
export function setDaimoku(daimoku) {
	return fetch('/api/daimoku', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ daimoku })
	}).then((res) => res.json());
}
