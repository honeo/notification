# notification-wrapper
[honeo/notification-wrapper](https://github.com/honeo/notification-wrapper)  
[notification-wrapper](https://www.npmjs.com/package/notification-wrapper)

## なにこれ
かんたんなNotification APIのラッパー。  
通知したい内容を渡すと許可を取ってタイミングを合わせて通知を出す。  
Promiseインスタンスを返す。

## 使い方
```sh
$ npm i -S notification-wrapper
```
```js
import NotificationWrapper from 'notification-wrapper';

NotificationWrapper('title', {
	body: 'message',
});
```
あるいは
```js
NotificationWrapper('title', {
	body: 'message',
	icon: 'picture.png',
	onclick(){
		console.log('click');
	},
	onclose(){},
	onerror(){},
	onshow(){}
}).then( ()=>{
	console.log('finish');
}).catch( (error)=>{
	console.error(error);
});
```
