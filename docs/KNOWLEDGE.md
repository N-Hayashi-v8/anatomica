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

---

## CSS Grid で要素を重ねる（overlay レイアウト）

### 問題

`position: absolute` + `bottom: XX%` で画像上にテキストをオーバーレイすると、画像サイズやブラウザ幅が変わったときに位置がズレる。

### 解決

`display: grid` で全子要素を同セルに重ね、`align-self` / `justify-self` で位置を制御する。

```scss
.parent {
    display: grid;

    &__image,
    &__body {
        grid-area: 1 / 1; // 同セルに重ねる
    }

    &__image {
        display: block;
        width: 100%;
        height: auto;
    }

    &__body {
        align-self: center;   // 縦中央
        justify-self: center; // 横中央
    }
}
```

### 注意点

- 画像サイズに追随するためコンテナに固定高さ不要
- テキスト群をまとめて中央配置したい場合は `__body` 等のラッパー要素で囲む（個別要素を別々に `grid-area: 1/1` にすると相互の位置調整が難しくなる）
- `z-index` は通常不要（後続要素が自然に上に積まれる）

---

## 擬似要素の競合回避（::before と ::after の使い分け）

### 問題

ワイプアニメーション（黒マスクのスライド）とホバー白マスクを同じ要素に乗せようとすると、両方が `::after` を要求して競合する。

### 解決

役割を `::before` と `::after` に分離する。

```scss
&__image-wrap {
    position: relative;
    overflow: hidden;

    // ワイプ用（z-index: 1）
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: #000;
        transform: translateX(-100%);
        z-index: 1;
    }

    // ホバーマスク用（z-index: 2 で上に重ねる）
    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba(255,255,255,0);
        transition: background-color 0.3s ease;
        z-index: 2;
    }

    &:hover::after {
        background-color: rgba(255,255,255,0.3);
    }
}
```

### 補足

- 1つの要素に持てる擬似要素は `::before` と `::after` の2つまで
- 3つ以上の重ね効果が必要な場合はラッパー要素を追加する

---

## animation-fill-mode: both（delay 中の初期状態維持）

### 問題

`animation-delay` を指定すると、delay 中は animation が始まる前の状態（`opacity: 1` など）に戻ってしまう。

### 解決

`animation-fill-mode: both` を指定する。`forwards`（終了後の状態を維持）と `backwards`（delay 中も `from` の状態を適用）を合わせた指定。

```scss
// delay 中も opacity: 0 を維持したい場合
animation: fade-reveal 0.8s ease 0.2s both;
//                                    ^^^^ forwards + backwards
```

### 補足

- `forwards` だけだと delay 中に一瞬表示されてしまう
- delay ありのアニメーションには基本的に `both` を使う

---

## IntersectionObserver で親要素に is-revealed を付与するパターン

### 問題

画像（`__image-wrap`）を観測対象にしつつ、別要素（テキスト等）も同タイミングでアニメーションさせたい。観測対象ごとに `is-revealed` を個別付与すると、テキスト側へのセレクタが兄弟またぎになりスパゲティ化する。

### 解決

`closest()` で共通の親要素を取得し、親に `is-revealed` を付与。CSS は親の状態変化として子要素をまとめて制御する。

```js
var infoObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        var $target = $(entry.target);
        var $parent = $target.closest('.p-contact');
        // .p-contact 内なら親に、それ以外は自身に付与
        ($parent.length ? $parent : $target).addClass('is-revealed');
        infoObserver.unobserve(entry.target);
    });
},{ threshold: 0.1});
```

```scss
// CSS 側は親の .is-revealed 配下にまとめる
.p-contact.is-revealed {
    .p-contact__image-wrap::after { animation: wipe-reveal 0.8s ease forwards; }
    .p-contact__image            { animation: fade-reveal 0.8s ease forwards; }
    .p-contact__body             { animation: fade-reveal 0.8s ease 0.2s both; }
}
```

### 補足

- 観測対象（`__image-wrap`）と `is-revealed` を付与する要素（`.p-contact`）を分けることで、CSS の構造がフラットに保てる
- 同じ Observer で複数コンポーネントを扱う場合、`closest()` の引数を変えて条件分岐する
