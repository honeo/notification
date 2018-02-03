# document

という名の製作メモ。

## コンセプト
面倒な部分を端折れるNotification APIラッパー。
通知内容を投げるとPromiseインスタンスが返る。
勝手に許可を取る。
勝手に通知を一定間隔で表示する。
出しっぱなしオプションは非対応。
webkit, mozNotificationは中身が別モンだからしらんがな。


## Dependencies
* @honeo/check
	- 型・インスタンスの確認。
