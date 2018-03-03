/*
	ブラウザ、WebExtensions共通。
*/

// Modules
import sleep from '@honeo/sleep';
import check from '@honeo/check';

const {is, not, any} = check;

// var
const limit = 3; //同時表示数
let count = 0; //現在の表示数
const ms_interval = 100; // 通知の表示間隔、カレントウィンドウ以外だとsetTimeoutの実行が遅延されるからアテにはならない
const ms_timeout = 6000; // 通知の表示時間
const hasWebNotificationAPI = is.func(window.Notification);
let hasWebNotificationPermission;

/*
	本モジュール返り値
		引数
			1： string
			2： object
		返り値
			promise
				resolve: closeしたタイミング
				reject: 失敗あるいはonerror
		備考
			Event
				onclick, onerrorはそのままlistener登録
				廃止予定のclose, showは同タイミングでcallbackを手動実行
*/
function NotificationWrapper(title='', options={}){

	// 引数チェック、文字列＆オブジェクト以外はNG
	if( not.str(title) || not.obj(options) ){
		new TypeError('Invalid arguments');
	}

	/// optionsチェック
	// bodyが文字列でなければ空メッセージ化
	if( not.str(options.body) ){
		options.body = '';
	}
	// こっちで制御するからタグをカット
	delete options.tag;

	// Promise
	return WebNotificationWrapper(title, options);
}



/*
	本体
*/
async function WebNotificationWrapper(title, options){

	if( !hasWebNotificationAPI ){
		throw new Error('Web Notification API not found');
	}

	// なければ許可を取る
	if( !hasWebNotificationPermission ){
		await getWebNotificationPermission();
		hasWebNotificationPermission = true;
	}

   	return new Promise( (resolve, reject)=>{
   		sync(function(){
   			count++;
   			const notification = new Notification(title, options);
   			is.func(options.onshow) && options.onshow.call(notification);
   			is.func(options.onclick) && notification.addEventListener('click', options.onclick, false);

   			setTimeout(function(){
   				count--;
   				notification.close();
   				sync();
   				is.func(options.onclose) && options.onclose.call(notification);
   				resolve(notification);
   			}, ms_timeout);

			// 閉じる際にremoveしたい
   			notification.addEventListener('error', function(e){
   				is.func(options.onerror) && options.onerror.call(this, e);
   				reject(e);
   			}, false);

   		});
   	});
}


/*
	Web Notification APIの許可を取る
		引数
			なし
		返り値
			promise
*/
async function getWebNotificationPermission(){
	return Notification.permission==='granted' || new Promise( (resolve, reject)=>{
	   	Notification.requestPermission( (result)=>{
	   		result==='granted' ?
	   			resolve():
	   			reject(
					new Error(`Web Notification API permission: ${result}`)
				);
	 	});
   	});
}


/*
	一定間隔で通知を出すぞい
*/
const sync = do{
	const stack = [];
	let status = true;

	async function syncLoop(){
		status = false;
		while(stack.length && count<limit){
			const callback = stack.shift();
			callback();
			await sleep(ms_interval);
		}
		status = true;
	}

	// 返り値
	(function _sync(callback){
		callback && stack.push(callback);
		status && syncLoop();
	});
}



export default NotificationWrapper;
