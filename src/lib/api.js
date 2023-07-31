/**
 * @param {string} id
 */
export function fetchDaimoku(id) {
	return fetch(`/api/daimoku/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => res.json());
}

/**
 * @param {string} id
 * @param {number} daimoku
 */
export function setDaimoku(id, daimoku) {
	return fetch(`/api/daimoku/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ daimoku })
	}).then((res) => res.json());
}
