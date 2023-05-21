# Todo

- eslint, prettier の設定
- scss の変数など作成
- README

# エイリアスについて

エイリアスを以下のように当てている

```js
{
  "@": path.resolve(__dirname, "src/"),
  "@image": path.resolve(__dirname, "src/assets/images/"),
  "@style": path.resolve(__dirname, "src/scss/"),
},
```

### 例

scss ファイルで当てたい場合は、

```scss
@use "@style/global" .test {
  background-image: url("@image/test_image.png");
}
```

pug ファイルで当てたい場合は、

```pug
h1.test ハローワールド
img(src=(require('@image/test_image.png)))
```

ts ファイルで当てたい場合は、

```ts
import "@/scss/style.scss";
```

# SCSS の構成

Dart Sass を使用
[BEM](https://github.com/manabuyasuda/styleguide/blob/master/how-to-bem.md)と[FLOCSS](https://github.com/hiloki/flocss)を採用

## SCSS 内で画像のパスを指定する場合

```scss
.test {
  background-image: url("@image/test_image.png");
}
```

## SCSS で global 変数を使用する場合

global で定義している変数や mixin を使いたい時は、以下のように`@use`を使って呼び出す。`@import`は使わないようにする

```scss
@use "@style/global" as g;

.test {
  color: g.$primaryColor;
  margin-top: map-get(g.$spaces, 10);
  @include: g.font-normal;
}
```
