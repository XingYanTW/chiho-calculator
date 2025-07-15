function tracksToUnits(trackCount) {
  // 所有曲數皆以3首=1道計算價格（無論輸入4首或其他）
  return Math.ceil(trackCount / 3);
}

function calculate() {
  const leader = parseInt(document.getElementById('leaderCount').value) || 0;
  const fav = parseInt(document.getElementById('favCount').value) || 0;
  const unfav = parseInt(document.getElementById('unfavCount').value) || 0;
  const songBonus = parseInt(document.getElementById('songBonus').value) || 0;
  const playBonus = parseInt(document.getElementById('playBonus').value) || 0;
  const trackCount = parseInt(document.getElementById('trackCount').value) || 0;
  const ticketType = document.getElementById('ticketType').value.split(',');
  const ticketMultiplier = Number(ticketType[0]); // 距離倍率
  const ticketCreditCost = Number(ticketType[1]); // 一道票券數
  const perUnitPrice = parseInt(document.getElementById('perUnitPrice').value) || 0;
  const targetDistance = parseInt(document.getElementById('targetDistance').value) || 0;

  // Deluxe Power 計算
  const deluxePower = leader * 4 + fav * 2 + unfav * 1;
  const totalBonus = songBonus + playBonus;

  // track轉換成道數
  const unitCount = tracksToUnits(trackCount);

  // 正向計算：本次移動距離
  // (Deluxe Power + 遊玩獎勵 + 樂曲獎勵) × 曲目數（TRACK數） × 票券倍率
  const distance = Math.ceil((deluxePower + totalBonus) * trackCount * ticketMultiplier);

  // 本次價格
  const totalCost = perUnitPrice * ticketMultiplier;

  // 每 km 價格
  const pricePerKm = (distance > 0) ? Math.ceil(totalCost / distance) : 0;

  // 反推計算：目標距離需要的道數與票券數
  // 反推時以 track 為單位
  const needTracksRaw = targetDistance / ((deluxePower + totalBonus) * ticketMultiplier);
  const needTracks = Math.ceil(needTracksRaw);

  // track 轉換成道數
  const needUnits = Math.ceil(needTracks/trackCount);

  // 每張票券包含道數
  const unitsPerTicket = 3; // 一張票券包含3道 (固定)
  const ticketCountRaw = needUnits / unitsPerTicket;
  const ticketCount = Math.ceil(ticketCountRaw);

  // 反推總價格
  const totalCostTarget = needUnits * perUnitPrice;

  // 顯示計算公式
  const formulaString =
    `(${deluxePower} + ${totalBonus}) × 曲目數(${trackCount}) × 票券倍率(${ticketMultiplier}) = ${distance} Km`;

  const logString = `
=== 輸入資料 ===
隊長數: ${leader}
擅長數: ${fav}
不擅長數: ${unfav}
歌曲獎勵: ${songBonus} Km
遊玩獎勵: ${playBonus} Km
實際曲數 (track): ${trackCount}
票券倍率: ${ticketMultiplier}倍
每道價格: ${perUnitPrice} 円
目標距離: ${targetDistance} Km

=== 正向計算結果 ===
本次移動距離：${distance} Km
計算公式：${formulaString}
本次價格：${totalCost} 円
每 Km 價格：約 ${pricePerKm} 円/km

=== 反推計算結果 ===
所需曲數 = 目標距離 ÷ ((Deluxe Power + 遊玩獎勵 + 樂曲獎勵) × 曲目數(${trackCount}) × 票券倍率)
         = ${targetDistance} ÷ ((${deluxePower} + ${totalBonus}) × ${trackCount} × ${ticketMultiplier})
         ≈ ${needTracksRaw.toFixed(2)}
所需曲數（向上取整）：${needTracks} 首
所需道數：${needUnits} 道
總花費：${totalCostTarget} 円
`;

  document.getElementById('result').textContent = (logString.trim());
}

document.getElementById('calculateBtn').addEventListener('click', calculate);

document.getElementById('logBtn').addEventListener('click', () => {
  alert(document.getElementById('result').textContent);
});
document.getElementById('logBtn').addEventListener('click', () => {
  alert(document.getElementById('result').textContent);
});
