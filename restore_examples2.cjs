const fs = require('fs');
let content = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');

const match = content.match(/သွေးအမျိုးအစားက \$\\text\{A, B, AB, O\}\$ ဆိုပြီး \$4\$ မျိုးရှိသည်။ ပြီးတော့ သွေးမှာ \$\\text\{Rh positive \(\+\)\}\$ နဲ့ \$\\text\{Rh negative \(-\)\}\$ ဆိုပြီး ခွဲခြားချက်နှစ်မျိုး ရှိသေးသည်။ သွေး[\s\S]*?Note: \$0\$ and \$100\$ do not contain the digit \$5\$ exactly once, so we only consider \$1\$ to \$99\.\)/);

if (match) {
  console.log("Matched regex!");
} else {
  console.log("Did not match! Trying something smaller.");
  const smallMatch = content.match(/သွေးအမျိုးအစားက \$\\text\{A, B, AB, O\}\$ ဆိုပြီး \$4\$ မျိုးရှိသည်။/);
  if (smallMatch) console.log("Found beginning.");
  const smallMatch2 = content.match(/Note: \$0\$ and \$100\$/);
  if (smallMatch2) console.log("Found ending.");
}
