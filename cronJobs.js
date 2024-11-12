const cron = require('node-cron');
const fetch = require('node-fetch');
const csv = require('csv-parser');
const { Readable } = require('stream');

const CSV_URL = 'https://drive.google.com/uc?export=download&id=1epzdledjCRzWNqhxo14p-On5-pTgTc9b';

async function fetchDomainsFromCSV() {
	const domains = [];
	
	try {
		const response = await fetch(CSV_URL);
		const text = await response.text();
		
		const stream = Readable.from(text);
		
		return new Promise((resolve, reject) => {
			stream
				.pipe(csv({ headers: ['domain'] }))
				.on('data', (row) => {
					if (row.domain) {
						domains.push(row.domain.trim());
					}
				})
				.on('end', () => {
					resolve(domains);
				})
				.on('error', (error) => {
					reject(error);
				});
		});
	} catch (error) {
		console.error('Error fetching CSV from Google Drive:', error);
		return [];
	}
}

// if (process.env.NODE_ENV === 'production') {
	cron.schedule("0 0.5 * * *", async () => {
		console.log('Running scheduled DNS validation');
		
		try {
			const domains = await fetchDomainsFromCSV();
			
			if (domains.length === 0) {
				console.log("No domains found in CSV file.");
				return;
			}
			
			console.log(`DOMAIN => ${process.env.API_HOST}`);
			const response = await fetch(`${process.env.API_HOST}/api/validate-records`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ domains }),
			});
			
			if (!response.ok) {
				console.error('Error validating DNS records');
			} else {
				console.log('DNS validation completed successfully');
			}
		} catch (error) {
			console.error('Error during DNS validation:', error);
		}
	});
// }