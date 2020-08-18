// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscustomtheme" is now active!');

	let time = getCurrentTime();

	context.subscriptions.push(time);
}

export function deactivate() { }


function getCurrentTime(){
	return vscode.commands.registerCommand("vscustomtheme.time", () => {
		const currentTime = new Date();
		vscode.window.showInformationMessage(`Time is ${currentTime.toLocaleTimeString()}` );
	});
}