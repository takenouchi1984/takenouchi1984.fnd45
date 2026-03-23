'use strict'
// 1行目に記載している 'use strict' は削除しないでください
// 論理的思考をできるようになり、相手に伝わりやすい話ができるようになる。


// 役を判定する関数を設定する。////////////////////////////////////////////////////////////////////////////////////////

function judgement(results) {
  let counts = [0, 0, 0, 0, 0, 0, 0];//出た目を配列を用意する。
  for (let num of results) {//出た目をカウントし配列値を入れる。
    counts[num]++;
  }
  //判定のロジック
  
  // ストレートの確認
  // 出た目の配列から各目が１回でたものを数える。
  // counts.filter(role => role === 1).length が　5であれば　1~6の目はバラバラ。
  //が連続かはわからない。
  let uniqueCount = counts.filter(role => role === 1).length;
  // console.log(counts);
  // console.log(uniqueCount);;
  
  //連続性の確認
  // 1と6が両方出ていたら連続しない
  //ストレートの配列パターン
  //index 0 1 2 3 4 5 6
  //     [0,1,1,1,1,1,0]　ストレート
  //     [0,0,1,1,1,1,1]　ストレート
  //     [0,1,0,1,1,1,1]  連続しない
  //     count[1] > 0 かつ　 count[6] > 0 ストレート
  //     
  let has1and6 = counts[1] > 0 && counts[6] > 0;//
  // console.log(has1and6);// ストレート：flase 以外: ture
  
  if (counts[1] === 5){ //index[1] === 5　1ぞろ目
    return dotFlash;
  } else if (counts.includes(5)) { //出目を数えた配列counts内に 5　があれば
    return flash;
    
  } else if (counts.includes(4)) { //出目を数えた配列counts内に 4　があれば
    return fourDice;
    
  } else if (uniqueCount === 5 && !has1and6) {
    //uniqueCount === 5であれば　出目はバラバラ。
    //!has1and6  has1and6は　ストレート：flase 歯抜け: ture　なので　! で反転
    // console.log(uniqueCount === 5 && !has1and6); 
    return straight;
    
  } else if (counts.includes(3) && counts.includes(2)) { //出目を数えた配列counts内に 3と2　があれば
    return fullHouse;
    
  } else if (counts.includes(3)) {  //出目を数えた配列counts内に 4　があれば
    return threeDice;
    
  } else if (counts.filter(pairs => pairs === 2).length === 2) {//2個組の数が2つある
    //
    // console.log(counts.filter(pairs => pairs === 2).length, "2");
    //counts.includes(2)) && counts.includes(2)ではだめ　 
    // .includes(2)　配列の中に 2 という数字が1つでも含まれているか
    return twoPair;
    
  }else if (counts.filter(pairs => pairs === 2).length === 1) { // ワンペアの判定を追加
    return onePair;
    
  } else {//上記以外は役なし
    return noPair;
  }
}

////////////////////////////////////////////////////////////////////////

//ゲームの起動を関数化する。//////////////////////////////////////////////

let currentDice = [0, 0, 0, 0, 0]; // 現在の出目を保持

// 1回目：全部振る
function playGame() {
  currentDice = [];
  for (let i = 0; i < 5; i++) {
    currentDice.push(Math.floor(Math.random() * 6) + 1);
    document.getElementById(`keep${i}`).checked = false; // 追加：チェックを外す
  }
  updateUI();
  
  // ボタンの切り替え
  document.getElementById("main-btn").style.display = "none";
  document.getElementById("reroll-btn").style.display = "inline-block";
  // document.getElementById("keep-selectors").style.display = "block";
}

//////////////////////////////////////////////////////////////////////

// 2回目：チェックされていないのだけ振る//////////////////////////////////
function reroll() {
  for (let i = 0; i < 5; i++) {
    const isKeep = document.getElementById(`keep${i}`).checked;
    if (!isKeep) { //チェックが入っていいないサイコロを振りなおす。
      currentDice[i] = Math.floor(Math.random() * 6) + 1; //振りなおした値を再代入する。
    }
  }
  updateUI();

  // 振り直し終了後の後処理 ぼた
  document.getElementById("reroll-btn").disabled = true;
  document.getElementById("reroll-btn").style.display = "none"; // 振り直しボタンを隠す
  document.getElementById("reset-btn").style.display = "inline-block"; // リセットボタン
}

function resetGame() {
  // 1. ダイスとチェックボックスをリセット
  currentDice = [0, 0, 0, 0, 0];
  for (let i = 0; i < 5; i++) {
    document.getElementById(`d${i}`).innerText = "*";
    document.getElementById(`dice-img${i}`).src = "dice1.jpg"; // 画像リセット
    document.getElementById(`keep${i}`).checked = false;
  }

  // 2. メッセージ類をリセット
  document.getElementById("message").innerText = "サイコロを振ってください";
  document.getElementById("score").innerText = "スコア: 0点";
  document.getElementById("greeting").innerText = "あなたの運をみせてください";

  // 3. ボタンの表示切り替え
  document.getElementById("main-btn").style.display = "inline-block";
  document.getElementById("reroll-btn").style.display = "none";
  document.getElementById("reroll-btn").disabled = false; // 無効化を解除
  document.getElementById("reroll-btn").innerText = "振り直す"; // テキストを戻す
  document.getElementById("reset-btn").style.display = "none";
  // document.getElementById("keep-selectors").style.display = "none";
}


// 画面表示を更新する共通処理
function updateUI() {
  // ダイス数字の更新
  for (let i = 0; i < 5; i++) {
    const diceNum = currentDice[i];

    // テキスト表示の更新
    document.getElementById(`d${i}`).innerText = diceNum;

    // 画像表示の更新（picフォルダ内の画像を参照）
    document.getElementById(`dice-img${i}`).src = `dice${diceNum}.jpg`;
  }

  // 役判定　htmlに値を受け渡す。
  const response = judgement(currentDice);
  document.getElementById("message").innerText = "役: " + response.name + " / 確率: " + response.rate;
  document.getElementById("score").innerText = "スコア: " + response.score + "点";
  document.getElementById("greeting").innerText = response.greeting;
  
  // --- 4. 結果表示 ---
  console.log("あなたの出目: " + currentDice.join(", "));
  console.log("役: " + response.message + " / スコア: " + response.score + "点" +" / 確率: " + response.rate);
  console.log(response.greeting);
}

//////////////////////////////////////////////////////////////////////////////////

//実行
playGame();
