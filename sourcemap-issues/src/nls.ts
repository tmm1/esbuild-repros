export function localize(key: string, message: string, ...args: (string | number | boolean | undefined | null)[]): string;

export function localize(data: string /* | number when built */, message: string /* | null when built */, ...args: (string | number | boolean | undefined | null)[]): string {
	if (typeof data === 'number') {
		//return _format(lookupMessage(data, message), args);
	}
	return _format(message, args);
}

function _format(message: string, args: (string | number | boolean | undefined | null)[]): string {
	return message;
}
