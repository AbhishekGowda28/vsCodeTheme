import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const command = "vscustomtheme.comment";

	const commandHandler = (name: string = "world") => {
		console.log(`${new Date()} -> Hello ${name}`);
	 };

	 const registrationDescriptor = vscode.commands.registerCommand(command, commandHandler);
	 const time = getCurrentTime();

	 context.subscriptions.push(registrationDescriptor);
	 context.subscriptions.push(time);

}

function getCurrentTime() {
	return vscode.commands.registerCommand("vscustomtheme.time", () => {
		const currentTime = new Date();
		vscode.window.showInformationMessage(`Time is ${currentTime.toLocaleTimeString()}`);
	});
}

export function deactivate() { }
