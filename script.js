function calculate() {
  const hoseCount = parseFloat(document.getElementById("hoseCount").value);
  const flowRate = parseFloat(document.getElementById("flowRate").value);

  const staticPressure = parseFloat(document.getElementById("staticPressure").value);
  const dynamicPressure = parseFloat(document.getElementById("dynamicPressure").value);

  const nozzleDiameter = parseFloat(document.getElementById("nozzleDiameter").value);
  const nozzlePressure = parseFloat(document.getElementById("nozzlePressure").value);

  if (!isNaN(hoseCount) && !isNaN(flowRate) && !isNaN(staticPressure) && !isNaN(dynamicPressure) && !isNaN(nozzleDiameter) && !isNaN(nozzlePressure)) {
    // 各サイズの摩擦損失
    const loss65 = 0.137 * hoseCount * Math.pow(flowRate, 2);
    const loss50 = 0.365 * hoseCount * Math.pow(flowRate, 2);
    const loss40 = 1.569 * hoseCount * Math.pow(flowRate, 2);
    const totalLoss = loss65 + loss50 + loss40;

    // 消火栓の最大給水量
    const maxWaterFlow = staticPressure / Math.pow((staticPressure - dynamicPressure), 0.54);

    // 放水量
    const waterDischarge = Math.pow(nozzleDiameter, 2) * Math.sqrt(nozzlePressure);

    document.getElementById("result").innerHTML = `
      <div class="result-box">
        <div class="column">
          <strong>65mm</strong><br>
          摩擦損失：${loss65.toFixed(2)} kPa
        </div>
        <div class="column">
          <strong>50mm</strong><br>
          摩擦損失：${loss50.toFixed(2)} kPa
        </div>
        <div class="column">
          <strong>40mm</strong><br>
          摩擦損失：${loss40.toFixed(2)} kPa
        </div>
      </div>
      <div class="total">
        ✅ トータル摩擦損失：${totalLoss.toFixed(2)} kPa<br><br>
        🚰 最大給水量予測：${maxWaterFlow.toFixed(2)} ℓ/分<br>
        🚿 放水量：${waterDischarge.toFixed(2)} ℓ/分
      </div>
    `;
  } else {
    document.getElementById("result").innerHTML = `<div class="total">すべての数値を入力してくださいませ！</div>`;
  }
}
