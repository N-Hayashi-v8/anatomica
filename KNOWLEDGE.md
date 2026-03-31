# KNOWLEDGE.md

模写作業中に詰まった内容・解決策のメモ。

---

## スクロールバーのスタイリング

### 問題

`scrollbar-width` / `scrollbar-color`（標準仕様）と `::-webkit-scrollbar-*`（webkit仕様）を**併用すると標準仕様が優先**され、webkit の細さ指定や button の非表示が効かなくなる。

### 解決

どちらか一方に統一する。Chrome 121以降でも webkit 擬似要素**のみ**を使えば正しく適用される。

```scss
// NG: 混在させない
scrollbar-width: thin;
scrollbar-color: #1e1b19 transparent;
&::-webkit-scrollbar { height: 2px; } // ← 無視される

// OK: webkit のみに統一
&::-webkit-scrollbar {
    height: 2px;
}
&::-webkit-scrollbar-track {
    background: transparent;
}
&::-webkit-scrollbar-thumb {
    background-color: #1e1b19;
}
&::-webkit-scrollbar-button {
    width: 0;
    height: 0;
}
```

### 補足

- `display: none` は `::-webkit-scrollbar-button` に効かない場合がある → `width: 0; height: 0` を使う
- Firefox は webkit 擬似要素を無視するため、Firefox 対応が必要な場合は `scrollbar-width` / `scrollbar-color` を**別途追加**する

---

## CSS Grid 横スクロール（1行固定）

### 問題

`grid-template-rows: repeat(2, auto)` を指定すると2行固定になり横スクロールにならない。

### 解決

`grid-template-rows` を書かず、`grid-auto-flow: column` だけにすると暗黙の1行になる。

```scss
display: grid;
grid-auto-flow: column;
grid-auto-columns: calc((100% - gap * (列数-1)) / 列数);
overflow-x: auto;
```
