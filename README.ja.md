# Eorzea Connect

Eorzea Connect は、Final Fantasy XIV（FF14）専用のフレンドマッチングアプリです。プレイヤー同士が簡単に繋がり、ゲームを一緒に楽しむ仲間を見つけることができます。React Native（Expo）を使用して開発されており、モバイル環境で快適に利用できます。

## 特徴

- **プロフィール作成**: ユーザーは自身の FF14 キャラクター情報を基にプロフィールを作成し、他のプレイヤーとマッチングできます。
- **投稿機能**: ユーザーはパーティ募集やフレンド募集の投稿を作成・共有できます。
- **チャット機能**: 気になるユーザーとチャットで直接コミュニケーションが取れます。
- **ブックマーク**: 気に入った投稿をブックマークして、後から簡単にアクセスできます。

## Demo Video

[![demo](https://img.youtube.com/vi/qZKuYuMYMGc/0.jpg)](https://youtu.be/qZKuYuMYMGc)

## デザイン

**Figma**:https://www.figma.com/design/37oMyyHcH73uueoNToF5HT/Eorzea-Connect?node-id=0-1&t=GZud2vJ1mpYdmkJt-0

## インストールと設定

以下の方法があります。QR コードと URL のどちらかを使う場合は、Expo GO(アプリ)が必須です。

1. **QR コード**:

   ![image](https://github.com/user-attachments/assets/d6e363ea-6ec4-41e6-b1c8-ada364900d54)


2. **URL**:
   ```
   https://expo.dev/preview/update?message=Merge%20branch%20'main'%20of%20https%3A%2F%2Fgithub.com%2FKento-Kuki%2Feorzea-connect&updateRuntimeVersion=1.0.0&createdAt=2024-08-23T01%3A01%3A56.102Z&slug=exp&projectId=3d383f41-71b9-4af8-b6ec-f87cc0adaadb&group=10e7ad80-91ea-4ada-875b-7baf08f1055f
   ```
3. **クローン**:

   ```bash
   git clone https://github.com/Kento-Kuki/eorzea-connect.git

   ```

   必要なパッケージをインストールします：

   ```bash
   cd eorzea-connect
   npm install

   ```

   Expo 開発環境を立ち上げます:

   ```bash
   npm start

   ```

   エミュレーターまたは実機でアプリを確認します。

※各ストアに配信予定

## 仕様技術

- **React Native (Expo)**: モバイルアプリ開発のためのフレームワーク。
- **TypeScript**: JavaScript に型の安全性をもたらす言語。
- **Zustand**: シンプルな状態管理アプリ。
- **Appwrite**: 認証、データベース、ファイルストレージのためのバックエンドサービス。

## ポートフォリオ

[kento-portfolio.vercel.app
](https://kento-portfolio.vercel.app/)
