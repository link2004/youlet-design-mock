# YouLet Design Mock

YouLet アプリのデザインモックアップ。iPhone モックアップ内にアプリ画面を表示する。

## 技術スタック

- React 19
- TypeScript
- Vite
- lucide-react (アイコン)

## ディレクトリ構成

```
/
├── components/       # React コンポーネント
│   ├── IPhoneMockup.tsx  # iPhone フレーム
│   ├── PhoneScreen.tsx   # 画面コンテンツ
│   ├── BottomNav.tsx     # 下部ナビゲーション
│   ├── MenuItem.tsx      # メニュー項目
│   └── StatCard.tsx      # 統計カード
├── constants.ts      # 定数・データ定義
├── App.tsx          # ルートコンポーネント
└── index.tsx        # エントリーポイント
```

## コマンド

```bash
npm run dev      # 開発サーバー起動（ポート3000）
npm run build    # ビルド
npm run preview  # ビルド結果プレビュー
```

**開発サーバーのポート**: 必ず3000番で起動する。既にポート3000でサーバーが起動している場合は、そのまま使用し別ポートで新たに起動する必要はない。

## デザイン

- アクセントカラー: オレンジ (`text-orange-400`, `bg-orange-400`)

## 実装済み機能

### 基本画面
- Feed画面: 友達カードの一覧表示
- Ranking画面: ランキング表示
- DM画面: チャット一覧・個別会話
- Diagnostic画面: 診断機能

### 削除済み機能（2025-01）
以下の機能はクリーンアップにより削除:
- カード裏面（フリップUI）
- AI会話履歴画面
- AI会話の承認フロー（blur/承認ウィジェット）

## Claude Code 設定

- agent-browser: headless モードで使用する
- 作業完了後は毎回必ずコミットする（細かい修正でも必ず）
- **UI調整ルール**: UIに関する細かい調整を行う際は、必ずagent-browserでユーザーの要望通りにできているか検証し、達成するまで改善を繰り返す
