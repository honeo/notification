import 'babel-polyfill';
import NotificationWrapper from '../';

[
	["bird", "🐤"],
	["dog", "🐩"],
	["maumau", "🐹"],
	["rabbit", "🐰"],
	["cat", "🐱"],
	["maimai", "🐌"]
].forEach( ([title, body]) => NotificationWrapper(title, {body}) );
