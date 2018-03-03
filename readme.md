# notification-wrapper
* [honeo/notification-wrapper](https://github.com/honeo/notification-wrapper)  
* [notification-wrapper](https://www.npmjs.com/package/notification-wrapper)


## なにこれ
かんたんWeb Notification APIラッパー。  


## 使い方
```bash
$ npm i notification-wrapper
```
```js
import Notification from 'notification-wrapper';

// example
const promise = Notification('foobar');

// options
const promise = Notification('hoge', {
	body: 'fugapiyo',
	icon: 'icon.png',
	onclick(){
		console.log('click');
	},
	onclose(){},
	onerror(){},
	onshow(){}
}).then( ({title, body})=>{
	console.log(`notice ${title}:${body} is end`); // "notice hoge:fugapiyo is end"
}).catch( (error)=>{
	console.error(error);
});
```

## options
| key     | type     | default | description                                |
|:------- |:-------- |:-------:| ------------------------------------------ |
| body    | string   |   ""    | 通知の内容。                               |
| icon    | string   |         | アイコン画像のURL                          |
| onclick | function |         | 通知のクリック時に実行される。             |
| onclose | function |         | 通知が閉じたときに実行される。             |
| onerror | function |         | エラー発生時に実行される。                 |
| onshow  | function |         | 通知の表示時に実行される。                 |



## 備考
* 初回呼び出し時にWeb Notification APIの許可を求める。
* タイミングを合わせて通知を出す。
