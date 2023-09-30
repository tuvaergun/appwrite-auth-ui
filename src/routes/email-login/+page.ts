import { AppwriteDatabases, type AppwritePage } from '$lib/appwrite';
import type { PageLoad } from './$types';
import { Query } from 'appwrite';

export const load = (async ({ url }) => {
	const hostname = url.hostname;

	const responseCustomDomain = await AppwriteDatabases.listDocuments<AppwritePage>(
		'main',
		'pages',
		[Query.limit(1), Query.equal('customDomain', hostname)]
	);
	console.log('responseCustomDomain', responseCustomDomain);

	if (responseCustomDomain.documents.length > 0) {
		return {
			page: responseCustomDomain.documents[0]
		};
	}

	const domain = hostname.split('.')[0];
	const response = await AppwriteDatabases.listDocuments<AppwritePage>('main', 'pages', [
		Query.limit(1),
		Query.equal('domain', domain)
	]);

	if (response.documents.length > 0) {
		return {
			page: response.documents[0]
		};
	}

	return {
		page: null
	};
}) satisfies PageLoad;
