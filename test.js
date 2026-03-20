'use strict'
// 1行目に記載している 'use strict' は削除しないでください
// 1. ドットフラッシュ：1のゾロ目
test(judgement([1, 1, 1, 1, 1]), dotFlash);

// 2. フラッシュ：1以外のゾロ目
test(judgement([6, 6, 6, 6, 6]), flash);
test(judgement([2, 2, 2, 2, 2]), flash);

// 3. ストレート：2つのパターン
test(judgement([1, 2, 3, 4, 5]), straight); // 1-5
test(judgement([2, 3, 4, 5, 6]), straight); // 2-6

// 4. ノーペア（重要）：バラバラだがストレートではない
test(judgement([1, 2, 4, 5, 6]), noPair);   // 3が抜けている
test(judgement([1, 2, 3, 5, 6]), noPair);   // 4が抜けている
test(judgement([1, 3, 4, 5, 6]), noPair);   // 2が抜けている

// 5. フルハウス
test(judgement([2, 2, 3, 3, 3]), fullHouse);

// 6. 3ダイス
test(judgement([4, 4, 4, 1, 2]), threeDice);

// 7. 2ペア
test(judgement([5, 5, 6, 6, 1]), twoPair);

// 8. 1ペア
test(judgement([1, 1, 2, 3, 4]), onePair);

// 9. 順序がバラバラでも判定できるか
test(judgement([5, 1, 3, 4, 2]), straight);
test(judgement([3, 2, 3, 2, 3]), fullHouse);
