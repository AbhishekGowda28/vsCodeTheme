import * as say from "say";
import * as vscode from 'vscode';

let interval: NodeJS.Timeout;
export function activate(context: vscode.ExtensionContext) {
	const timeInterval = 1000 * 60; // Every 1 Hour
	let startTime = vscode.commands.registerCommand('tellmethetime.time', (props) => {
		console.log(props);
		telltime();
		interval = setInterval(telltime, timeInterval);
	});

	const stopTime = vscode.commands.registerCommand("tellmethetime.stopTime", () => {
		clearInterval(interval);
	});

	context.subscriptions.push(startTime);
	context.subscriptions.push(stopTime);
}

export function deactivate() {
	clearInterval(interval);
}

function telltime() {
	const currentTime = getCurrentTime();
	vscode.window.showInformationMessage(`The time is ${currentTime}`);
	say.speak(currentTime);
}

function getCurrentTime() {
	const date = new Date();
	const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
	return `${hour}:${date.getMinutes()}`;
}
