# CONTEXT.md

Claude との作業引き継ぎ用メモ。新しい環境でセッションを始めるときにこのファイルを読み込ませること。

---

## プロジェクト概要

anatomica の模写コーディング。学習目的。2026-04-15 提出済み。

## 現状（2026-04-15 時点）

全ページ実装・コードレビュー修正・提出完了。

### 完了済みコンポーネント（トップページ）

- p-header / p-nav / JP-EN トグル
- p-about / p-collection / p-masterpiece
- p-blog-instagram / p-stockist / p-contact / p-online-store
- p-footer（二重線・内部レイアウト）
- スクロール連動ワイプアニメーション（wipe-reveal / fade-reveal）全域適用
- ホバー白マスク（CONTACT / ONLINE STORE）

### about.html

- p-about-lead / p-brand-history / p-key-person — 完成

### masterpiece.html

- HTML: 2カラム構成（左4・右3アイテム）完成
- SCSS: `_masterpiece-page.scss`（`p-mp` ブロック）完成
  - `p-mp__grid`（flex）/ `p-mp__col`（border-right で列分割）
  - `p-mp__slider`（wipe-reveal / fade-reveal アニメーション付き）
  - `p-mp__btn`（黒丸・CSS矢印・ホバーで赤）
  - `p-mp__store-btn`（黒背景ボタン・ホバーで赤）
- JS: スライダー（index 管理・端でループ・1枚時ボタン非表示）

### stockist.html

- p-flagship（3列グリッド×8カード・ワイプアニメーション・マップ/SNSリンク）— 完成
- p-location（4列 CSS columns・column-rule・国別グループ一覧）— 完成
- JS: infoObserver のセレクタに `.p-flagship__image-wrap` を追加済み

---

## 運用ルール

### SCSS 構成

- FLOCSS/BEM 準拠
- keyframes は `scss/foundation/_animations.scss` に集約（`wipe-reveal` / `fade-reveal` / `line-grow`）
- `scss/style.scss` で `@use "foundation/animations"` をインポート済み
- 色変数: `$color-text` / `$color-white` / `$color-bg` / `$color-link-hover` / `$color-scrollbar-track`
- 単色指定は `background-color:` を使用（`background:` ショートハンドは使わない）
- `rgba(255,255,255,...)` は `rgba(v.$color-white, ...)` で記述

### レイアウト

- `l-container`: `padding: 0 40px; margin: 0 auto;` — コンテンツの左右余白担当
- border を margin で制御する要素（p-footer 等）には l-container を付けない
- `l-section::after` で border-bottom を 40px インセットで引く（`margin: 40px 40px 0`）

### アニメーションパターン

- ワイプ + フェード: `__image-wrap`（または `__slider`）に `::after`（黒マスク）、img に `opacity: 0`
- `is-revealed` クラス付与で animation を起動
- online-store だけ `::before`（ワイプ）/ `::after`（ホバーマスク）を分離（擬似要素競合回避）
- CONTACT は `__image-wrap` ではなく `.p-contact` 親に `is-revealed` を付与（テキスト連動のため）

### JS 構成

- `collectionObserver` / `infoObserver` ともに `$(window).on('load', ...)` の中で定義・observe を開始
- `collectionObserver`: `.p-collection__group` を観測 → 子アイテムをstagger順次表示
- `infoObserver`: 各 `__image-wrap` / `.p-mp__slider` を個別観測 → `.p-contact` は `closest()` で親を取得

### HTML リンク規則

- トップページ（index.html）から pages/ 配下: `pages/about.html` 等
- pages/ 配下から同階層: `about.html` 等（`../` 不要）
- COLLECTION / ONLINE STORE / CONTACT はページ未作成のため `href="#"`

---

## ユーザー情報

- 完成コードの丸投げより、方針を理解した上で自分で修正するスタイルを好む
- 方針・修正箇所・理由を先に示し、必要な場合のみ差分コードを出す
- mixin 等の抽象化は、削減量と複雑度のトレードオフを先に提示する
