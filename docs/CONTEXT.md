# CONTEXT.md

Claude との作業引き継ぎ用メモ。新しい環境でセッションを始めるときにこのファイルを読み込ませること。

---

## プロジェクト概要

anatomica の模写コーディング。学習目的。

## 現状（2026-04-14 時点）

トップページ・about.html・masterpiece.html・stockist.html の実装が完了。

### 完了済みコンポーネント

- p-header / p-nav / JP-EN トグル
- p-about / p-collection / p-masterpiece
- p-blog-instagram / p-stockist / p-contact / p-online-store
- p-footer（二重線・内部レイアウト）
- スクロール連動ワイプアニメーション（wipe-reveal / fade-reveal）全域適用
- ホバー白マスク（CONTACT / ONLINE STORE）
- JS・SCSS のリファクタリング・不整合整理

### about.html

- p-about-lead / p-brand-history / p-key-person — 完成

### stockist.html

- HTML: FLAGSHIP STORE（3列グリッド×8カード）/ AVAILABLE LOCATION（4列カラム）完成
- SCSS: `_flagship.scss`（`p-flagship` ブロック）完成
  - `p-flagship__grid`（3列グリッド）
  - `p-flagship__card`（`position: relative` / `border-bottom` / `::before` で縦線）
  - `p-flagship__image-wrap`（wipe-reveal / fade-reveal アニメーション付き / `height: 300px` + `object-fit: cover`）
  - `p-flagship__links`（`justify-content: space-between` で map 左・sns 右）
- `_location.scss` は未作成（次回）
- JS: `infoObserver` のセレクタに `.p-flagship__image-wrap` を追加済み

### masterpiece.html

- HTML: 2カラム構成（左4・右3アイテム）完成
- SCSS: `_masterpiece-page.scss`（`p-mp` ブロック）完成
  - `p-mp__grid`（flex）/ `p-mp__col`（border-right で列分割）
  - `p-mp__slider`（wipe-reveal / fade-reveal アニメーション付き）
  - `p-mp__btn`（黒丸・CSS矢印・ホバーで赤）
  - `p-mp__store-btn`（黒背景ボタン・ホバーで赤）
- JS: スライダー（index 管理・端でループ・1枚時ボタン非表示）/ infoObserver に `.p-mp__slider` 追加

---

## 運用ルール

### SCSS 構成

- FLOCSS/BEM 準拠
- keyframes は `scss/foundation/_animations.scss` に集約（`wipe-reveal` / `fade-reveal`）
- `scss/style.scss` で `@use "foundation/animations"` をインポート済み

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

- `collectionObserver`: `.p-collection__group` を観測 → 子アイテムをstagger順次表示
- `infoObserver`: 各 `__image-wrap` / `.p-mp__slider` を個別観測 → `.p-contact` は `closest()` で親を取得
- どちらも `$(window).on('load', ...)` の中で observe を開始

---

## ユーザー情報

- 完成コードの丸投げより、方針を理解した上で自分で修正するスタイルを好む
- 方針・修正箇所・理由を先に示し、必要な場合のみ差分コードを出す
- mixin 等の抽象化は、削減量と複雑度のトレードオフを先に提示する
