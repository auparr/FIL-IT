export function generateEasyFunctionQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  const types = [
    "function_evaluation_linear",
    "function_evaluation_quadratic",
    "domain_range_linear",
    "function_operations",
    "function_composition",
  ];

  const type = getRandomElement(types);
  let question, answer, steps, qType;

  switch (type) {
    case "function_evaluation_linear":
      const a1 = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
      const b1 = getRandomInt(-10, 10);
      const c1 = getRandomInt(-5, 5);

      question = `Diketahui fungsi \\(f(x) = ${a1}x ${
        b1 >= 0 ? "+" : ""
      } ${b1}\\). Tentukan nilai \\(f(${c1})\\).`;
      answer = a1 * c1 + b1;
      steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:  
   \\[ f(x) = ${a1}x ${b1 >= 0 ? "+" : ""} ${b1} \\]  
2. Substitusi \\(x = ${c1}\\):  
   \\[ f(${c1}) = ${a1}(${c1}) ${b1 >= 0 ? "+" : ""} ${b1} \\]  
3. Hitung:  
   \\[ ${a1 * c1} ${b1 >= 0 ? "+" : ""} ${b1} = ${answer} \\]`;
      qType = "Evaluasi Fungsi Linear";
      break;

    case "function_evaluation_quadratic":
      const a2 = getRandomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
      const b2 = getRandomInt(-5, 5);
      const c2 = getRandomInt(-10, 10);
      const d2 = getRandomInt(-3, 3);

      question = `Diketahui fungsi \\(f(x) = ${a2}x^2 ${
        b2 >= 0 ? "+" : ""
      } ${b2}x ${c2 >= 0 ? "+" : ""} ${c2}\\). Tentukan nilai \\(f(${d2})\\).`;
      answer = a2 * d2 * d2 + b2 * d2 + c2;
      steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:  
   \\[ f(x) = ${a2}x^2 ${b2 >= 0 ? "+" : ""} ${b2}x ${
        c2 >= 0 ? "+" : ""
      } ${c2} \\]  
2. Substitusi \\(x = ${d2}\\):  
   \\[ f(${d2}) = ${a2}(${d2})^2 ${b2 >= 0 ? "+" : ""} ${b2}(${d2}) ${
        c2 >= 0 ? "+" : ""
      } ${c2} \\]  
3. Hitung kuadrat:  
   \\[ ${a2}(${d2 * d2}) ${b2 >= 0 ? "+" : ""} ${b2 * d2} ${
        c2 >= 0 ? "+" : ""
      } ${c2} \\]  
4. Hasil akhir:  
   \\[ ${a2 * d2 * d2} ${b2 >= 0 ? "+" : ""} ${b2 * d2} ${
        c2 >= 0 ? "+" : ""
      } ${c2} = ${answer} \\]`;
      qType = "Evaluasi Fungsi Kuadrat";
      break;

    case "domain_range_linear":
      const a3 = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
      const b3 = getRandomInt(-10, 10);
      const domainMin = getRandomInt(-5, 0);
      const domainMax = getRandomInt(1, 5);

      question = `Diketahui fungsi \\(f(x) = ${a3}x ${
        b3 >= 0 ? "+" : ""
      } ${b3}\\) dengan domain \\(${domainMin} \\leq x \\leq ${domainMax}\\). Tentukan range minimum dari fungsi tersebut.`;

      const fMin = a3 * domainMin + b3;
      const fMax = a3 * domainMax + b3;
      answer = a3 > 0 ? fMin : fMax;

      steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:  
   \\[ f(x) = ${a3}x ${b3 >= 0 ? "+" : ""} ${b3} \\]  
2. Domain:  
   \\[ ${domainMin} \\leq x \\leq ${domainMax} \\]  
3. Nilai ekstrem terjadi di ujung domain.  
   \\[ f(${domainMin}) = ${a3}(${domainMin}) ${
        b3 >= 0 ? "+" : ""
      } ${b3} = ${fMin} \\]  
   \\[ f(${domainMax}) = ${a3}(${domainMax}) ${
        b3 >= 0 ? "+" : ""
      } ${b3} = ${fMax} \\]  
4. Karena fungsi ${a3 > 0 ? "naik" : "turun"}:  
   - Nilai minimum = ${Math.min(fMin, fMax)}  
   - Nilai maksimum = ${Math.max(fMin, fMax)}  
5. Jadi range:  
   \\[ ${Math.min(fMin, fMax)} \\leq f(x) \\leq ${Math.max(fMin, fMax)} \\]`;
      qType = "Domain dan Range";
      break;

    case "function_operations":
      const opType = getRandomElement(["+", "-", "*"]);
      const a4 = getRandomInt(1, 5);
      const b4 = getRandomInt(-10, 10);
      const c4 = getRandomInt(1, 5);
      const d4 = getRandomInt(-10, 10);
      const x4 = getRandomInt(-3, 3);

      let opSymbol, opName;
      switch (opType) {
        case "+":
          opSymbol = "+";
          opName = "penjumlahan";
          answer = a4 * x4 + b4 + (c4 * x4 + d4);
          break;
        case "-":
          opSymbol = "-";
          opName = "pengurangan";
          answer = a4 * x4 + b4 - (c4 * x4 + d4);
          break;
        case "*":
          opSymbol = "\\times";
          opName = "perkalian";
          answer = (a4 * x4 + b4) * (c4 * x4 + d4);
          break;
      }

      question = `Diketahui \\(f(x) = ${a4}x ${
        b4 >= 0 ? "+" : ""
      } ${b4}\\) dan \\(g(x) = ${c4}x ${
        d4 >= 0 ? "+" : ""
      } ${d4}\\). Tentukan nilai \\((f ${opSymbol} g)(${x4})\\).`;
      steps = `Langkah penyelesaian:
1. Fungsi f:  
   \\[ f(x) = ${a4}x ${b4 >= 0 ? "+" : ""} ${b4} \\]  
2. Fungsi g:  
   \\[ g(x) = ${c4}x ${d4 >= 0 ? "+" : ""} ${d4} \\]  
3. Operasi ${opName}:  
   \\[ (f ${opSymbol} g)(x) = f(x) ${opSymbol} g(x) \\]  
4. Untuk \\(x = ${x4}\\):  
   \\[ f(${x4}) = ${a4}(${x4}) ${b4 >= 0 ? "+" : ""} ${b4} = ${
        a4 * x4 + b4
      } \\]  
   \\[ g(${x4}) = ${c4}(${x4}) ${d4 >= 0 ? "+" : ""} ${d4} = ${
        c4 * x4 + d4
      } \\]  
5. Hasil operasi:  
   \\[ ${a4 * x4 + b4} ${opSymbol} ${c4 * x4 + d4} = ${answer} \\]`;
      qType = "Operasi Fungsi";
      break;

    case "function_composition":
      const compType = getRandomElement(["fog", "gof"]);
      const a5 = getRandomInt(1, 5);
      const b5 = getRandomInt(-10, 10);
      const c5 = getRandomInt(1, 5);
      const d5 = getRandomInt(-10, 10);
      const x5 = getRandomInt(-3, 3);

      if (compType === "fog") {
        question = `Diketahui \\(f(x) = ${a5}x ${
          b5 >= 0 ? "+" : ""
        } ${b5}\\) dan \\(g(x) = ${c5}x ${
          d5 >= 0 ? "+" : ""
        } ${d5}\\). Tentukan nilai \\((f \\circ g)(${x5})\\).`;
        answer = a5 * (c5 * x5 + d5) + b5;
        steps = `Langkah penyelesaian:
1. Fungsi f:  
   \\[ f(x) = ${a5}x ${b5 >= 0 ? "+" : ""} ${b5} \\]  
2. Fungsi g:  
   \\[ g(x) = ${c5}x ${d5 >= 0 ? "+" : ""} ${d5} \\]  
3. Komposisi:  
   \\[ (f \\circ g)(x) = f(g(x)) \\]  
4. Hitung:  
   \\[ g(${x5}) = ${c5}(${x5}) ${d5 >= 0 ? "+" : ""} ${d5} = ${
          c5 * x5 + d5
        } \\]  
5. Substitusi ke f:  
   \\[ f(g(${x5})) = ${a5}(${c5 * x5 + d5}) ${b5 >= 0 ? "+" : ""} ${b5} \\]  
6. Hasil akhir:  
   \\[ ${a5 * (c5 * x5 + d5)} ${b5 >= 0 ? "+" : ""} ${b5} = ${answer} \\]`;
      } else {
        question = `Diketahui \\(f(x) = ${a5}x ${
          b5 >= 0 ? "+" : ""
        } ${b5}\\) dan \\(g(x) = ${c5}x ${
          d5 >= 0 ? "+" : ""
        } ${d5}\\). Tentukan nilai \\((g \\circ f)(${x5})\\).`;
        answer = c5 * (a5 * x5 + b5) + d5;
        steps = `Langkah penyelesaian:
1. Fungsi f:  
   \\[ f(x) = ${a5}x ${b5 >= 0 ? "+" : ""} ${b5} \\]  
2. Fungsi g:  
   \\[ g(x) = ${c5}x ${d5 >= 0 ? "+" : ""} ${d5} \\]  
3. Komposisi:  
   \\[ (g \\circ f)(x) = g(f(x)) \\]  
4. Hitung:  
   \\[ f(${x5}) = ${a5}(${x5}) ${b5 >= 0 ? "+" : ""} ${b5} = ${
          a5 * x5 + b5
        } \\]  
5. Substitusi ke g:  
   \\[ g(f(${x5})) = ${c5}(${a5 * x5 + b5}) ${d5 >= 0 ? "+" : ""} ${d5} \\]  
6. Hasil akhir:  
   \\[ ${c5 * (a5 * x5 + b5)} ${d5 >= 0 ? "+" : ""} ${d5} = ${answer} \\]`;
      }
      qType = "Komposisi Fungsi";
      break;
  }

  return { question, answer, steps, type: qType };
}
