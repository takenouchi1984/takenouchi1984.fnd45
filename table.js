'use strict'
// 1行目に記載している 'use strict' は削除しないでください
// 役のデータ定義（オブジェクト形式）////////////////////////////////////////////////////////////////////////////////////////

const dotFlash  = { name: "☆フラッシュ", score: 100, rate: "0.01%" , greeting: "すごい！おめでとう！" };
const flash     = { name: "フラッシュ",   score: 80,  rate: "0.06%" , greeting: "素晴らしい！奇跡的な揃い方です！" };
const fourDice  = { name: "4ダイス",     score: 50,  rate: "1.93%" , greeting: "お見事！強力な役が完成しました！" };
const straight  = { name: "ストレート",   score: 40,  rate: "3.09%" , greeting: "綺麗に並びましたね！ナイスです！" };
const fullHouse = { name: "フルハウス",   score: 30,  rate: "3.86%" , greeting: "おめでとう！バランスの良い役です！" };
const noPair    = { name: "ノーペア",     score: 20,  rate: "6.17%" , greeting: "逆にすごい！レアな役無しです！" };
const threeDice = { name: "3ダイス",     score: 15,  rate: "15.43%", greeting: "やりました！中々の手応えです。" };
const twoPair   = { name: "2ペア",       score: 5,   rate: "23.15%", greeting: "着実にポイントをゲット！" };
const onePair   = { name: "1ペア",       score: 0,   rate: "46.30%", greeting: "残念、次はもっと良い役を！" };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
