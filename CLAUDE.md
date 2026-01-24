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

### AI会話履歴の相互承認フロー
友達カードの裏面からAI会話履歴を閲覧・共有し、相互承認によってblurが解除される機能。

**画面フロー:**
1. FriendDetailScreen（カード裏面）→「View AI Conversation」ボタン
2. AIConversationHistoryScreen（自分AIは通常表示、相手AIはblur）
3. 「Share & Request Approval」→ DM画面へ遷移
4. DMにウィジェット表示 → 相手が承認 → blur解除アニメーション

**関連コンポーネント:**
- `AIConversationHistoryScreen.tsx` - AI会話履歴画面
- `AIConversationEditModal.tsx` - メッセージ編集モーダル
- `DMConversationApprovalWidget.tsx` - DM内承認ウィジェット

**デモ用機能:** pending_sent状態のウィジェットをタップすると相手の承認をシミュレート可能

### AI会話システムの設計意図

**目的**: 自分のトピック（My Topics）と相手のイベントをAI同士が交換する

**会話の流れ**:
1. 自分のAIが自分のトピックを紹介
2. 相手のAIが相手のイベントを紹介
3. お互いにリアクション（共感・質問・盛り上がり）
4. バランスよく自然に混ぜる

**表示ルール**:
- AI会話画面では**自分のトピックのみ表示**（相手のイベントは非表示）
- 相手のイベントはカード裏面でのみ確認
- 相手のAI発言はblur（承認後に解除）

## Claude Code 設定

- agent-browser: headless モードで使用する
- 作業完了後は毎回必ずコミットする（細かい修正でも必ず）
