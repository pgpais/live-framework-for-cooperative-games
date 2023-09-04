// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

/// <reference types="lucia" />
declare global {
	declare namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			username: string;
			full_name: string | null;
			email: string | null;
		};
		type DatabaseSessionAttributes = object;
	}
	declare namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

// THIS IS IMPORTANT!!!
export {};
