export function generateIndeterminateFormQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const questionType = getRandomInt(0, 1);
  const xValue = getRandomInt(1, 15);

  let question, answer, steps;

  if (questionType === 0) {
    // Faktorisasi
    const a = xValue;
    const b = getRandomInt(1, 15) * (Math.random() > 0.5 ? 1 : -1);
    const useSimpleForm = Math.random() > 0.5;

    if (useSimpleForm) {
      question = `\\[\\lim_{x \\to ${a}} \\frac{x^2 - ${a * a}}{x - ${a}}\\]`;
      answer = 2 * a;
      steps = `Langkah penyelesaian:
1. Substitusi \\(x = ${a}\\):
   \\[\\frac{${a}^2 - ${a * a}}{${a} - ${a}} = \\frac{${a * a} - ${
        a * a
      }}{0} = \\frac{0}{0}\\] 
   → bentuk tak tentu.
2. Faktorkan pembilang: 
   \\[x^2 - ${a * a} = (x - ${a})(x + ${a})\\]
3. Sederhanakan:
   \\[\\frac{(x - ${a})(x + ${a})}{x - ${a}} = x + ${a}\\]
4. Substitusi \\(x=${a}\\):
   \\[${a} + ${a} = ${2 * a}\\]`;
    } else {
      const c = a + b;
      question = `\\[\\lim_{x \\to ${a}} \\frac{x^2 - ${a + c}x + ${
        a * c
      }}{x - ${a}}\\]`;
      answer = a - c;
      steps = `Langkah penyelesaian:
1. Substitusi \\(x=${a}\\):
   \\[\\frac{${a}^2 - (${a + c})(${a}) + ${a * c}}{${a} - ${a}} = \\frac{${
        a * a
      } - ${a * (a + c)} + ${a * c}}{0} = \\frac{0}{0}\\] 
   → bentuk tak tentu.
2. Faktorkan pembilang:
   \\[x^2 - ${a + c}x + ${a * c} = (x - ${a})(x - ${c})\\]
3. Sederhanakan:
   \\[\\frac{(x - ${a})(x - ${c})}{x - ${a}} = x - ${c}\\]
4. Substitusi \\(x=${a}\\):
   \\[${a} - ${c} = ${a - c}\\]`;
    }
  } else {
    // Rasionalisasi
    const k = getRandomInt(1, 15);
    const m = k * k;

    question = `\\[\\lim_{x \\to ${m}} \\frac{x - ${m}}{\\sqrt{x} - ${k}}\\]`;
    answer = 2 * k;

    steps = `Langkah penyelesaian:
1. Substitusi \\(x=${m}\\):
   \\[\\frac{${m} - ${m}}{\\sqrt{${m}} - ${k}} = \\frac{0}{0}\\] 
   → bentuk tak tentu.
2. Rasionalisasi penyebut: kalikan pembilang dan penyebut dengan \\(\\sqrt{x} + ${k}\\).
3. Hasil:
   \\[\\frac{(x - ${m})(\\sqrt{x} + ${k})}{(\\sqrt{x} - ${k})(\\sqrt{x} + ${k})} = \\frac{(x - ${m})(\\sqrt{x} + ${k})}{x - ${m}}\\]
4. Sederhanakan:
   \\[\\sqrt{x} + ${k}\\]
5. Substitusi \\(x=${m}\\):
   \\[\\sqrt{${m}} + ${k} = ${k} + ${k} = ${2 * k}\\]`;
  }

  return { question, answer, steps };
}
