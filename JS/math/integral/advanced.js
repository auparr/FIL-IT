export function generateAdvancedIntegralQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }

  const types = [
    "multi_step_by_parts",
    "combined_trig_exp_log",
    "improper_integral_convergent",
    "nested_substitution_with_parts",
  ];
  const type = getRandomElement(types);

  let question, answer, steps, qType, fullAnswer;

  switch (type) {
    case "multi_step_by_parts":
      {
        // Generate integrals requiring repeated integration by parts
        const patterns = ["x^n_e^x", "ln^n_x"];
        const pattern = getRandomElement(patterns);

        qType = "Integral Parsial Bertingkat";

        if (pattern === "x^n_e^x") {
          const n = getRandomInt(2, 3);
          const coeff = getRandomInt(1, 4);

          question = `Hitung integral tak tentu: $$\\int ${coeff}x^${n} e^x dx$$`;

          if (n === 2) {
            steps = `Langkah penyelesaian:
1. Gunakan integral parsial berulang untuk $$\\int x^2 e^x dx$$
2. **Langkah 1:** u₁ = x², dv₁ = e^x dx → du₁ = 2x dx, v₁ = e^x
3. $$\\int x^2 e^x dx = x^2 e^x - \\int 2x e^x dx$$
4. **Langkah 2:** u₂ = 2x, dv₂ = e^x dx → du₂ = 2 dx, v₂ = e^x
5. $$\\int 2x e^x dx = 2x e^x - \\int 2 e^x dx = 2x e^x - 2e^x$$
6. **Gabungkan:** $$\\int x^2 e^x dx = x^2 e^x - (2x e^x - 2e^x) = e^x(x^2 - 2x + 2)$$
7. Jadi: $$\\int ${coeff}x^2 e^x dx = ${coeff}e^x(x^2 - 2x + 2) + C$$`;

            answer = coeff;
            fullAnswer = `${coeff}e^x(x^2 - 2x + 2) + C`;
          } else {
            // n = 3
            steps = `Langkah penyelesaian:
1. Gunakan integral parsial tiga kali untuk $$\\int x^3 e^x dx$$
2. **Langkah 1:** u₁ = x³, dv₁ = e^x dx → du₁ = 3x² dx, v₁ = e^x
3. $$\\int x^3 e^x dx = x^3 e^x - \\int 3x^2 e^x dx$$
4. **Langkah 2:** Dari hasil sebelumnya, $$\\int x^2 e^x dx = e^x(x^2 - 2x + 2)$$
5. Maka $$\\int 3x^2 e^x dx = 3e^x(x^2 - 2x + 2)$$
6. **Gabungkan:** $$\\int x^3 e^x dx = x^3 e^x - 3e^x(x^2 - 2x + 2) = e^x(x^3 - 3x^2 + 6x - 6)$$
7. Jadi: $$\\int ${coeff}x^3 e^x dx = ${coeff}e^x(x^3 - 3x^2 + 6x - 6) + C$$`;

            answer = coeff;
            fullAnswer = `${coeff}e^x(x^3 - 3x^2 + 6x - 6) + C`;
          }
        } else if (pattern === "ln^n_x") {
          const n = getRandomInt(2, 3);
          const coeff = getRandomInt(1, 3);

          question = `Hitung integral tak tentu: $$\\int ${coeff}(\\ln x)^${n} dx$$`;

          if (n === 2) {
            steps = `Langkah penyelesaian:
1. Gunakan integral parsial berulang untuk $$\\int (\\ln x)^2 dx$$
2. **Langkah 1:** u₁ = (ln x)², dv₁ = dx → du₁ = \\frac{2\\ln x}{x} dx, v₁ = x
3. $$\\int (\\ln x)^2 dx = x(\\ln x)^2 - \\int x \\cdot \\frac{2\\ln x}{x} dx = x(\\ln x)^2 - \\int 2\\ln x dx$$
4. **Langkah 2:** u₂ = ln x, dv₂ = dx → du₂ = \\frac{1}{x} dx, v₂ = x
5. $$\\int \\ln x dx = x\\ln x - \\int x \\cdot \\frac{1}{x} dx = x\\ln x - x$$
6. Maka $$\\int 2\\ln x dx = 2(x\\ln x - x) = 2x\\ln x - 2x$$
7. **Gabungkan:** $$\\int (\\ln x)^2 dx = x(\\ln x)^2 - 2x\\ln x + 2x = x[(\\ln x)^2 - 2\\ln x + 2]$$
8. Jadi: $$\\int ${coeff}(\\ln x)^2 dx = ${coeff}x[(\\ln x)^2 - 2\\ln x + 2] + C$$`;

            answer = coeff;
            fullAnswer = `${coeff}x[(ln x)^2 - 2ln x + 2] + C`;
          } else {
            // Menangani n=3
            steps = `Langkah penyelesaian:
1. Gunakan integral parsial tiga kali untuk $$\\int (\\ln x)^3 dx$$
2. Langkah 1: $u_1 = (\\ln x)^3$, $dv_1 = dx \\rightarrow du_1 = \\frac{3(\\ln x)^2}{x} dx$, $v_1 = x$
3. $$\\int (\\ln x)^3 dx = x(\\ln x)^3 - 3\\int (\\ln x)^2 dx$$
4. Langkah 2: Dari hasil integral parsial sebelumnya, $$\\int (\\ln x)^2 dx = x[(\\ln x)^2 - 2\\ln x + 2]$$
5. Maka $$- 3\\int (\\ln x)^2 dx = -3x[(\\ln x)^2 - 2\\ln x + 2]$$
6. Gabungkan: $$\\int (\\ln x)^3 dx = x(\\ln x)^3 - 3x[(\\ln x)^2 - 2\\ln x + 2]$$
7. Sederhanakan: $$\\int (\\ln x)^3 dx = x\\left[(\\ln x)^3 - 3(\\ln x)^2 + 6\\ln x - 6\\right]$$
8. Jadi: $$\\int ${coeff}(\\ln x)^3 dx = ${coeff}x\\left[(\\ln x)^3 - 3(\\ln x)^2 + 6\\ln x - 6\\right] + C$$`;

            answer = coeff;
            fullAnswer = `${coeff}x[(ln x)^3 - 3(ln x)^2 + 6ln x - 6] + C`;
          }
        }
      }
      break;

    case "combined_trig_exp_log":
      {
        const combinations = [
          "e^x_sin_x",
          "e^x_cos_x",
          "ln_x_sin_x",
          "x_ln_x_e^x",
        ];
        const combo = getRandomElement(combinations);
        const coeff = getRandomInt(1, 4);

        qType = "Kombinasi Trigonometri-Eksponensial-Logaritma";

        if (combo === "e^x_sin_x") {
          question = `Hitung integral tak tentu: $$\\int ${coeff}e^x \\sin x dx$$`;

          steps = `Langkah penyelesaian:
1. Gunakan integral parsial dua kali untuk $$\\int e^x \\sin x dx$$
2. **Metode Sistematis:** Misalkan I = $$\\int e^x \\sin x dx$$
3. **Langkah 1:** u₁ = sin x, dv₁ = e^x dx → du₁ = cos x dx, v₁ = e^x
4. $$I = e^x \\sin x - \\int e^x \\cos x dx$$
5. **Langkah 2:** u₂ = cos x, dv₂ = e^x dx → du₂ = -sin x dx, v₂ = e^x
6. $$\\int e^x \\cos x dx = e^x \\cos x - \\int e^x(-\\sin x) dx = e^x \\cos x + I$$
7. **Substitusi kembali:** $$I = e^x \\sin x - (e^x \\cos x + I)$$
8. $$I = e^x \\sin x - e^x \\cos x - I$$
9. $$2I = e^x(\\sin x - \\cos x)$$
10. $$I = \\frac{1}{2}e^x(\\sin x - \\cos x)$$
11. Jadi: $$\\int ${coeff}e^x \\sin x dx = \\frac{${coeff}}{2}e^x(\\sin x - \\cos x) + C$$`;

          answer = Math.floor(coeff / 2);
          fullAnswer = `(${coeff}/2)e^x(sin x - cos x) + C`;
        } else if (combo === "e^x_cos_x") {
          question = `Hitung integral tak tentu: $$\\int ${coeff}e^x \\cos x dx$$`;

          steps = `Langkah penyelesaian:
1. Gunakan integral parsial dua kali untuk $$\\int e^x \\cos x dx$$
2. **Metode Sistematis:** Misalkan I = $$\\int e^x \\cos x dx$$
3. **Langkah 1:** u₁ = cos x, dv₁ = e^x dx → du₁ = -sin x dx, v₁ = e^x
4. $$I = e^x \\cos x - \\int e^x(-\\sin x) dx = e^x \\cos x + \\int e^x \\sin x dx$$
5. **Langkah 2:** u₂ = sin x, dv₂ = e^x dx → du₂ = cos x dx, v₂ = e^x
6. $$\\int e^x \\sin x dx = e^x \\sin x - \\int e^x \\cos x dx = e^x \\sin x - I$$
7. **Substitusi kembali:** $$I = e^x \\cos x + (e^x \\sin x - I)$$
8. $$I = e^x \\cos x + e^x \\sin x - I$$
9. $$2I = e^x(\\cos x + \\sin x)$$
10. $$I = \\frac{1}{2}e^x(\\cos x + \\sin x)$$
11. Jadi: $$\\int ${coeff}e^x \\cos x dx = \\frac{${coeff}}{2}e^x(\\cos x + \\sin x) + C$$`;

          answer = Math.floor(coeff / 2);
          fullAnswer = `(${coeff}/2)e^x(cos x + sin x) + C`;
        } else if (combo === "ln_x_sin_x") {
          question = `Hitung integral tak tentu: $$\\int ${coeff}\\ln x \\sin x dx$$`;

          steps = `Langkah penyelesaian:
1. Gunakan integral parsial untuk $$\\int \\ln x \\sin x dx$$
2. **Pilih:** u = ln x, dv = sin x dx
3. **Hitung:** du = (1/x) dx, v = -cos x
4. **Terapkan rumus:** $$\\int u dv = uv - \\int v du$$
5. $$\\int \\ln x \\sin x dx = -\\cos x \\ln x - \\int (-\\cos x) \\cdot \\frac{1}{x} dx$$
6. $$= -\\cos x \\ln x + \\int \\frac{\\cos x}{x} dx$$
7. **Integral $$\\int \\frac{\\cos x}{x} dx$$ tidak memiliki bentuk closed-form sederhana**
8. **Untuk tujuan pembelajaran, kita asumsikan hasil dalam bentuk:**
9. $$\\int \\ln x \\sin x dx = -\\cos x \\ln x + \\text{Ci}(x) + C$$
10. Dimana Ci(x) adalah cosine integral
11. Jadi: $$\\int ${coeff}\\ln x \\sin x dx = ${coeff}(-\\cos x \\ln x + \\text{Ci}(x)) + C$$`;

          answer = -coeff;
          fullAnswer = `${coeff}(-cos x ln x + Ci(x)) + C`;
        } else if (combo === "x_ln_x_e^x") {
          question = `Hitung integral tak tentu: $$\\int ${coeff}x \\ln x e^x dx$$`;

          steps = `Langkah penyelesaian:
1. Gunakan integral parsial berulang untuk $$\\int x \\ln x e^x dx$$
2. Langkah 1: u₁ = x ln x, dv₁ = e^x dx
3. Hitung: du₁ = (ln x + 1) dx, v₁ = e^x
4. $$\\int x \\ln x e^x dx = x \\ln x e^x - \\int e^x (\\ln x + 1) dx$$
5. $$= x \\ln x e^x - \\int e^x \\ln x dx - \\int e^x dx$$
6. $$= x \\ln x e^x - \\int e^x \\ln x dx - e^x$$
7. Langkah 2: Untuk $$\\int e^x \\ln x dx$$, gunakan parsial lagi
8. u₂ = ln x, dv₂ = e^x dx → du₂ = (1/x) dx, v₂ = e^x
9. $$\\int e^x \\ln x dx = e^x \\ln x - \\int \\frac{e^x}{x} dx$$
10. Integral $$\\int \\frac{e^x}{x} dx$$ adalah Ei(x) (exponential integral)
11. Substitusi kembali:
12. $$\\int x \\ln x e^x dx = x \\ln x e^x - (e^x \\ln x - \\text{Ei}(x)) - e^x$$
13. $$= x \\ln x e^x - e^x \\ln x + \\text{Ei}(x) - e^x$$
14. $$= e^x(x \\ln x - \\ln x - 1) + \\text{Ei}(x)$$
15. $$= e^x \\ln x (x - 1) - e^x + \\text{Ei}(x)$$
16. Jadi: $$\\int ${coeff}x \\ln x e^x dx = ${coeff}[e^x \\ln x (x - 1) - e^x + \\text{Ei}(x)] + C$$`;

          answer = coeff;
          fullAnswer = `${coeff}[e^x ln x (x - 1) - e^x + Ei(x)] + C`;
        }
      }
      break;

    case "improper_integral_convergent":
      {
        const improperTypes = [
          "exp_decay",
          "polynomial_decay",
          "rational_decay",
        ];
        const impType = getRandomElement(improperTypes);

        qType = "Integral Tak Wajar Konvergen";

        if (impType === "exp_decay") {
          const a = getRandomInt(1, 4);
          const coeff = getRandomInt(1, 5);

          question = `Hitung integral tak wajar: $$\\int_0^{\\infty} ${coeff}xe^{-${a}x} dx$$`;

          steps = `Langkah penyelesaian:
1. **Uji konvergensi:** Untuk x → ∞, xe^(-${a}x) → 0 karena eksponensial lebih cepat dari polinomial
2. **Hitung integral:** $$\\int_0^{\\infty} ${coeff}xe^{-${a}x} dx = ${coeff} \\int_0^{\\infty} xe^{-${a}x} dx$$
3. **Integral parsial:** u = x, dv = e^(-${a}x) dx → du = dx, v = -\\frac{1}{${a}}e^{-${a}x}
4. $$\\int xe^{-${a}x} dx = -\\frac{x}{${a}}e^{-${a}x} + \\frac{1}{${a}} \\int e^{-${a}x} dx$$
5. $$= -\\frac{x}{${a}}e^{-${a}x} - \\frac{1}{${
            a * a
          }}e^{-${a}x} = -\\frac{e^{-${a}x}}{${a}}\\left(x + \\frac{1}{${a}}\\right)$$
6. **Evaluasi limit:** 
   - Batas atas (x → ∞): $$\\lim_{x \\to \\infty} \\left(-\\frac{e^{-${a}x}}{${a}}\\left(x + \\frac{1}{${a}}\\right)\\right) = 0$$
   - Batas bawah (x = 0): $$-\\frac{e^0}{${a}}\\left(0 + \\frac{1}{${a}}\\right) = -\\frac{1}{${
            a * a
          }}$$
7. **Hasil:** $$0 - \\left(-\\frac{1}{${a * a}}\\right) = \\frac{1}{${a * a}}$$
8. Jadi: $$\\int_0^{\\infty} ${coeff}xe^{-${a}x} dx = \\frac{${coeff}}{${
            a * a
          }}$$`;

          answer = Math.floor(coeff / (a * a));
          fullAnswer = `${coeff}/${a * a}`;
        } else if (impType === "polynomial_decay") {
          const a = getRandomInt(2, 5);
          const coeff = getRandomInt(1, 4);

          question = `Hitung integral tak wajar: $$\\int_1^{\\infty} \\frac{${coeff}}{x^2 + ${a}} dx$$`;

          steps = `Langkah penyelesaian:
1. **Uji konvergensi:** Untuk x → ∞, \\frac{1}{x^2 + ${a}} ~ \\frac{1}{x^2}, integral konvergen karena p = 2 > 1
2. **Substitusi trigonometri:** x = \\sqrt{${a}} \\tan(θ), dx = \\sqrt{${a}} \\sec^2(θ) dθ
3. **Transformasi integral:** x^2 + ${a} = ${a}\\tan^2(θ) + ${a} = ${a}\\sec^2(θ)
4. $$\\int \\frac{1}{x^2 + ${a}} dx = \\int \\frac{\\sqrt{${a}} \\sec^2(θ)}{${a}\\sec^2(θ)} dθ = \\frac{1}{\\sqrt{${a}}} \\int dθ = \\frac{θ}{\\sqrt{${a}}}$$
5. **Kembalikan ke x:** θ = \\arctan\\left(\\frac{x}{\\sqrt{${a}}}\\right)
6. $$\\int \\frac{1}{x^2 + ${a}} dx = \\frac{1}{\\sqrt{${a}}} \\arctan\\left(\\frac{x}{\\sqrt{${a}}}\\right)$$
7. **Evaluasi limit:**
   - Batas atas (x → ∞): $$\\lim_{x \\to \\infty} \\frac{1}{\\sqrt{${a}}} \\arctan\\left(\\frac{x}{\\sqrt{${a}}}\\right) = \\frac{1}{\\sqrt{${a}}} \\cdot \\frac{π}{2} = \\frac{π}{2\\sqrt{${a}}}$$
   - Batas bawah (x = 1): $$\\frac{1}{\\sqrt{${a}}} \\arctan\\left(\\frac{1}{\\sqrt{${a}}}\\right)$$
8. **Hasil:** $$\\frac{π}{2\\sqrt{${a}}} - \\frac{1}{\\sqrt{${a}}} \\arctan\\left(\\frac{1}{\\sqrt{${a}}}\\right)$$
9. Jadi: $$\\int_1^{\\infty} \\frac{${coeff}}{x^2 + ${a}} dx = \\frac{${coeff}}{\\sqrt{${a}}}\\left[\\frac{π}{2} - \\arctan\\left(\\frac{1}{\\sqrt{${a}}}\\right)\\right]$$`;

          const result =
            (coeff / Math.sqrt(a)) *
            (Math.PI / 2 - Math.atan(1 / Math.sqrt(a)));
          answer = Math.round(result * 1000) / 1000; // Round to 3 decimal places
          fullAnswer = `\\frac{${coeff}}{\\sqrt{${a}}}\\left[\\frac{π}{2} - \\arctan\\left(\\frac{1}{\\sqrt{${a}}}\\right)\\right]`;
        } else if (impType === "rational_decay") {
          const p = getRandomInt(2, 4);
          const coeff = getRandomInt(1, 3);

          question = `Hitung integral tak wajar: $$\\int_1^{\\infty} \\frac{${coeff}}{x^${p}} dx$$`;

          steps = `Langkah penyelesaian:
1. **Uji konvergensi:** Untuk p = ${p} > 1, integral $$\\int_1^{\\infty} \\frac{1}{x^p} dx$$ konvergen
2. **Ubah ke bentuk limit:** $$\\int_1^{\\infty} \\frac{${coeff}}{x^${p}} dx = \\lim_{b \\to \\infty} \\int_1^{b} \\frac{${coeff}}{x^${p}} dx = ${coeff} \\lim_{b \\to \\infty} \\int_1^{b} x^{-${p}} dx$$
3. **Antiturunan:** $$\\int x^{-${p}} dx = \\frac{x^{-${p}+1}}{-${p}+1} = \\frac{x^{${
            1 - p
          }}}{${1 - p}} = -\\frac{1}{${p - 1}}x^{-${p - 1}}$$
4. **Evaluasi integral:** - Batas atas (x → b): $$\\lim_{b \\to \\infty} \\left(-\\frac{1}{${
            p - 1
          }}b^{-${p - 1}}\\right) = 0$$
   - Batas bawah (x = 1): $$-\\frac{1}{${p - 1}} \\cdot 1^{-${
            p - 1
          }} = -\\frac{1}{${p - 1}}$$
5. **Hasil:** $$${coeff} \\times \\left[0 - \\left(-\\frac{1}{${
            p - 1
          }}\\right)\\right] = ${coeff} \\times \\frac{1}{${p - 1}}$$
6. **Jadi:** $$\\int_1^{\\infty} \\frac{${coeff}}{x^${p}} dx = \\frac{${coeff}}{${
            p - 1
          }}$$`;

          answer = Math.floor(coeff / (p - 1));
          fullAnswer = `${coeff}/${p - 1}`;
        }
      }
      break;
    case "nested_substitution_with_parts":
      {
        const coeff = getRandomInt(1, 3);

        qType = "Substitusi Bertingkat dengan Parsial";

        question = `Hitung integral tak tentu: $$\\int ${coeff}\\sin(\\ln x) dx$$`;

        steps = `Langkah penyelesaian:
1. **Substitusi pertama:** u = ln x → x = e^u, dx = e^u du
2. $$\\int ${coeff}\\sin(\\ln x) dx = ${coeff} \\int \\sin(u) e^u du$$
3. **Integral parsial untuk** $$\\int e^u \\sin u du$$:
4. **Metode sistematis:** Misalkan I = $$\\int e^u \\sin u du$$
5. **Langkah 1:** v₁ = sin u, dw₁ = e^u du → dv₁ = cos u du, w₁ = e^u
6. $$I = e^u \\sin u - \\int e^u \\cos u du$$
7. **Langkah 2:** v₂ = cos u, dw₂ = e^u du → dv₂ = -sin u du, w₂ = e^u  
8. $$\\int e^u \\cos u du = e^u \\cos u + \\int e^u \\sin u du = e^u \\cos u + I$$
9. **Substitusi:** $$I = e^u \\sin u - (e^u \\cos u + I)$$
10. $$2I = e^u(\\sin u - \\cos u)$$, jadi $$I = \\frac{1}{2}e^u(\\sin u - \\cos u)$$
11. **Substitusi balik:** $$\\int e^u \\sin u du = \\frac{1}{2}e^{\\ln x}(\\sin(\\ln x) - \\cos(\\ln x))$$
12. $$= \\frac{1}{2}x(\\sin(\\ln x) - \\cos(\\ln x))$$
13. Jadi: $$\\int ${coeff}\\sin(\\ln x) dx = \\frac{${coeff}}{2}x(\\sin(\\ln x) - \\cos(\\ln x)) + C$$`;

        answer = Math.floor(coeff / 2);
        fullAnswer = `(${coeff}/2)x(sin(ln x) - cos(ln x)) + C`;
      }
      break;
  }

  return {
    question,
    answer,
    steps,
    type: qType,
    fullAnswer,
  };
}
