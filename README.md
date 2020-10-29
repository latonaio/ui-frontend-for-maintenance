# リアルタイムロボット監視システムUIフロントエンド
## 概要
* ロボットコントローラと連携したロボットのリアルタイム監視
    * ロボットコントローラから連携される座標情報のグラフ表示、異常履歴の表示

## 動作環境
### 1.前提条件
動作には以下の環境であることを前提とします。
* Ubuntu OS
* ARM CPU搭載のデバイス

### 2.事前準備
実行環境に以下のソフトウェアがインストールされている事を前提とします。
* kubernetesのインストール
* envoyのインストール
* project-yamlsのインストール
* aion-core-manifestsのインストール

## 機器構成
* ワークステーション1台(このUIリソースを配置する)
* ロボットコントローラ1台

## kubernetes上での使用方法
### 起動方法
1. 以下のコマンドでDockerイメージをビルドする  
`$ bash docker-build.sh`
2. 以下コマンドでkubernetes上にリソースを展開する  
`$ kubectl apply -f k8s/`

### 停止方法
1. 以下のコマンドでkubernetes上からリソースを削除する  
`$ kubectl delete -f k8s/`

## 参考
latonaio/ui-backend-for-maintenance  
https://github.com/latonaio/ui-backend-for-maintenance