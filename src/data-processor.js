/**
 * 資料處理模組 - 用於 Demo 命名建議
 *
 * Demo 時可以問：
 * - "這個計算總價的函數應該叫什麼？"
 * - "儲存折扣後價格的變數怎麼命名？"
 * - "處理訂單資料的類別該取什麼名字？"
 */

// TODO: 需要一個計算購物車總價的函數
function calc(items) {
  let t = 0;
  for (const item of items) {
    t += item.price * item.qty;
  }
  return t;
}

// TODO: 需要一個套用折扣的函數
function apply(total, discount) {
  return total * (1 - discount);
}

// TODO: 需要一個格式化金額的函數
function fmt(amount) {
  return `$${amount.toFixed(2)}`;
}

// TODO: 這個變數名稱不夠清楚
const d = 0.1; // 10% 折扣

// TODO: 這個陣列名稱太籠統
const data = [
  { id: 1, name: '商品A', price: 100, qty: 2 },
  { id: 2, name: '商品B', price: 200, qty: 1 },
  { id: 3, name: '商品C', price: 50, qty: 3 },
];

// TODO: 這個布林變數命名不好
const flag = true; // 是否已套用折扣

// 使用範例
const result = calc(data);
const final = apply(result, d);
console.log(fmt(final));

export { calc, apply, fmt, d, data, flag };
