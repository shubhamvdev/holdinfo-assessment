const BASE_URL = 'http://localhost:3000/api';

async function fetchRecords() {
	try {
		const response = await (await fetch(`${BASE_URL}/record/get-top-records`)).json();
		return response;
	} catch (error) {
		console.log('Error [While Fetching Records]', error);
	}
}

async function renderRecords() {
	try {
		const tableBody = document.getElementById('record-table-body');

		const {
			data: { records },
		} = await fetchRecords();

		let preparedTableBody = '';

		records.forEach((record, index) => {
			let row = '<tr>';
			row += `<td>${index + 1}</td>`;
			row += `<td>${record.name}</td>`;
			row += `<td>${record.last}</td>`;
			row += `<td>${record.buy} / ${record.sell}</td>`;
			row += `<td>${record.volume}</td>`;
			row += `<td>${record.base_unit}</td>`;
			row += '</tr>';

			preparedTableBody += row;
		});

		tableBody.innerHTML = preparedTableBody;
	} catch (error) {
		console.log('Error [While Rendering Records]', error);
	}
}

(async () => await renderRecords())();
