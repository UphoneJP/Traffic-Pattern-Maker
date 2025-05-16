import { FlightData } from "../types/types";

function toKana (str: string) {
  const kanaMap: { [key: string]: string } = {
    'あ': 'ア', 'い': 'イ', 'う': 'ウ', 'え': 'エ', 'お': 'オ',
    'か': 'カ', 'が': 'ガ', 'き': 'キ', 'ぎ': 'ギ', 'く': 'ク', 'ぐ': 'グ', 'け': 'ケ', 'げ': 'ゲ', 'こ': 'コ', 'ご': 'ゴ',
    'さ': 'サ', 'ざ': 'ザ', 'し': 'シ', 'じ': 'ジ', 'す': 'ス', 'ず': 'ズ', 'せ': 'セ', 'ぜ': 'ゼ', 'そ': 'ソ', 'ぞ': 'ゾ',
    'た': 'タ', 'だ': 'ダ', 'ち': 'チ', 'ぢ': 'ヂ', 'つ': 'ツ', 'づ': 'ヅ', 'て': 'テ', 'で': 'デ', 'と': 'ト', 'ど': 'ド',
    'な': 'ナ', 'に': 'ニ', 'ぬ': 'ヌ', 'ね': 'ネ', 'の': 'ノ',
    'は': 'ハ', 'ば': 'バ', 'ぱ': 'パ',
    'ひ': 'ヒ', 'び': 'ビ', 'ぴ': 'ピ',
    'ふ': 'フ', 'ぶ': 'ブ', 'ぷ': 'プ',
    'へ': 'ヘ', 'べ': 'ベ', 'ぺ': 'ペ',
    'ほ': 'ホ', 'ぼ': 'ボ', 'ぽ': 'ポ',
    'ま': 'マ', 'み': 'ミ', 'む': 'ム', 'め': 'メ', 'も': 'モ',
    'や': 'ヤ', 'ゆ': 'ユ', 'よ': 'ヨ',
    'ら': 'ラ', 'り': 'リ', 'る': 'ル', 'れ': 'レ', 'ろ': 'ロ',
    'わ': 'ワ', 'を': 'ヲ', 'ん': 'ン',
  };
  return kanaMap[str]
};

export function sortFun(response: FlightData){
  const sortedKeys = Object.keys(response).sort((a, b) => {
    // 1. 数字順
    const numA = Number(a);
    const numB = Number(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    if (!isNaN(numA)) {
      return -1; // a を優先
    }
    if (!isNaN(numB)) {
      return 1;  // b を優先
    }

    // 2. アルファベット順 (大文字・小文字を区別しない)
    const lowerA = a.toLowerCase();
    const lowerB = b.toLowerCase();
    const alphabetComparison = lowerA.localeCompare(lowerB);
    if (alphabetComparison !== 0) {
      return alphabetComparison;
    }

    // 3. 日本語50音順
    const kanaA = toKana(a);
    const kanaB = toKana(b);
    return kanaA.localeCompare(kanaB, 'ja');
  })

  const sortedData: FlightData = {}

  sortedKeys.forEach(key => {
    sortedData[key] = response[key]
  })

  return sortedData
}
