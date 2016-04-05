/*
	かんたんなNotification APIラッパー
		通知内容を投げるとPromiseインスタンスが返る
		勝手に許可を取る
		勝手に通知を一定間隔で表示する
		出しっぱなしオプションは非対応
		webkit,mozNotificationは中身が別モンだからしらんがな
*/

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
const interval = 500; //通知の表示間隔、カレントウィンドウ以外だとsetTimeoutの実行が遅延されるからアテにはならない
const timeout = 6000; //通知の表示時間

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
	if(typeof title!=='string' || !(option instanceof Object)){
		return Promise.reject(new TypeError('invalid argument'));
	}
	// こっちで制御するからタグをカット
	delete option.tag;
	// Promise
	return new Promise( (resolve, reject)=>{
		typeof window.Notification==='function' ?
			resolve():
			reject(Error('window.Notification not found'));
	}).then( ()=>{
		return Notification.permission==='granted' || new Promise( (resolve, reject)=>{
			Notification.requestPermission( (result)=>{
				result==='granted' ?
					resolve():
					reject(Error(`permission: ${result}`));
			});
		});
	}).then( ()=>{
		return new Promise( (resolve, reject)=>{
			sync(function(){
				count++;
				const notification = new Notification(title, option);
				typeof option.onshow==='function' && option.onshow.call(notification);
				typeof option.onclick==='function' && notification.addEventListener('click', option.onclick, false);
				setTimeout(function(){
					count--;
					notification.close();
					sync();
					typeof option.onclose==='function' && option.onclose.call(notification);
					resolve();
				}, timeout);
				notification.addEventListener('error', function(e){
					typeof option.onerror==='function' && option.onerror.call(this, e);
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
				setTimeout(resolve, interval);
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
