import 'babel-polyfill';
import NotificationWrapper from '../';

[
	["1. bird", "🐤"],
	["2. dog", "🐩"],
	["3. maumau", "🐹"],
	["4. rabbit", "🐰"],
	["5. cat", "🐱"],
	["6. maimai", "🐌"],
	[],
	["8. blank"],
	["9. icon", "text", "megaphone32.png"]
].forEach( ([title, body, icon])=>{
	NotificationWrapper(title, {
		body,
		icon,
		onclick(arg){
			console.log('onclick', arg);
		}
	}).then( ({title, body})=>{
		console.log(`notice ${title}:${body} is end`); // "notice hoge:fugapiyo is end"
	});
});
