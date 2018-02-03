# notification-wrapper
* [honeo/notification-wrapper](https://github.com/honeo/notification-wrapper)  
* [notification-wrapper](https://www.npmjs.com/package/notification-wrapper)

## なにこれ
かんたんNotification API。  
通知したい内容を渡すと許可を取ってタイミングを合わせて通知を出す。  
Promiseインスタンスを返す。

## 使い方
```sh
$ npm i notification-wrapper
```
```js
import Notification from 'notification-wrapper';

// example
Notification('title', {
	body: 'message',
});


// example 2
Notification('title', {
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
