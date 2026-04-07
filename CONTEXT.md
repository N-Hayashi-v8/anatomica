# CONTEXT.md

Claude との作業引き継ぎ用メモ。新しい環境でセッションを始めるときにこのファイルを読み込ませること。

---

## プロジェクト概要

anatomica の模写コーディング。学習目的。

## 現状（2026-04-07 時点）

トップページの実装が完了。**子ページ about.html の作成中**。

### 完了済みコンポーネント

- p-header / p-nav / JP-EN トグル
- p-about / p-collection / p-masterpiece
- p-blog-instagram / p-stockist / p-contact / p-online-store
- p-footer（二重線・内部レイアウト）
- スクロール連動ワイプアニメーション（wipe-reveal / fade-reveal）全域適用
- ホバー白マスク（CONTACT / ONLINE STORE）
- JS・SCSS のリファクタリング・不整合整理

### about.html 進捗

- HTML 構造: 完了（p-about-lead / p-brand-history / p-key-person）
- `_about-page.scss`: p-about-lead 完了
- `_brand-history.scss`: grid 設計まで完了（`repeat(4, 1fr)` / gap 20px）、__year・__subtitle レイアウトは次回
- p-key-person: 未着手

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

- ワイプ + フェード: `__image-wrap` に `::after`（黒マスク）、img に `opacity: 0`
- `is-revealed` クラス付与で animation を起動
- online-store だけ `::before`（ワイプ）/ `::after`（ホバーマスク）を分離（擬似要素競合回避）
- CONTACT は `__image-wrap` ではなく `.p-contact` 親に `is-revealed` を付与（テキスト連動のため）

### JS 構成

- `collectionObserver`: `.p-collection__group` を観測 → 子アイテムをstagger順次表示
- `infoObserver`: 各 `__image-wrap` を個別観測 → `.p-contact` は `closest()` で親を取得
- どちらも `$(window).on('load', ...)` の中で observe を開始

---

## ユーザー情報

- 完成コードの丸投げより、方針を理解した上で自分で修正するスタイルを好む
- 方針・修正箇所・理由を先に示し、必要な場合のみ差分コードを出す
- mixin 等の抽象化は、削減量と複雑度のトレードオフを先に提示する
