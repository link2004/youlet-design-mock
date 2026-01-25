# アイコンガイドライン

## 使用ライブラリ

### Hugeicons (メインアイコン)
- **パッケージ**: `@hugeicons/react`, `@hugeicons/core-free-icons`
- **スタイル**: Stroke Rounded（無料版）
- **公式サイト**: https://hugeicons.com/icons
- **特徴**: モダンで丸みのあるフラットなデザイン

### lucide-react (UIアイコン)
- 矢印、メニュー、設定などのUIアイコンに使用

### FluentUI Emoji (絵文字)
- 絵文字には [microsoft/fluentui-emoji](https://github.com/microsoft/fluentui-emoji) の3D版を使用
- 保存先: `public/images/`

---

## ナビゲーションバーのアイコン

| 項目 | アイコン名 | 用途 |
|------|-----------|------|
| Cards | `Home01Icon` | カード一覧（友達カード） |
| Diagnostic | `CompassIcon` | 診断機能 |
| Log | `Calendar03Icon` | ログ/SNS風投稿一覧 |
| DM | `BubbleChatIcon` | ダイレクトメッセージ |
| Profile | `UserIcon` | プロフィール |

### スタイル設定
- **非アクティブ**: `color="#a3a3a3"`, `strokeWidth={1.5}`
- **アクティブ**: `color="#fb923c"` (orange-400), `strokeWidth={2}`

---

## 無料版で使える主なアイコン

### ホーム系
- `Home01Icon` 〜 `Home13Icon`

### ユーザー系
- `UserIcon`, `User02Icon`, `User03Icon`
- `UserCircleIcon`, `UserAccountIcon`

### メッセージ系
- `BubbleChatIcon`
- `Message01Icon`, `Message02Icon`
- `Mail01Icon`

### カレンダー系
- `Calendar01Icon` 〜 `Calendar04Icon`

### ナビゲーション系
- `CompassIcon`, `Compass01Icon`
- `DiscoverCircleIcon`, `DiscoverSquareIcon`

### その他
- `NewsIcon`, `News01Icon`
- `GridIcon`
- `SearchingIcon`, `Search01Icon`, `Search02Icon`

---

## 使用例

```tsx
import { HugeiconsIcon } from '@hugeicons/react';
import { Home01Icon } from '@hugeicons/core-free-icons';

// 基本的な使い方
<HugeiconsIcon
  icon={Home01Icon}
  size={24}
  color="#a3a3a3"
  strokeWidth={1.5}
/>

// アクティブ状態
<HugeiconsIcon
  icon={Home01Icon}
  size={24}
  color="#fb923c"
  strokeWidth={2}
/>
```

---

## 参考リンク

- [Hugeicons Icons Browser](https://hugeicons.com/icons)
- [Hugeicons React Documentation](https://docs.hugeicons.com/integrations/react)
- [@hugeicons/react (npm)](https://www.npmjs.com/package/@hugeicons/react)
- [@hugeicons/core-free-icons (npm)](https://www.npmjs.com/package/@hugeicons/core-free-icons)
