export function generateAdvancedDerivativeQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const types = [
    "optimization", // Masalah optimasi (max/min)
    "related_rates", // Laju perubahan terkait
    "curve_analysis", // Analisis kurva (naik/turun, konkaf)
    "parametric_derivative", // Turunan parametrik
    "linear_approximation", // Aproksimasi linear
  ];

  const type = getRandomElement(types);
  let question, answer, steps, qType;

  switch (type) {
    case "optimization":
      // Masalah optimasi
      const optType = getRandomElement([
        "rectangle_perimeter",
        "rectangle_area",
        "box_volume",
        "quadratic_max",
      ]);

      if (optType === "rectangle_perimeter") {
        // Persegi panjang dengan keliling tetap, cari luas maksimum
        const perimeter = getRandomInt(20, 40);
        // Untuk keliling P, luas maksimum saat x = P/4 (persegi)

        question = `Sebuah persegi panjang memiliki keliling ${perimeter} cm. Tentukan luas maksimum yang dapat dicapai (dalam cm²).`;

        // Keliling: 2x + 2y = P → y = P/2 - x
        // Luas: A = x·y = x(P/2 - x) = Px/2 - x²
        // A' = P/2 - 2x = 0 → x = P/4
        // y = P/4, jadi luas maksimum = (P/4)²
        answer = (perimeter / 4) * (perimeter / 4);

        steps = `Langkah penyelesaian:
1. Diberikan keliling persegi panjang: \\(K = ${perimeter}\\) cm

2. Misalkan panjang = \\(x\\) dan lebar = \\(y\\)
   \\[2x + 2y = ${perimeter}\\]
   \\[y = ${perimeter / 2} - x\\]

3. Luas persegi panjang:
   \\[A = x \\cdot y = x(${perimeter / 2} - x)\\]
   \\[A = ${perimeter / 2}x - x^2\\]

4. Cari turunan dan tetapkan = 0 untuk nilai maksimum:
   \\[\\frac{dA}{dx} = ${perimeter / 2} - 2x = 0\\]

5. Selesaikan untuk \\(x\\):
   \\[2x = ${perimeter / 2}\\]
   \\[x = ${perimeter / 4}\\]

6. Maka \\(y = ${perimeter / 2} - ${perimeter / 4} = ${perimeter / 4}\\)

7. Uji turunan kedua:
   \\[\\frac{d^2A}{dx^2} = -2 < 0\\] (maksimum)

8. Luas maksimum:
   \\[A = ${perimeter / 4} \\times ${perimeter / 4} = ${answer}\\text{ cm}^2\\]

9. Jadi, luas maksimum adalah \\(${answer}\\) cm²`;

        qType = "Optimasi (Luas Maksimum)";
      } else if (optType === "rectangle_area") {
        // Persegi panjang dengan luas tetap, cari keliling minimum
        const area = getRandomInt(16, 64);
        // Cari faktor yang menghasilkan keliling integer
        const side = Math.sqrt(area);

        if (!Number.isInteger(side)) {
          return generateAdvancedDerivativeQuestion();
        }

        question = `Sebuah persegi panjang memiliki luas ${area} cm². Tentukan keliling minimum yang mungkin (dalam cm).`;

        // Luas: x·y = A → y = A/x
        // Keliling: P = 2x + 2y = 2x + 2A/x
        // P' = 2 - 2A/x² = 0 → x² = A → x = √A
        // Keliling minimum = 4√A
        answer = 4 * side;

        steps = `Langkah penyelesaian:
1. Diberikan luas persegi panjang: \\(A = ${area}\\) cm²

2. Misalkan panjang = \\(x\\) dan lebar = \\(y\\)
   \\[x \\cdot y = ${area}\\]
   \\[y = \\frac{${area}}{x}\\]

3. Keliling persegi panjang:
   \\[P = 2x + 2y = 2x + 2 \\cdot \\frac{${area}}{x}\\]
   \\[P = 2x + \\frac{${2 * area}}{x}\\]

4. Cari turunan dan tetapkan = 0 untuk nilai minimum:
   \\[\\frac{dP}{dx} = 2 - \\frac{${2 * area}}{x^2} = 0\\]

5. Selesaikan untuk \\(x\\):
   \\[2 = \\frac{${2 * area}}{x^2}\\]
   \\[x^2 = ${area}\\]
   \\[x = ${side}\\]

6. Maka \\(y = \\frac{${area}}{${side}} = ${side}\\)

7. Uji turunan kedua:
   \\[\\frac{d^2P}{dx^2} = \\frac{${4 * area}}{x^3} > 0\\] (minimum)

8. Keliling minimum:
   \\[P = 2(${side}) + 2(${side}) = ${answer}\\text{ cm}\\]

9. Jadi, keliling minimum adalah \\(${answer}\\) cm`;

        qType = "Optimasi (Keliling Minimum)";
      } else if (optType === "box_volume") {
        // Kotak tanpa tutup dari karton persegi
        const cardboardSide = getRandomInt(6, 12);

        question = `Sebuah kotak tanpa tutup dibuat dari karton persegi berukuran ${cardboardSide} cm × ${cardboardSide} cm dengan memotong persegi kecil di setiap sudut dan melipat sisi-sisinya. Tentukan tinggi potongan (dalam cm) yang menghasilkan volume maksimum.`;

        // Volume: V = x(L-2x)(L-2x) = x(L-2x)²
        // V' = (L-2x)² + x·2(L-2x)(-2) = 0
        // V' = (L-2x)² - 4x(L-2x) = 0
        // V' = (L-2x)[(L-2x) - 4x] = 0
        // V' = (L-2x)(L-6x) = 0
        // x = L/6 (x = L/2 tidak valid karena box hilang)
        answer = cardboardSide / 6;

        if (!Number.isInteger(answer)) {
          return generateAdvancedDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Karton persegi: ${cardboardSide} cm × ${cardboardSide} cm

2. Potong persegi \\(x \\times x\\) di setiap sudut

3. Setelah dilipat:
   - Tinggi kotak: \\(x\\)
   - Panjang alas: \\(${cardboardSide} - 2x\\)
   - Lebar alas: \\(${cardboardSide} - 2x\\)

4. Volume kotak:
   \\[V = x(${cardboardSide} - 2x)^2\\]

5. Ekspansi:
   \\[V = x(${cardboardSide * cardboardSide} - ${4 * cardboardSide}x + 4x^2)\\]
   \\[V = ${cardboardSide * cardboardSide}x - ${4 * cardboardSide}x^2 + 4x^3\\]

6. Cari turunan:
   \\[\\frac{dV}{dx} = ${cardboardSide * cardboardSide} - ${
          8 * cardboardSide
        }x + 12x^2\\]

7. Tetapkan = 0 dan faktorkan:
   \\[12x^2 - ${8 * cardboardSide}x + ${cardboardSide * cardboardSide} = 0\\]
   
8. Menggunakan faktorisasi atau rumus ABC:
   \\[(${cardboardSide} - 2x)(${cardboardSide} - 6x) = 0\\]

9. Solusi: \\(x = ${cardboardSide / 2}\\) atau \\(x = ${cardboardSide / 6}\\)

10. \\(x = ${cardboardSide / 2}\\) tidak valid (kotak hilang)

11. Uji \\(x = ${answer}\\) dengan turunan kedua (atau uji titik)

12. Jadi, tinggi potongan optimal adalah \\(${answer}\\) cm`;

        qType = "Optimasi (Volume Kotak)";
      } else {
        // Nilai maksimum fungsi kuadrat
        const a1 = -getRandomInt(1, 3); // Negatif untuk maksimum
        const b1 = getRandomInt(4, 12);
        const c1 = getRandomInt(1, 10);

        question = `Tentukan nilai maksimum dari fungsi \\(f(x) = ${a1}x^2 + ${b1}x + ${c1}\\).`;

        // f'(x) = 2ax + b = 0 → x = -b/(2a)
        const xMax = -b1 / (2 * a1);
        // f(xMax) = a·xMax² + b·xMax + c
        answer = a1 * xMax * xMax + b1 * xMax + c1;

        if (!Number.isInteger(answer)) {
          return generateAdvancedDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a1}x^2 + ${b1}x + ${c1}\\]

2. Cari turunan:
   \\[f'(x) = ${2 * a1}x + ${b1}\\]

3. Tetapkan \\(f'(x) = 0\\):
   \\[${2 * a1}x + ${b1} = 0\\]
   \\[x = -\\frac{${b1}}{${2 * a1}} = ${xMax}\\]

4. Uji turunan kedua:
   \\[f''(x) = ${2 * a1} < 0\\] (maksimum)

5. Substitusi \\(x = ${xMax}\\) ke fungsi asli:
   \\[f(${xMax}) = ${a1}(${xMax})^2 + ${b1}(${xMax}) + ${c1}\\]
   \\[f(${xMax}) = ${a1 * xMax * xMax} + ${b1 * xMax} + ${c1}\\]
   \\[f(${xMax}) = ${answer}\\]

6. Jadi, nilai maksimum fungsi adalah \\(${answer}\\)`;

        qType = "Optimasi (Nilai Maksimum Fungsi)";
      }
      break;

    case "related_rates":
      // Laju perubahan terkait
      const rateType = getRandomElement([
        "ladder",
        "balloon",
        "rectangle_expand",
      ]);

      if (rateType === "ladder") {
        // Tangga yang meluncur di dinding
        const ladderLength = getRandomInt(5, 13);
        const bottomDistance = getRandomInt(3, ladderLength - 2);
        const bottomRate = getRandomInt(1, 3);

        // Gunakan Pythagoras: x² + y² = L²
        const heightSquared =
          ladderLength * ladderLength - bottomDistance * bottomDistance;
        const height = Math.sqrt(heightSquared);

        if (!Number.isInteger(height)) {
          return generateAdvancedDerivativeQuestion();
        }

        question = `Sebuah tangga sepanjang ${ladderLength} m bersandar di dinding. Bagian bawah tangga bergerak menjauh dari dinding dengan kecepatan ${bottomRate} m/s. Ketika bagian bawah tangga berjarak ${bottomDistance} m dari dinding, berapa kecepatan bagian atas tangga turun? (dalam m/s, gunakan nilai positif)`;

        // x² + y² = L²
        // 2x(dx/dt) + 2y(dy/dt) = 0
        // dy/dt = -(x/y)(dx/dt)
        answer = Math.abs((bottomDistance / height) * bottomRate);

        if (!Number.isInteger(answer)) {
          return generateAdvancedDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Diberikan:
   - Panjang tangga: \\(L = ${ladderLength}\\) m
   - Jarak bawah dari dinding: \\(x = ${bottomDistance}\\) m
   - Kecepatan bawah: \\(\\frac{dx}{dt} = ${bottomRate}\\) m/s

2. Gunakan teorema Pythagoras:
   \\[x^2 + y^2 = L^2\\]
   \\[x^2 + y^2 = ${ladderLength * ladderLength}\\]

3. Cari tinggi \\(y\\) saat \\(x = ${bottomDistance}\\):
   \\[${bottomDistance}^2 + y^2 = ${ladderLength * ladderLength}\\]
   \\[${bottomDistance * bottomDistance} + y^2 = ${
          ladderLength * ladderLength
        }\\]
   \\[y^2 = ${heightSquared}\\]
   \\[y = ${height}\\text{ m}\\]

4. Turunkan persamaan Pythagoras terhadap waktu:
   \\[2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0\\]

5. Sederhanakan:
   \\[x\\frac{dx}{dt} + y\\frac{dy}{dt} = 0\\]

6. Selesaikan untuk \\(\\frac{dy}{dt}\\):
   \\[\\frac{dy}{dt} = -\\frac{x}{y} \\cdot \\frac{dx}{dt}\\]

7. Substitusi nilai:
   \\[\\frac{dy}{dt} = -\\frac{${bottomDistance}}{${height}} \\times ${bottomRate}\\]
   \\[\\frac{dy}{dt} = -${answer}\\text{ m/s}\\]

8. Tanda negatif menunjukkan turun. Kecepatan turun: \\(${answer}\\) m/s`;

        qType = "Laju Terkait (Tangga)";
      } else if (rateType === "balloon") {
        // Balon yang mengembang
        const radiusRate = getRandomInt(1, 3);
        const radius = getRandomInt(3, 6);

        question = `Sebuah balon berbentuk bola mengembang dengan laju perubahan jari-jari ${radiusRate} cm/s. Ketika jari-jari balon ${radius} cm, berapa laju perubahan volume balon? (dalam cm³/s, gunakan π ≈ 3)`;

        // V = (4/3)πr³
        // dV/dt = 4πr²(dr/dt)
        // Gunakan π ≈ 3 untuk hasil integer
        answer = 4 * 3 * radius * radius * radiusRate;

        steps = `Langkah penyelesaian:
1. Diberikan:
   - Laju perubahan jari-jari: \\(\\frac{dr}{dt} = ${radiusRate}\\) cm/s
   - Jari-jari saat ini: \\(r = ${radius}\\) cm

2. Volume bola:
   \\[V = \\frac{4}{3}\\pi r^3\\]

3. Turunkan terhadap waktu:
   \\[\\frac{dV}{dt} = \\frac{4}{3}\\pi \\cdot 3r^2 \\cdot \\frac{dr}{dt}\\]
   \\[\\frac{dV}{dt} = 4\\pi r^2 \\cdot \\frac{dr}{dt}\\]

4. Substitusi nilai (gunakan \\(\\pi \\approx 3\\)):
   \\[\\frac{dV}{dt} = 4 \\times 3 \\times (${radius})^2 \\times ${radiusRate}\\]

5. Hitung:
   \\[\\frac{dV}{dt} = 12 \\times ${radius * radius} \\times ${radiusRate}\\]
   \\[\\frac{dV}{dt} = ${answer}\\text{ cm}^3\\text{/s}\\]

6. Jadi, laju perubahan volume adalah \\(${answer}\\) cm³/s`;

        qType = "Laju Terkait (Balon)";
      } else {
        // Persegi panjang yang mengembang
        const lengthRate = getRandomInt(1, 3);
        const widthRate = getRandomInt(1, 3);
        const length = getRandomInt(4, 8);
        const width = getRandomInt(3, 6);

        question = `Panjang sebuah persegi panjang bertambah dengan laju ${lengthRate} cm/s dan lebarnya bertambah dengan laju ${widthRate} cm/s. Ketika panjang = ${length} cm dan lebar = ${width} cm, berapa laju perubahan luas? (dalam cm²/s)`;

        // A = l·w
        // dA/dt = (dl/dt)·w + l·(dw/dt)
        answer = lengthRate * width + length * widthRate;

        steps = `Langkah penyelesaian:
1. Diberikan:
   - Laju perubahan panjang: \\(\\frac{dl}{dt} = ${lengthRate}\\) cm/s
   - Laju perubahan lebar: \\(\\frac{dw}{dt} = ${widthRate}\\) cm/s
   - Panjang saat ini: \\(l = ${length}\\) cm
   - Lebar saat ini: \\(w = ${width}\\) cm

2. Luas persegi panjang:
   \\[A = l \\cdot w\\]

3. Turunkan terhadap waktu (aturan produk):
   \\[\\frac{dA}{dt} = \\frac{dl}{dt} \\cdot w + l \\cdot \\frac{dw}{dt}\\]

4. Substitusi nilai:
   \\[\\frac{dA}{dt} = ${lengthRate} \\times ${width} + ${length} \\times ${widthRate}\\]

5. Hitung:
   \\[\\frac{dA}{dt} = ${lengthRate * width} + ${length * widthRate}\\]
   \\[\\frac{dA}{dt} = ${answer}\\text{ cm}^2\\text{/s}\\]

6. Jadi, laju perubahan luas adalah \\(${answer}\\) cm²/s`;

        qType = "Laju Terkait (Persegi Panjang)";
      }
      break;

    case "curve_analysis":
      // Analisis kurva
      const curveType = getRandomElement([
        "increasing_decreasing",
        "concavity",
        "inflection_point",
      ]);

      if (curveType === "increasing_decreasing") {
        // Interval naik/turun
        const a2 = getRandomInt(1, 3);
        const b2 = getRandomInt(4, 12);

        // f(x) = ax² - bx
        // f'(x) = 2ax - b = 0 → x = b/(2a)
        const criticalPoint = b2 / (2 * a2);

        if (!Number.isInteger(criticalPoint)) {
          return generateAdvancedDerivativeQuestion();
        }

        question = `Tentukan nilai \\(x\\) di mana fungsi \\(f(x) = ${a2}x^2 - ${b2}x\\) berubah dari turun menjadi naik.`;

        answer = criticalPoint;

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a2}x^2 - ${b2}x\\]

2. Cari turunan pertama:
   \\[f'(x) = ${2 * a2}x - ${b2}\\]

3. Titik kritis (f'(x) = 0):
   \\[${2 * a2}x - ${b2} = 0\\]
   \\[x = \\frac{${b2}}{${2 * a2}} = ${criticalPoint}\\]

4. Uji interval:
   - Untuk \\(x < ${criticalPoint}\\): \\(f'(x) < 0\\) (turun)
   - Untuk \\(x > ${criticalPoint}\\): \\(f'(x) > 0\\) (naik)

5. Uji turunan kedua:
   \\[f''(x) = ${2 * a2} > 0\\]
   
6. Karena \\(f''(${criticalPoint}) > 0\\), titik \\(x = ${criticalPoint}\\) adalah minimum lokal

7. Jadi, fungsi berubah dari turun ke naik di \\(x = ${criticalPoint}\\)`;

        qType = "Analisis Kurva (Interval Monoton)";
      } else if (curveType === "concavity") {
        // Kecekungan (concavity)
        const a3 = getRandomInt(1, 2);
        const b3 = getRandomInt(3, 9);
        const c3 = getRandomInt(1, 8);

        // f(x) = ax³ - bx²+ cx
        // f'(x) = 3ax² - 2bx + c
        // f''(x) = 6ax - 2b = 0 → x = b/(3a)
        const inflectionX = b3 / (3 * a3);

        if (!Number.isInteger(inflectionX)) {
          return generateAdvancedDerivativeQuestion();
        }

        question = `Tentukan nilai \\(x\\) di mana fungsi \\(f(x) = ${a3}x^3 - ${b3}x^2 + ${c3}x\\) berubah kecekungan (titik belok).`;

        answer = inflectionX;

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a3}x^3 - ${b3}x^2 + ${c3}x\\]

2. Cari turunan pertama:
   \\[f'(x) = ${3 * a3}x^2 - ${2 * b3}x + ${c3}\\]

3. Cari turunan kedua:
   \\[f''(x) = ${6 * a3}x - ${2 * b3}\\]

4. Titik belok (f''(x) = 0):
   \\[${6 * a3}x - ${2 * b3} = 0\\]
   \\[x = \\frac{${2 * b3}}{${6 * a3}} = ${inflectionX}\\]

5. Uji kecekungan:
   - Untuk \\(x < ${inflectionX}\\): \\(f''(x) < 0\\) (cekung ke bawah)
   - Untuk \\(x > ${inflectionX}\\): \\(f''(x) > 0\\) (cekung ke atas)

6. Jadi, titik belok berada di \\(x = ${inflectionX}\\)`;

        qType = "Analisis Kurva (Titik Belok)";
      } else {
        // Nilai y di titik belok
        const a4 = 1;
        const b4 = getRandomInt(3, 6);
        const c4 = getRandomInt(2, 8);
        const d4 = getRandomInt(1, 10);

        // f(x) = x³ - bx² + cx + d
        // f''(x) = 6x - 2b = 0 → x = b/3
        const inflectionX2 = b4 / 3;

        if (!Number.isInteger(inflectionX2)) {
          return generateAdvancedDerivativeQuestion();
        }

        const inflectionY =
          inflectionX2 ** 3 - b4 * inflectionX2 ** 2 + c4 * inflectionX2 + d4;

        if (!Number.isInteger(inflectionY)) {
          return generateAdvancedDerivativeQuestion();
        }

        question = `Fungsi \\(f(x) = x^3 - ${b4}x^2 + ${c4}x + ${d4}\\) memiliki titik belok. Tentukan nilai \\(y\\) di titik belok tersebut.`;

        answer = inflectionY;

        steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = x^3 - ${b4}x^2 + ${c4}x + ${d4}\\]

2. Cari turunan kedua:
   \\[f'(x) = 3x^2 - ${2 * b4}x + ${c4}\\]
   \\[f''(x) = 6x - ${2 * b4}\\]

3. Titik belok (f''(x) = 0):
   \\[6x - ${2 * b4} = 0\\]
   \\[x = ${inflectionX2}\\]

4. Substitusi \\(x = ${inflectionX2}\\) ke fungsi asli:
   \\[f(${inflectionX2}) = (${inflectionX2})^3 - ${b4}(${inflectionX2})^2 + ${c4}(${inflectionX2}) + ${d4}\\]

5. Hitung:
   \\[f(${inflectionX2}) = ${inflectionX2 ** 3} - ${b4 * inflectionX2 ** 2} + ${
          c4 * inflectionX2
        } + ${d4}\\]
   \\[f(${inflectionX2}) = ${answer}\\]

6. Jadi, nilai \\(y\\) di titik belok adalah \\(${answer}\\)`;

        qType = "Analisis Kurva (Nilai di Titik Belok)";
      }
      break;

    case "parametric_derivative":
      // Turunan parametrik
      const paramType = getRandomElement(["linear", "quadratic"]);

      if (paramType === "linear") {
        // x = at + b, y = ct + d
        const a5 = getRandomInt(2, 5);
        const b5 = getRandomInt(1, 8);
        const c5 = getRandomInt(3, 7);
        const d5 = getRandomInt(1, 8);
        const t5 = getRandomInt(0, 3);

        question = `Kurva parametrik didefinisikan sebagai \\(x = ${a5}t + ${b5}\\) dan \\(y = ${c5}t + ${d5}\\). Tentukan nilai \\(\\frac{dy}{dx}\\) ketika \\(t = ${t5}\\).`;

        // dy/dx = (dy/dt)/(dx/dt) = c/a
        answer = c5 / a5;

        if (!Number.isInteger(answer)) {
          return generateAdvancedDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Persamaan parametrik:
   \\[x = ${a5}t + ${b5}\\]
   \\[y = ${c5}t + ${d5}\\]

2. Cari \\(\\frac{dx}{dt}\\) dan \\(\\frac{dy}{dt}\\):
   \\[\\frac{dx}{dt} = ${a5}\\]
   \\[\\frac{dy}{dt} = ${c5}\\]

3. Gunakan rumus turunan parametrik:
   \\[\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{${c5}}{${a5}}\\]

4. Sederhanakan:
   \\[\\frac{dy}{dx} = ${answer}\\]

5. Nilai ini konstan untuk semua \\(t\\), termasuk \\(t = ${t5}\\)

6. Jadi, \\(\\frac{dy}{dx} = ${answer}\\)`;

        qType = "Turunan Parametrik (Linear)";
      } else {
        // x = t², y = at
        const a6 = getRandomInt(2, 8);
        const t6 = getRandomInt(1, 4);

        question = `Kurva parametrik didefinisikan sebagai \\(x = t^2\\) dan \\(y = ${a6}t\\). Tentukan nilai \\(\\frac{dy}{dx}\\) ketika \\(t = ${t6}\\).`;

        // dy/dx = (dy/dt)/(dx/dt) = a/(2t)
        answer = a6 / (2 * t6);

        if (!Number.isInteger(answer)) {
          return generateAdvancedDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Persamaan parametrik:
   \\[x = t^2\\]
   \\[y = ${a6}t\\]

2. Cari \\(\\frac{dx}{dt}\\) dan \\(\\frac{dy}{dt}\\):
   \\[\\frac{dx}{dt} = 2t\\]
   \\[\\frac{dy}{dt} = ${a6}\\]

3. Gunakan rumus turunan parametrik:
   \\[\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{${a6}}{2t}\\]

4. Substitusi \\(t = ${t6}\\):
   \\[\\frac{dy}{dx}\\bigg|_{t=${t6}} = \\frac{${a6}}{2(${t6})} = \\frac{${a6}}{${
          2 * t6
        }}\\]

5. Sederhanakan:
   \\[\\frac{dy}{dx} = ${answer}\\]

6. Jadi, nilai turunan ketika \\(t = ${t6}\\) adalah \\(${answer}\\)`;

        qType = "Turunan Parametrik (Kuadrat)";
      }
      break;

    case "linear_approximation":
      // Aproksimasi linear
      const approxType = getRandomElement(["sqrt", "cube", "reciprocal"]);

      if (approxType === "sqrt") {
        // Aproksimasi √x
        const a7 = getRandomInt(4, 9);
        const aSquared = a7 * a7;
        const delta = getRandomInt(1, 3);
        const targetValue = aSquared + delta;

        question = `Gunakan aproksimasi linear untuk memperkirakan nilai \\(\\sqrt{${targetValue}}\\). Gunakan \\(a = ${aSquared}\\) sebagai titik pendekatan.`;

        // f(x) = √x
        // f'(x) = 1/(2√x)
        // L(x) = f(a) + f'(a)(x-a)
        // L(target) = a7 + (1/(2·a7))·delta
        // = a7 + delta/(2·a7)

        // Untuk integer, kita butuh delta/(2·a7) yang integer atau setengah
        // Ambil approx dalam bentuk yang memberikan hasil hampir integer
        const approx = a7 * (2 * a7) + delta;
        answer = Math.round(approx / (2 * a7));

        if (!Number.isInteger(answer)) {
          return generateAdvancedDerivativeQuestion();
        }

        steps = `Langkah penyelesaian:
1. Fungsi: \\(f(x) = \\sqrt{x}\\)

2. Kita ingin memperkirakan \\(\\sqrt{${targetValue}}\\) menggunakan \\(a = ${aSquared}\\)

3. Turunan fungsi:
   \\[f'(x) = \\frac{1}{2\\sqrt{x}}\\]

4. Nilai di \\(a = ${aSquared}\\):
   \\[f(${aSquared}) = \\sqrt{${aSquared}} = ${a7}\\]
   \\[f'(${aSquared}) = \\frac{1}{2 \\times ${a7}} = \\frac{1}{${2 * a7}}\\]

5. Rumus aproksimasi linear:
   \\[L(x) = f(a) + f'(a)(x - a)\\]

6. Substitusi \\(x = ${targetValue}\\):
   \\[L(${targetValue}) = ${a7} + \\frac{1}{${
          2 * a7
        }}(${targetValue} - ${aSquared})\\]
   \\[L(${targetValue}) = ${a7} + \\frac{${delta}}{${2 * a7}}\\]

7. Hitung (pembulatan ke bilangan bulat terdekat):
   \\[L(${targetValue}) \\approx ${answer}\\]

8. Jadi, aproksimasi \\(\\sqrt{${targetValue}} \\approx ${answer}\\)`;

        qType = "Aproksimasi Linear (Akar)";
      } else if (approxType === "cube") {
        // Aproksimasi x³
        const a8 = getRandomInt(2, 4);
        const delta = 1;
        const targetValue = a8 + delta;

        question = `Gunakan aproksimasi linear untuk memperkirakan nilai \\((${targetValue})^3\\). Gunakan \\(a = ${a8}\\) sebagai titik pendekatan.`;

        // f(x) = x³
        // f'(x) = 3x²
        // L(x) = a³ + 3a²(x-a)
        const aCubed = a8 ** 3;
        const derivative = 3 * a8 * a8;
        answer = aCubed + derivative * delta;

        steps = `Langkah penyelesaian:
1. Fungsi: \\(f(x) = x^3\\)

2. Kita ingin memperkirakan \\((${targetValue})^3\\) menggunakan \\(a = ${a8}\\)

3. Turunan fungsi:
   \\[f'(x) = 3x^2\\]

4. Nilai di \\(a = ${a8}\\):
   \\[f(${a8}) = (${a8})^3 = ${aCubed}\\]
   \\[f'(${a8}) = 3(${a8})^2 = ${derivative}\\]

5. Rumus aproksimasi linear:
   \\[L(x) = f(a) + f'(a)(x - a)\\]

6. Substitusi \\(x = ${targetValue}\\):
   \\[L(${targetValue}) = ${aCubed} + ${derivative}(${targetValue} - ${a8})\\]
   \\[L(${targetValue}) = ${aCubed} + ${derivative} \\times ${delta}\\]
   \\[L(${targetValue}) = ${aCubed} + ${derivative * delta}\\]

7. Hitung:
   \\[L(${targetValue}) = ${answer}\\]

8. Jadi, aproksimasi \\((${targetValue})^3 \\approx ${answer}\\)
   
(Nilai sebenarnya: \\((${targetValue})^3 = ${targetValue ** 3}\\))`;

        qType = "Aproksimasi Linear (Pangkat Tiga)";
      } else {
        // Aproksimasi 1/x
        const a9 = getRandomInt(2, 5);
        const delta = 1;
        const targetValue = a9 + delta;

        question = `Gunakan aproksimasi linear untuk memperkirakan nilai \\(\\frac{1}{${targetValue}}\\). Gunakan \\(a = ${a9}\\) sebagai titik pendekatan. (Kalikan dengan ${
          a9 * a9 * targetValue
        } untuk mendapat bilangan bulat)`;

        // f(x) = 1/x
        // f'(x) = -1/x²
        // L(x) = 1/a - (1/a²)(x-a)
        const fa = 1 / a9;
        const fPrime = -1 / (a9 * a9);
        // L(targetValue) = 1/a9 - (1/a9²)(delta)
        // = 1/a9 - delta/a9²
        // = (a9 - delta)/a9²

        const numerator = a9 - delta;
        const denominator = a9 * a9;

        // Untuk mendapat integer, kalikan dengan a9² * targetValue
        const multiplier = denominator * targetValue;
        answer = Math.round(numerator * targetValue);

        steps = `Langkah penyelesaian:
1. Fungsi: \\(f(x) = \\frac{1}{x}\\)

2. Kita ingin memperkirakan \\(\\frac{1}{${targetValue}}\\) menggunakan \\(a = ${a9}\\)

3. Turunan fungsi:
   \\[f'(x) = -\\frac{1}{x^2}\\]

4. Nilai di \\(a = ${a9}\\):
   \\[f(${a9}) = \\frac{1}{${a9}}\\]
   \\[f'(${a9}) = -\\frac{1}{(${a9})^2} = -\\frac{1}{${denominator}}\\]

5. Rumus aproksimasi linear:
   \\[L(x) = f(a) + f'(a)(x - a)\\]

6. Substitusi \\(x = ${targetValue}\\):
   \\[L(${targetValue}) = \\frac{1}{${a9}} - \\frac{1}{${denominator}}(${targetValue} - ${a9})\\]
   \\[L(${targetValue}) = \\frac{1}{${a9}} - \\frac{${delta}}{${denominator}}\\]

7. Sederhanakan:
   \\[L(${targetValue}) = \\frac{${a9} - ${delta}}{${denominator}} = \\frac{${numerator}}{${denominator}}\\]

8. Untuk bilangan bulat, kalikan dengan ${targetValue}:
   \\[${numerator} \\times ${targetValue} ÷ ${denominator} \\approx ${answer}\\]

9. Jadi, dalam bentuk yang disederhanakan: \\(${answer}\\)`;

        qType = "Aproksimasi Linear (Resiprokal)";
      }
      break;
  }

  return { question, answer, steps, type: qType };
}
