# YouLet Design Mock

YouLet アプリのデザインモックアップ。iPhone モックアップ内にアプリ画面を表示する。

## 技術スタック

- React 19
- TypeScript
- Vite
- Hugeicons (ナビゲーションアイコン) - `@hugeicons/react`, `@hugeicons/core-free-icons`
- lucide-react (UIアイコン)
- デプロイ: Cloudflare Pages

## ディレクトリ構成

```
/
├── components/       # React コンポーネント
│   ├── IPhoneMockup.tsx    # iPhone フレーム
│   ├── HomeScreen.tsx      # ホーム画面（検索、提案カード、友達グリッド、ランキングプレビュー）
│   ├── ChatScreen.tsx      # チャット画面（AIチャット、友達チャット一覧・詳細）
│   ├── ProfileScreen.tsx   # プロフィール画面（カード、ストーリー、シェア、メニュー）
│   ├── BottomNav.tsx       # 下部ナビゲーション（3タブ: Chat/Home/Profile）
│   ├── RankingScreen.tsx   # ランキング画面（ホームからの遷移先）
│   ├── DiagnosticScreen.tsx # 診断画面（プロフィールからの遷移先）
│   ├── LogScreen.tsx       # ログ画面（プロフィールからの遷移先）
│   ├── FriendDetailScreen.tsx # 友達詳細画面
│   └── ...
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

### 絵文字・アイコン

詳細は [docs/icons.md](docs/icons.md) を参照。

- **Hugeicons**: ナビゲーションバーのアイコン（Stroke Rounded スタイル）
  - 公式サイト: https://hugeicons.com/icons
- **FluentUI Emoji (3D)**: 絵文字アイコンには [microsoft/fluentui-emoji](https://github.com/microsoft/fluentui-emoji) の **3D版** を使用する
  - 保存先: `public/images/`
  - ダウンロード元: `https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/{EmojiName}/3D/{emoji_name}_3d.png`
  - 例: トロフィー → `assets/Trophy/3D/trophy_3d.png`
- **lucide-react**: UIアイコン（矢印、メニューなど）に使用

## 実装済み機能

### ナビゲーション
- 3タブ構成: Chat / Home / Profile（BottomNav）
- デフォルト画面: Home

### 基本画面
- Home画面: 検索バー、友達追加ボタン、新しいつながり提案カード、友達グリッド（3列）、ランキングプレビュー（上位3名）
- Chat画面: AIチャット（Morasu）、友達チャット一覧・詳細会話、チャット詳細に「相性を見る」「AIに相談」ボタン
- Profile画面: プロフィールカード、Read Your Story、Share Profile、Diagnostic/Logメニューリンク
- Ranking画面: 週間ランキング表示（ホームから遷移）
- Diagnostic画面: 診断機能（プロフィールから遷移）
- Log画面: 行動ログ（プロフィールから遷移）

### 削除済み機能（2025-01）
以下の機能はクリーンアップにより削除:
- カード裏面（フリップUI）
- AI会話履歴画面
- AI会話の承認フロー（blur/承認ウィジェット）

## Claude Code 設定

- agent-browser: headless モードで使用する
- 作業完了後は毎回必ずコミットする（細かい修正でも必ず）
- **UI調整ルール**: UIに関する細かい調整を行う際は、必ずagent-browserでユーザーの要望通りにできているか検証し、達成するまで改善を繰り返す
- **agent-browser検証**: agent-browserによるUI検証は、Taskツールでサブエージェントを使ってバックグラウンドで実行する
