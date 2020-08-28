import * as say from "say";
import * as vscode from 'vscode';

let interval: NodeJS.Timeout;
export function activate(context: vscode.ExtensionContext) {
	let defaultTime = 10;
	const toMinutes = 1000 * 60;
	let timeInterval = toMinutes * defaultTime; // Every 1 Hour
	let startTime = vscode.commands.registerCommand('tellmethetime.time', (props) => {
		clearInterval(interval);
		const quickPick = vscode.window.createInputBox();
		quickPick.prompt = "Enter Time interval in minutes";
		quickPick.show();
		let intervalValue = "";
		quickPick.onDidChangeValue((changeValue) => {
			intervalValue = changeValue;
		});
		quickPick.onDidAccept(() => {
			quickPick.hide();
			timeInterval = toMinutes * Number(intervalValue);
			telltime();
			interval = setInterval(telltime, timeInterval);
		});
		quickPick.onDidHide(() => quickPick.dispose());
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
	let minutes: string | number = date.getMinutes();
	if (minutes < 9) {
		minutes = `0${minutes}`;
	}
	return `${hour}:${minutes}`;
}
