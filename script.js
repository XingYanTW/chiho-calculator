function calculate() {
  const leader = 1;
  let fav = 0, unfav = 0;
  const selects = document.querySelectorAll('.member-type');
  selects.forEach(sel => {
    if (sel.checked) fav++;
    else unfav++;
  });
  const songBonus = parseInt(document.getElementById('songBonus').value) || 0;
  const playBonus = parseInt(document.getElementById('playBonus').value) || 0;
  const trackCount = parseInt(document.getElementById('trackCount').value) || 0;
  const ticketType = document.getElementById('ticketType').value.split(',');
  const ticketMultiplier = Number(ticketType[0]); // 距離倍率
  const ticketCreditCost = Number(ticketType[1]); // 一道票券數
  const perUnitPrice = parseInt(document.getElementById('perUnitPrice').value) || 0;
  const targetDistance = parseInt(document.getElementById('targetDistance').value) || 0;

  const deluxePower = leader * 4 + fav * 2 + unfav * 1;
  const totalBonus = songBonus + playBonus;

  const distance = Math.ceil((deluxePower + totalBonus) * trackCount * ticketMultiplier);

  const totalCost = perUnitPrice + ticketCreditCost*100;

  const pricePerKm = (distance > 0) ? Math.ceil(totalCost / distance) : 0;

  const needUnitsRaw = targetDistance / distance;
  const needUnits = Math.ceil(needUnitsRaw);

  const totalCostTarget = (perUnitPrice + ticketCreditCost*100)*needUnits;

  const formulaString =
    `(${deluxePower} + ${totalBonus}) × 曲目數(${trackCount}) × 票券倍率(${ticketMultiplier}) = ${distance} Km`;

  const logString = `
=== 輸入資料 ===
隊長數: ${leader}
擅長成員數: ${fav}
不擅長成員數: ${unfav}
獎勵樂曲: ${songBonus} Km
遊玩獎勵: ${playBonus} Km
遊玩曲數: ${trackCount}
加速券: ${ticketMultiplier}倍
每道價格: ${perUnitPrice}$
目標距離: ${targetDistance} Km

=== 正向計算結果 ===
本次移動距離：${distance} Km
計算公式：${formulaString}
本次價格：${totalCost}$
每 Km 價格：約 ${pricePerKm}$/km

=== 反推計算結果 ===
所需道數 = 目標距離 ÷ ((Deluxe Power + 遊玩獎勵 + 樂曲獎勵) × 曲目數(${trackCount}) × 票券倍率)
         = ${targetDistance} ÷ ((${deluxePower} + ${totalBonus}) × ${trackCount} × ${ticketMultiplier})
         ≈ ${needUnitsRaw.toFixed(2)}
所需道數：${needUnits} 道
總花費：${totalCostTarget}$
`;

  document.getElementById('result').textContent = (logString.trim());

  // 自動捲動到結果區塊
  document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'center' });

  // 儲存最新結果
  localStorage.setItem('lastResult', logString.trim());
}

document.getElementById('calculateBtn').addEventListener('click', calculate);

document.getElementById('logBtn')?.addEventListener('click', () => {
  alert(document.getElementById('result').textContent);
});