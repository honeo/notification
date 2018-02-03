// Modules
import {is, not, any} from '@honeo/check';


/*
	どの設定もNotification APIからは取得・変更できない。
	同時表示数
		Chromeは3つまで
	タイムアウト
		Firefoxは10秒ちょい。
		Chromeは20秒くらい。
*/
const limit = 3; //同時表示数
let count = 0; //現在の表示数
const ms_interval = 500; //通知の表示間隔、カレントウィンドウ以外だとsetTimeoutの実行が遅延されるからアテにはならない
const ms_timeout = 6000; //通知の表示時間

/*
	本体
	Promiseインスタンスを返す
		closeしたタイミングでresolve
		失敗あるいはonerrorでreject
	引数
		1：オブジェクトか文字列のみ
		2：オブジェクトのみ
	Event
		onclick, onerrorはそのままlistener登録
		廃止予定のclose,showは同タイミングでcallbackを手動実行
*/
function NotificationWrapper(title, option={}){

	// 引数チェック、文字列＆オブジェクト以外はNG
	if( not.str(title) || not.obj(option) ){
		return Promise.reject(new TypeError('Invalid arguments'));
	}

	// こっちで制御するからタグをカット
	delete option.tag;

	// Promise
	return new Promise( (resolve, reject)=>{
		is.func(window.Notification) ?
			resolve():
			reject(new Error('Notification API not found'));
	}).then( ()=>{
		return Notification.permission==='granted' || new Promise( (resolve, reject)=>{
			Notification.requestPermission( (result)=>{
				result==='granted' ?
					resolve():
					reject(new Error(`permission: ${result}`));
			});
		});
	}).then( ()=>{
		return new Promise( (resolve, reject)=>{
			sync(function(){
				count++;
				const notification = new Notification(title, option);
				is.func(otion.onshow) && option.onshow.call(notification);
				is.func(option.onclick) && notification.addEventListener('click', option.onclick, false);
				setTimeout(function(){
					count--;
					notification.close();
					sync();
					is.func(option.onclose) && option.onclose.call(notification);
					resolve();
				}, ms_timeout);
				notification.addEventListener('error', function(e){
					is.func(option.onerror) && option.onerror.call(this, e);
					reject(e);
				}, false);
			});
		});
	});
}


/*
	一定間隔で通知を出すぞい
*/
let sync = do{
	const stack = [];
	let status = true;

	async function syncLoop(){
		status = false;
		while(stack.length && count<limit){
			await new Promise( (resolve, reject)=>{
				stack.shift()();
				setTimeout(resolve, ms_interval);
			});
		}
		status = true;
	}

	(function _sync(callback){
		callback && stack.push(callback);
		status && syncLoop();
	});
}



export default NotificationWrapper;
