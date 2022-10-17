const { helpers } = require('../utils');
const { Record } = require('../models');

const getTopResult = async (req, res, next) => {
	try {
		const options = {
			method: 'GET',
			url: 'https://api.wazirx.com/api/v2/tickers',
		};
		const { data: response } = await helpers.makeRequest(options);
		const { data: topResult } = helpers.convertToArray(response);
		const topTenResult = topResult.sort((a, b) => a.at - b.at).slice(0, 10);
		const data = { records: topTenResult };

		//Saving Records to DB
		const [savedRecords] = await Record.insertMany(data);

		// topTenResult.push()
		return res.status(200).send({
			hasError: false,
			data: savedRecords,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			hasError: true,
			message: 'Internal Server Error',
		});
	}
};

module.exports = {
	getTopResult,
};
