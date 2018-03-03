# document

という名の製作メモ。


## コンセプト
* 面倒な部分を端折る
	- 引数がスカスカでも動く。
	- 勝手に許可を取る。
	- 勝手に通知を一定間隔で表示する。
* 挙動を把握しやすい
	- Promiseやイベント。
* その他
	- webkit, mozNotificationは仕様が違うから無視。


## TODO
今すぐ必要ではないものはここに書いて放置しておく。
* options.id, options.tag
	- update対応時に。
* sync部分を同等機能のスタックモジュールに置き換え。
* 出しっぱなしオプション
	- 非対応の環境では同じ通知を繰り返し出す。



## 各環境の通知API仕様
どの設定も取得・変更できない。

### 同時表示数
* Chrome: v62で3

### タイムアウト
* Firefox: v47で10秒ほど。
* Chrome: 20秒ほど。



## Dependencies
* @honeo/check
	- 型・インスタンスの確認。
* @honeo/sleep
	- sleep関数。
