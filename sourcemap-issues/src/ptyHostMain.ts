import { localize } from './nls.js';

startPtyHost();

async function startPtyHost() {
	// Sanitize environment
	delete process.env.VSCODE_RECONNECT_GRACE_TIME;
	delete process.env.VSCODE_RECONNECT_SHORT_GRACE_TIME;
	delete process.env.VSCODE_RECONNECT_SCROLLBACK;
	delete process.env.VSCODE_LATENCY;
	delete process.env.VSCODE_STARTUP_DELAY;

	console.log('ptyhost', { name: localize('ptyHost', "Pty Host") });
}
