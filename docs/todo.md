# todo

## 完了済み（ログ）

- p-header / p-nav / JP-EN トグル
- p-about / p-collection / p-masterpiece
- p-blog-instagram / p-stockist / p-contact / p-online-store
- p-masterpiece 行高調整：断念・現状維持（画像アスペクト比の都合）
- p-footer スタイル実装（二重線・内部レイアウト）
- l-section の border-bottom を 40px インセットに（::after で対応）
- CONTACT / ONLINE STORE ホバー時白マスク実装
- p-info 3画像にワイプアニメーション適用（online-store / stockist / contact）
- CONTACT テキストをアニメーションに連動
- keyframes を `_animations.scss` に切り出しリネーム（wipe-reveal / fade-reveal）
- JS・SCSS の細かい不整合を整理
- about.html — p-about-lead / p-brand-history / p-key-person 実装完了
- masterpiece.html — p-mp（スライダー・ボタン・ストアリンクボタン）実装完了
- stockist.html — p-flagship（3列グリッド・ワイプアニメーション）/ p-location（4列・column-rule）実装完了
- コードレビュー修正（2026-04-15）— 提出済み
  - @keyframes line-grow を _animations.scss に集約
  - ワイプ背景色を v.$color-text に統一
  - #fff を v.$color-white に統一
  - &:before → &::before に統一
  - gap: 0 削除
  - インデント・連続空行の整形
  - collectionObserver を load ハンドラ内に移動
  - フッターナビのリンクを正しいパスに修正
  - background: → background-color: に統一
  - #e0e0e0 / rgba(255,255,255,...) を変数化
