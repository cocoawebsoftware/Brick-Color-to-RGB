This Readme is in Japanese. English version is [![Button](https://img.shields.io/badge/here-black?style=flat)]([https://cocoawebsoftware.github.io/Brick-Color-to-RGB/](https://github.com/cocoawebsoftware/Brick-Color-to-RGB/blob/main/English%20README.md))

---
# 🎨 Brick Color Converter

Roblox BrickColor を  
RGB / RGB (0–1) / HEX / HSV(HSB) に変換する Web ツール。

早速使ってみてはいかがでしょうか?

[![Button](https://img.shields.io/badge/これを押してね-Black?style=flat)](https://cocoawebsoftware.github.io/Brick-Color-to-RGB/)

このボタンを押すと変換ツールのページに飛びます。
※このツールはロブロックスをやってる人向けに開発しました。

---

## 機能

- RGB 変換
- RGB (0–1) 変換
- HEX 変換
- HSV / HSB 変換（統一表示）
- ワンクリックでコピー可能
- 色のプレビュー表示


---

## 📄 BrickColor.txt
このtxtファイルにrobloxの大体のすべての色のRGBが載っています。
このRGBからHSV(HSB),HEXに変換しています。
データを読む方式
Name ID RGB RGB(0~1)
[例:White 1  242,243,243 0.950,0.953,0.953]
スペース区切りで読む形式です。
※ 名前は複数単語可  
※ RGBは `数値, 数値, 数値`

---
## 🚀 使い方

1. [![Button](https://img.shields.io/badge/これを押して-Black?style=flat)](https://cocoawebsoftware.github.io/Brick-Color-to-RGB/)、ぺージに飛ぶ
2. BrickColor 名を入力
3. 変換形式を選択
4. Copy ボタンでコピー

例:Bright red


---

## ここで少し解説 🧠 HSVについて

HSV と HSB は同じ構造です。

360° = 0° と同じ色です。

---

## 開発メモ

- データは fetch("./BrickColor.txt") で読み込んでいます。
- 正規表現で RGB を読み込んでいます。
- HSV は内部計算で生成しています。

---
## クレジット
作成者:cocoawebsoftware

---
## 📜 License
MIT
