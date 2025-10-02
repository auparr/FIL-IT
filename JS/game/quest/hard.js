function hardQuestionGenerator() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function generateHardLimitQuestion() {
    const questionCategory = Math.random() > 0.5 ? "trigonometric" : "infinity";

    if (questionCategory === "trigonometric") {
      const types = [
        "sin_simple", // lim sin(ax)/(bx) dengan a/b bulat
        "sin_composite", // lim sin(ax)/sin(bx) dengan a/b bulat
        "tan_simple", // lim tan(ax)/(bx) dengan a/b bulat
        "cos_special", // lim (1-cos(ax))/(bx^2) dengan a^2/(2b) bulat
        "trig_identity", // lim (sin(ax)-sin(bx))/(cx) dengan identitas trigonometri
      ];

      const type = getRandomElement(types);
      let question, answer, steps;

      switch (type) {
        case "sin_simple":
          const a1 = getRandomInt(1, 4);
          const b1 = getRandomInt(1, 4);
          // Pastikan a1/b1 bulat
          const multiplier1 = getRandomInt(1, 3);
          const a = multiplier1 * b1;

          question = `\\[\\lim_{x \\to 0} \\frac{\\sin(${a}x)}{${b1}x}\\]`;
          answer = a / b1;

          break;

        case "sin_composite":
          const a2 = getRandomInt(1, 4);
          const b2 = getRandomInt(1, 4);
          // Pastikan a2/b2 bulat
          const multiplier2 = getRandomInt(1, 3);
          const a_val = multiplier2 * b2;

          question = `\\[\\lim_{x \\to 0} \\frac{\\sin(${a_val}x)}{\\sin(${b2}x)}\\]`;
          answer = a_val / b2;
          break;

        case "tan_simple":
          const a3 = getRandomInt(1, 4);
          const b3 = getRandomInt(1, 4);
          // Pastikan a3/b3 bulat
          const multiplier3 = getRandomInt(1, 3);
          const a_tan = multiplier3 * b3;

          question = `\\[\\lim_{x \\to 0} \\frac{\\tan(${a_tan}x)}{${b3}x}\\]`;
          answer = a_tan / b3;

          break;

        case "cos_special":
          const a4 = getRandomInt(1, 3);
          const b4 = getRandomInt(1, 3);
          // Pastikan a4^2/(2b4) bulat
          const multiplier4 = getRandomInt(1, 2);
          const a_cos = multiplier4;
          const b_cos = (a_cos * a_cos) / 2; // Agar hasilnya bulat

          question = `\\[\\lim_{x \\to 0} \\frac{1 - \\cos(${a_cos}x)}{${b_cos}x^2}\\]`;
          answer = (a_cos * a_cos) / (2 * b_cos);
          break;

        case "trig_identity":
          const a5 = getRandomInt(2, 8);
          const b5 = getRandomInt(1, a5 - 1);

          // hitung selisih
          const diff = a5 - b5;

          // cari semua pembagi positif diff
          function divisors(n) {
            const list = [];
            for (let i = 1; i <= n; i++) {
              if (n % i === 0) list.push(i);
            }
            return list;
          }

          // pilih c5 secara acak dari daftar pembagi
          const c5 = getRandomElement(divisors(diff));

          question = `\\[\\lim_{x\\to 0} \\frac{\\sin(${a5}x) - \\sin(${b5}x)}{${c5}x}\\]`;
          answer = diff / c5; // dijamin bilangan bulat
          break;
      }
      return { question, answer };
    } else {
      const types = [
        "rational_same_degree", // Fungsi rasional dengan derajat sama
        "sqrt_rational", // Bentuk akar dengan fungsi rasional
        "rational_nested", // Fungsi rasional dalam akar
      ];

      const type = getRandomElement(types);
      let question, answer, steps;

      switch (type) {
        case "rational_same_degree":
          const a1 = getRandomInt(1, 5);
          const b1 = getRandomInt(1, 5);
          // Pastikan a1/b1 bulat
          const multiplier1 = getRandomInt(1, 3);
          const a = multiplier1 * b1;

          const c1 = getRandomInt(1, 5);
          const d1 = getRandomInt(1, 5);
          const e1 = getRandomInt(1, 5);
          const f1 = getRandomInt(1, 5);

          question = `\\[\\lim_{x \\to \\infty} \\frac{${a}x^2 + ${c1}x + ${e1}}{${b1}x^2 + ${d1}x + ${f1}}\\]`;
          answer = a / b1;
          break;

        case "sqrt_rational":
          const a3 = getRandomInt(1, 3);
          const b3 = getRandomInt(1, 3);
          // Pastikan √a3 - √b3 bulat
          // Pilih a3 dan b3 yang merupakan kuadrat sempurna
          const sqrt_a = getRandomInt(2, 3);
          const sqrt_b = getRandomInt(1, 2);
          const a_sqrt = sqrt_a * sqrt_a;
          const b_sqrt = sqrt_b * sqrt_b;

          const c3 = getRandomInt(1, 5);
          const d3 = getRandomInt(1, 5);
          const e3 = getRandomInt(1, 5);
          const f3 = getRandomInt(1, 5);

          question = `\\[\\lim_{x \\to \\infty} \\left(\\sqrt{${a_sqrt}x^2 + ${c3}x + ${e3}} - \\sqrt{${b_sqrt}x^2 + ${d3}x + ${f3}}\\right)\\]`;
          answer = sqrt_a - sqrt_b;
          break;

        case "rational_nested":
          const a4 = getRandomInt(1, 3);
          const b4 = getRandomInt(1, 3);
          // Pastikan √(a4/b4) bulat
          const multiplier4 = getRandomInt(1, 2);
          const a_nested = multiplier4 * multiplier4 * b4;

          const c4 = getRandomInt(1, 5);
          const d4 = getRandomInt(1, 5);
          const e4 = getRandomInt(1, 5);
          const f4 = getRandomInt(1, 5);

          question = `\\[\\lim_{x \\to \\infty} \\sqrt{\\frac{${a_nested}x^2 + ${c4}x + ${e4}}{${b4}x^2 + ${d4}x + ${f4}}}\\]`;
          answer = multiplier4;
          break;
      }
      return { question, answer };
    }
  }

  function generateHardFunctionQuestion() {
    const types = [
      "exponential", // Fungsi eksponen
      "logarithmic", // Fungsi logaritma
      "trigonometric", // Fungsi trigodnometri
      "functional_properties", // Sifat fungsi
      "transformations", // Transformasi grafik/
      "functional_equations", // Persamaan fungsionalds
    ];
    const type = getRandomElement(types);
    let question, answer, steps;

    switch (type) {
      case "exponential":
        // Soal fungsi eksponen
        const base = getRandomElement([2, 3, 4, 5, 6]);
        // Batasi expCoeff agar perhitungan xVal lebih sederhana
        const expCoeff = getRandomInt(1, 5);
        const expConst = getRandomInt(-4, 6);
        const multiplier = getRandomInt(1, 5);
        const addConst = getRandomInt(-6, 8);

        let xVal;
        let exponent;

        // --- Logika BARU untuk menjamin Jawaban Bulat ---
        // 1. Pilih 'exponent' non-negatif
        // 2. Hitung 'xVal' yang dijamin bilangan bulat
        while (true) {
          // Pilih eksponen yang kecil (misal 0 sampai 4) untuk menjaga soal tetap sederhana
          exponent = getRandomInt(0, 4);

          // Cari pembilang: (exponent - expConst)
          const numerator = exponent - expConst;

          // Cek apakah numerator habis dibagi oleh expCoeff
          if (numerator % expCoeff === 0) {
            xVal = numerator / expCoeff;
            // Opsi: Batasi xVal agar bernilai kecil (e.g., dalam [-5, 5])
            if (Math.abs(xVal) <= 5) {
              break;
            }
          }
        }
        // --- Akhir Logika BARU ---

        question = `Diketahui fungsi \\(f(x) = ${multiplier} \\cdot ${base}^{${expCoeff}x ${
          expConst >= 0 ? "+" : ""
        }${expConst}} ${
          addConst >= 0 ? "+" : ""
        }${addConst}\\). Tentukan nilai \\(f(${xVal})\\).`;

        // 'exponent' dijamin non-negatif, sehingga Math.pow akan menghasilkan bilangan bulat
        answer = multiplier * Math.pow(base, exponent) + addConst;
        break;

      case "logarithmic":
        const getRandomLogQuestion = () => {
          const logBase = getRandomElement([2, 3, 5, 10]);
          const argCoeff = getRandomInt(1, 5);
          const argConst = getRandomInt(1, 8); // gunakan positif agar aman
          const logMultiplier = getRandomInt(1, 5);
          const logAddConst = getRandomInt(-8, 8);
          const power = getRandomInt(1, 5);

          // coba cari x yang membuat argumen log = base^power
          let logXVal = (Math.pow(logBase, power) - argConst) / argCoeff;
          if (Number.isInteger(logXVal) && logXVal > -(argConst / argCoeff)) {
            return {
              question: `Diketahui fungsi \\(f(x) = ${logMultiplier}\\cdot\\log_{${logBase}}(${argCoeff}x + ${argConst}) ${
                logAddConst >= 0 ? "+" : ""
              }${logAddConst}\\). Tentukan nilai \\(f(${logXVal})\\).`,
              answer: logMultiplier * power + logAddConst,
            };
          }

          // fallback: cari x sehingga argumen = 1
          logXVal = (1 - argConst) / argCoeff;
          if (Number.isInteger(logXVal) && logXVal > -(argConst / argCoeff)) {
            return {
              question: `Diketahui fungsi \\(f(x) = ${logMultiplier}\\cdot\\log_{${logBase}}(${argCoeff}x + ${argConst}) ${
                logAddConst >= 0 ? "+" : ""
              }${logAddConst}\\). Tentukan nilai \\(f(${logXVal})\\).`,
              answer: logAddConst,
            };
          }

          // jika semua gagal, return null untuk retry
          return null;
        };

        // loop untuk memastikan selalu ada soal valid
        let generated = null;
        let attempts = 0;
        while (!generated && attempts < 20) {
          generated = getRandomLogQuestion();
          attempts++;
        }

        if (!generated) {
          // fallback terakhir (soal tetap muncul)
          generated = {
            question: "Diketahui fungsi f(x)=log_2(x+1). Tentukan nilai f(3).",
            answer: 2,
          };
        }

        question = generated.question;
        answer = generated.answer;
        break;

      // Replace the entire "trigonometric" case in hard.js (around line 340-420)

      case "trigonometric":
        // Soal fungsi trigonometri dengan sudut istimewa - HANYA NILAI INTEGER
        const trigFunc = getRandomElement(["sin", "cos", "tan"]);
        const trigCoeff = getRandomInt(1, 2);
        let angle;
        let trigValue;

        // Daftar sudut istimewa - HANYA yang menghasilkan -1, 0, atau 1
        const integerAngles = [
          { angle: 0, sin: 0, cos: 1, tan: 0 },
          { angle: 90, sin: 1, cos: 0, tan: undefined },
          { angle: 180, sin: 0, cos: -1, tan: 0 },
          { angle: 270, sin: -1, cos: 0, tan: undefined },
          { angle: 360, sin: 0, cos: 1, tan: 0 },
        ];

        // Tambahkan sudut untuk tan yang valid (45, 135, 225, 315)
        const tanAngles = [
          { angle: 45, sin: Math.sqrt(2) / 2, cos: Math.sqrt(2) / 2, tan: 1 },
          {
            angle: 135,
            sin: Math.sqrt(2) / 2,
            cos: -Math.sqrt(2) / 2,
            tan: -1,
          },
          {
            angle: 225,
            sin: -Math.sqrt(2) / 2,
            cos: -Math.sqrt(2) / 2,
            tan: 1,
          },
          {
            angle: 315,
            sin: -Math.sqrt(2) / 2,
            cos: Math.sqrt(2) / 2,
            tan: -1,
          },
        ];

        // Filter sudut berdasarkan fungsi trigonometri
        let suitableAngles;

        if (trigFunc === "sin") {
          // Hanya sudut dengan sin = -1, 0, atau 1
          suitableAngles = integerAngles.filter(
            (a) => a.sin === 0 || a.sin === 1 || a.sin === -1
          );
        } else if (trigFunc === "cos") {
          // Hanya sudut dengan cos = -1, 0, atau 1
          suitableAngles = integerAngles.filter(
            (a) => a.cos === 0 || a.cos === 1 || a.cos === -1
          );
        } else if (trigFunc === "tan") {
          // Hanya sudut dengan tan = -1, 0, atau 1
          suitableAngles = [
            ...integerAngles.filter((a) => a.tan === 0),
            ...tanAngles.filter((a) => a.tan === 1 || a.tan === -1),
          ];
        }

        // Filter lebih lanjut: angle harus habis dibagi trigCoeff
        suitableAngles = suitableAngles.filter(
          (a) => a.angle % trigCoeff === 0
        );

        // Jika tidak ada yang cocok, paksa trigCoeff = 1
        if (suitableAngles.length === 0) {
          const newTrigCoeff = 1;
          if (trigFunc === "sin") {
            suitableAngles = integerAngles.filter(
              (a) =>
                (a.sin === 0 || a.sin === 1 || a.sin === -1) &&
                a.angle % newTrigCoeff === 0
            );
          } else if (trigFunc === "cos") {
            suitableAngles = integerAngles.filter(
              (a) =>
                (a.cos === 0 || a.cos === 1 || a.cos === -1) &&
                a.angle % newTrigCoeff === 0
            );
          } else {
            suitableAngles = [
              ...integerAngles.filter(
                (a) => a.tan === 0 && a.angle % newTrigCoeff === 0
              ),
              ...tanAngles.filter(
                (a) =>
                  (a.tan === 1 || a.tan === -1) && a.angle % newTrigCoeff === 0
              ),
            ];
          }
        }

        // Pilih sudut secara acak
        const selectedAngle = getRandomElement(suitableAngles);
        angle = selectedAngle.angle;

        // Tentukan nilai trigonometri
        switch (trigFunc) {
          case "sin":
            trigValue = selectedAngle.sin;
            break;
          case "cos":
            trigValue = selectedAngle.cos;
            break;
          case "tan":
            trigValue = selectedAngle.tan;
            break;
        }

        // PENTING: Multiplier yang menjamin hasil integer
        // Karena trigValue sekarang HANYA -1, 0, atau 1, maka multiplier bebas
        const trigMultiplier = getRandomInt(1, 10);
        const trigAddConst = getRandomInt(-10, 10);

        // Hitung x (dijamin integer karena angle % trigCoeff === 0)
        const x = angle / trigCoeff;

        // Buat soal
        question = `Diketahui fungsi \\(f(x) = ${trigMultiplier} \\cdot \\${trigFunc}(${trigCoeff}x^\\circ) ${
          trigAddConst >= 0 ? "+" : ""
        }${trigAddConst}\\). Tentukan nilai \\(f(${x})\\).`;

        // Hitung jawaban - DIJAMIN INTEGER
        answer = Math.round(trigMultiplier * trigValue + trigAddConst);

        break;
      case "functional_properties":
        // Soal sifat fungsi (ganjil/genap/periodik) dengan jawaban selalu integer
        const propertyType = getRandomElement(["odd", "even", "periodic"]);

        switch (propertyType) {
          case "odd":
            // Fungsi ganjil: f(-x) = -f(x)
            const oddTerms = [];
            const numOddTerms = getRandomInt(1, 3); // 1-3 suku

            for (let i = 0; i < numOddTerms; i++) {
              const coeff = getRandomInt(1, 5);
              const power = getRandomElement([1, 3, 5, 7]); // Pangkat ganjil lebih variatif
              oddTerms.push({ coeff, power });
            }

            const oddXVal = getRandomInt(1, 10); // Range lebih besar
            let oddFunction = oddTerms
              .map((term) => `${term.coeff}x^{${term.power}}`)
              .join(" + ");

            question = `Diketahui fungsi ganjil \\(f(x) = ${oddFunction}\\). Tentukan nilai \\(f(-${oddXVal}) + f(${oddXVal})\\).`;
            answer = 0;

            break;

          case "even":
            // Fungsi genap: f(-x) = f(x)
            const evenTerms = [];
            const numEvenTerms = getRandomInt(1, 3); // 1-3 suku

            for (let i = 0; i < numEvenTerms; i++) {
              const coeff = getRandomInt(1, 5);
              const power = getRandomElement([2, 4, 6, 8]); // Pangkat genap lebih variatif
              evenTerms.push({ coeff, power });
            }

            // Tambahkan konstanta untuk variasi (fungsi genap boleh ada konstanta)
            const constant = getRandomInt(-5, 5);
            let evenFunction = evenTerms
              .map((term) => `${term.coeff}x^{${term.power}}`)
              .join(" + ");
            if (constant !== 0) {
              evenFunction +=
                constant > 0 ? ` + ${constant}` : ` - ${Math.abs(constant)}`;
            }

            const evenXVal = getRandomInt(1, 10); // Range lebih besar

            question = `Diketahui fungsi genap \\(f(x) = ${evenFunction}\\). Tentukan nilai \\(f(-${evenXVal}) - f(${evenXVal})\\).`;
            answer = 0;

            break;

          case "periodic":
            // Fungsi periodik dengan jawaban integer
            const periodicTypes = [
              {
                func: "sin",
                period: "2\\pi",
                values: { 0: 0, "\\pi/2": 1, "\\pi": 0, "3\\pi/2": -1 },
              },
              {
                func: "cos",
                period: "2\\pi",
                values: { 0: 1, "\\pi/2": 0, "\\pi": -1, "3\\pi/2": 0 },
              },
              {
                func: "tan",
                period: "\\pi",
                values: { 0: 0, "\\pi/4": 1, "3\\pi/4": -1 },
              },
            ];

            const selectedType = getRandomElement(periodicTypes);
            const points = Object.keys(selectedType.values);
            const selectedPoint = getRandomElement(points);
            const funcValue = selectedType.values[selectedPoint];

            // Koefisien untuk memastikan jawaban integer
            const periodicCoeff = getRandomInt(1, 10);
            const periodicConst = getRandomInt(-10, 10);

            // Pilih operasi: f(x) + f(x+T) atau f(x) - f(x+T)
            const operations = [
              {
                symbol: "+",
                result: 2 * periodicCoeff * funcValue + 2 * periodicConst,
              },
              { symbol: "-", result: 0 },
            ];
            const selectedOp = getRandomElement(operations);

            question = `Diketahui fungsi periodik \\(f(x) = ${periodicCoeff} \\cdot ${
              selectedType.func
            }(x) ${
              periodicConst >= 0 ? "+" : ""
            }${periodicConst}\\) dengan periode \\(${
              selectedType.period
            }\\). Tentukan nilai \\(f(${selectedPoint}) ${
              selectedOp.symbol
            } f(${selectedPoint} + ${selectedType.period})\\).`;
            answer = selectedOp.result;
            break;
        }
        break;

      case "transformations":
        // Soal transformasi grafik fungsi dengan jawaban selalu integer
        const transformType = getRandomElement([
          "translation",
          "reflection",
          "scaling",
          "combination",
        ]);

        // Fungsi dasar yang menghasilkan nilai integer
        const baseFunctions = [
          {
            type: "exp",
            func: "2^x",
            eval: (x) => Math.pow(2, x),
            domain: [0, 5], // x ≥ 0 untuk hasil integer
          },
          {
            type: "abs",
            func: "|x|",
            eval: (x) => Math.abs(x),
            domain: [-5, 5],
          },
          {
            type: "square",
            func: "x^2",
            eval: (x) => Math.pow(x, 2),
            domain: [-5, 5],
          },
        ];

        const selectedFunc = getRandomElement(baseFunctions);

        // HAPUS REDEKLARASI: let question, answer, steps;
        // Variabel question, answer, dan steps dari scope luar akan digunakan di sini

        switch (transformType) {
          case "translation":
            // Pergeseran grafik dengan jaminan hasil integer
            const h = getRandomInt(-2, 2);
            const k = getRandomInt(-3, 3);

            // Pilih x yang sesuai dengan domain fungsi
            let xValTrans;
            if (selectedFunc.type === "exp") {
              xValTrans = getRandomInt(Math.max(0, -h), 5); // Pastikan x-h ≥ 0
            } else {
              xValTrans = getRandomInt(-3, 3);
            }

            const newX = xValTrans - h;
            const funcValue = selectedFunc.eval(newX);
            answer = funcValue + k; // Menggunakan 'answer' dari scope luar

            question = `Diketahui fungsi \\(f(x) = ${
              selectedFunc.func
            }\\). Jika grafik fungsi ini digeser ${
              h > 0 ? "ke kanan" : h < 0 ? "ke kiri" : ""
            } ${h !== 0 ? `sejauh ${Math.abs(h)} satuan` : ""}${
              h !== 0 && k !== 0 ? " dan " : ""
            }${k > 0 ? "ke atas" : k < 0 ? "ke bawah" : ""}${
              k !== 0 ? ` sejauh ${Math.abs(k)} satuan` : ""
            }, tentukan nilai fungsi hasil transformasi di \\(x = ${xValTrans}\\).`; // Menggunakan 'question' dari scope luar

            break;

          case "reflection":
            // Pencerminan grafik
            const axis = getRandomElement(["x", "y"]);
            let xValRef;

            if (selectedFunc.type === "exp") {
              xValRef = getRandomInt(0, 4); // x ≥ 0 untuk eksponensial
            } else {
              xValRef = getRandomInt(-4, 4);
            }

            let reflectionValue;
            if (axis === "x") {
              reflectionValue = -selectedFunc.eval(xValRef);
            } else {
              // Evaluasi f(-xValRef)
              // Keterbatasan: Jika f(x) = 2^x, maka f(-x) = 2^-x. Jika xValRef > 0, hasilnya pecahan.
              // Solusi: kita hanya gunakan f(x) = |x| atau x^2 di sini.
              // ATAU Pastikan xValRef = 0 untuk f(x)=2^x.

              // Perbaikan untuk memastikan jawaban integer pada refleksi sumbu-y untuk 2^x:
              if (selectedFunc.type === "exp") {
                // Paksa xValRef=0 agar f(-x) = f(0) = 2^0 = 1
                xValRef = 0;
              }
              reflectionValue = selectedFunc.eval(-xValRef);
            }
            answer = reflectionValue;

            question = `Diketahui fungsi \\(f(x) = ${selectedFunc.func}\\). Jika grafik fungsi ini dicerminkan terhadap sumbu-${axis}, tentukan nilai fungsi hasil transformasi di \\(x = ${xValRef}\\).`;

            break;

          case "scaling":
            // Peregangan/penyusutan grafik
            const a = getRandomElement([1, 2, 3, -1, -2, -3]); // Faktor vertikal
            // Perbaikan: Hapus faktor 0.5 karena akan menghasilkan nilai x non-integer untuk f(x)
            const b = getRandomElement([1, 2, 3]); // Faktor horizontal

            let xValScale;
            if (selectedFunc.type === "exp") {
              // x harus integer dan b*x ≥ 0
              xValScale = getRandomInt(0, 3);
            } else {
              xValScale = getRandomInt(-3, 3);
            }

            const scaledX = b * xValScale;
            const scaleFuncValue = selectedFunc.eval(scaledX);
            answer = a * scaleFuncValue;

            question = `Diketahui fungsi \\(f(x) = ${selectedFunc.func}\\). Jika grafik fungsi ini diregangkan secara vertikal dengan faktor ${a} dan secara horizontal dengan faktor \\(\\frac{1}{${b}}\\), tentukan nilai fungsi hasil transformasi di \\(x = ${xValScale}\\).`;

            break;

          case "combination":
            // Kombinasi transformasi
            const transH = getRandomInt(-1, 1);
            const transK = getRandomInt(-2, 2);
            const transA = getRandomElement([1, 2, -1, -2]);

            let xValComb;
            if (selectedFunc.type === "exp") {
              xValComb = getRandomInt(Math.max(0, -transH), 3);
            } else {
              xValComb = getRandomInt(-2, 2);
            }

            const combNewX = xValComb - transH;
            const combFuncValue = selectedFunc.eval(combNewX);
            answer = transA * combFuncValue + transK;

            question = `Diketahui fungsi \\(f(x) = ${selectedFunc.func}\\). Jika grafik fungsi ini digeser horizontal sejauh ${transH} satuan, vertikal sejauh ${transK} satuan, dan diregangkan vertikal dengan faktor ${transA}, tentukan nilai fungsi hasil transformasi di \\(x = ${xValComb}\\).`;

            break;
        }
        break;

      case "functional_equations":
        // Soal persamaan fungsional
        const eqType = getRandomElement(["linear", "exponential"]);

        switch (eqType) {
          case "linear":
            // Persamaan fungsional linear: f(x+y) = f(x) + f(y)
            const linearX = getRandomInt(1, 10);
            const linearY = getRandomInt(1, 10);

            question = `Diketahui fungsi \\(f\\) memenuhi persamaan \\(f(x+y) = f(x) + f(y)\\) untuk semua bilangan real x dan y. Jika \\(f(1) = 3\\), tentukan nilai \\(f(${
              linearX + linearY
            })\\).`;
            answer = 3 * (linearX + linearY);

            break;

          case "exponential":
            // Persamaan fungsional eksponensial: f(x+y) = f(x)f(y)
            const expX = getRandomInt(1, 3);
            const expY = getRandomInt(1, 3);
            const baseValue = getRandomInt(2, 5);

            question = `Diketahui fungsi \\(f\\) memenuhi persamaan \\(f(x+y) = f(x) \\cdot f(y)\\) untuk semua bilangan real x dan y. Jika \\(f(1) = ${baseValue}\\), tentukan nilai \\(f(${
              expX + expY
            })\\).`;
            answer = Math.pow(baseValue, expX + expY);

            break;
        }
        break;
    }
    return { question, answer };
  }

  const generators = [generateHardLimitQuestion, generateHardFunctionQuestion];
  const chosenGenerator =
    generators[Math.floor(Math.random() * generators.length)];

  return chosenGenerator();
}
