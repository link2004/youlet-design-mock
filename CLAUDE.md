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
├── contexts/         # React Contexts
│   ├── MobileContext.tsx      # モバイル判定
│   └── AppStateContext.tsx    # グローバル状態管理（一行、カード位置、メモ、GO済み）
├── components/       # React コンポーネント
│   ├── IPhoneMockup.tsx       # iPhone フレーム
│   ├── HomeScreen.tsx         # ホーム画面（放射状グラフ、ランキング、一行リスト）
│   ├── RadialGraph.tsx        # 放射状グラフ（友達カード配置、SVG接続線）
│   ├── RadialFriendCard.tsx   # ドラッグ可能な友達カード
│   ├── RadialCenterCard.tsx   # 中央の自分カード
│   ├── ChatScreen.tsx         # チャット画面（AIチャット、4者ルーム一覧）
│   ├── FourPersonChatDetail.tsx # 4者チャット詳細（user/friend/userAI/friendAI）
│   ├── ProfileScreen.tsx      # プロフィール画面（一行生成、BFトグル、QR、最近の出来事）
│   ├── FriendCardBack.tsx     # 友達カード裏面（フル情報、メモ、GO）
│   ├── OneLineGenerateScreen.tsx # 今日の一行生成フロー
│   ├── QRCodeOverlay.tsx      # QRコードシェア表示
│   ├── BottomNav.tsx          # 下部ナビゲーション（3タブ: Chat/Home/Profile）
│   ├── RankingScreen.tsx      # ランキング画面（ホームからの遷移先）
│   ├── DiagnosticScreen.tsx   # 診断画面（プロフィールからの遷移先）
│   ├── LogScreen.tsx          # ログ画面（プロフィールからの遷移先）
│   └── ...
├── constants.ts      # 定数・データ定義（一行、4者チャット、メモ等）
├── App.tsx          # ルートコンポーネント（AppStateProvider）
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

### 状態管理
- AppStateContext: useReducerベースのグローバル状態管理
  - OneLineState: 'ungenerated' → 'candidates' → 'confirmed'
  - cardPositions: ドラッグによるカード位置
  - friendMemos: AI自動メモ + ユーザー手動メモ
  - goedFriends: GO済み友達（画像解放済み）
- useBlurRules(): oneLineStateからぼかしルールを導出するフック

### ナビゲーション
- 3タブ構成: Chat / Home / Profile（BottomNav）
- デフォルト画面: Home
- PageType: home, chat, profile, diagnostic, diagnostic-detail, group-diagnostic-detail, ranking, friend-card-back, log, oneline-generate

### ホーム画面（放射状グラフ）
- 放射状グラフ: 中央に自分カード、周囲に友達カード（ドラッグ可能）
- SVG接続線（オレンジ半透明）
- 今日のランキング（Top3 + GOボタン）
- 友達の今日の一行リスト（全友達分、GOボタン付き）
- ぼかしルール: 未生成→全ぼかし、確定済み→タイトルのみ表示、GO済み→チャットで全解放
- 新しいつながり提案ノード（一行確定後のみ表示）

### 今日の一行生成フロー
- Profile画面から「Generate Your One Line」ボタンで開始
- AI分析ローディング（2秒フェイク）→ 候補2〜3件表示 → ユーザー選択 → 確定
- 確定後: ぼかし解除、ホーム画面にタイトル表示

### 友達カード裏面（FriendCardBack）
- キャラ画像、名前、BF状態、共通友人数
- 今日の一行セクション（ぼかし + GOボタン）
- 最近の出来事（ぼかしなし）
- 相性を見るボタン（DiagnosticTypeSheet）
- 過去のメモ（AI自動 + ユーザー手動追加可）

### チャット画面（4者ルーム）
- AIスレッド: 人間関係アドバイス、メモ保存トースト
- 友達スレッド: 4者ルーム（user/friend/userAI/friendAI）
- 4Pバッジ表示（チャットリスト）
- 相談ボトムシート（仕事、仲直り、誘い方）
- GO経由: 画像メッセージ表示 + AI リアクション

### プロフィール画面
- プロフィールカード（キャラ画像、名前、BFトグル）
- 今日の一行セクション（未生成→生成ボタン / 生成済み→表示）
- 最近の出来事（最大3件）
- Read Your Story / Share Profile (QR)
- Diagnostic / Logメニューリンク

### その他
- Ranking画面: 週間ランキング表示
- Diagnostic画面: ペア/グループ診断
- Log画面: 行動ログ（リスト/カレンダービュー）
- QRCodeOverlay: プロフィールシェア用モックQRコード

### 削除済み / 未使用コンポーネント
- FriendDetailScreen.tsx: FriendCardBackに置き換え済み（ファイル残存）
- FriendCard.tsx: グリッド廃止により未使用（ファイル残存）
- HeartScreen.tsx: レガシー（ファイル残存）
- ProfileCardFlip.tsx: ProfileScreen内にインライン化（ファイル残存）

## Claude Code 設定

- agent-browser: headless モードで使用する
- 作業完了後は毎回必ずコミットする（細かい修正でも必ず）
- **UI調整ルール**: UIに関する細かい調整を行う際は、必ずagent-browserでユーザーの要望通りにできているか検証し、達成するまで改善を繰り返す
- **agent-browser検証**: agent-browserによるUI検証は、Taskツールでサブエージェントを使ってバックグラウンドで実行する
