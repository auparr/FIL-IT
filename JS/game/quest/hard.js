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

  function generateHardDerivativeQuestion() {
    const types = [
      "implicit_differentiation", // Turunan implisit
      "exponential_derivative", // Turunan eksponensial
      "logarithmic_derivative", // Turunan logaritma
      "advanced_trig", // Turunan tan, sec, csc, cot
      "higher_order_derivative", // Turunan tingkat tinggi
    ];

    const type = getRandomElement(types);
    let question, answer, steps, qType;

    switch (type) {
      case "implicit_differentiation":
        // Turunan implisit: x^2 + y^2 = r^2 atau x^2 + xy + y^2 = k
        const subtype = getRandomElement(["circle", "ellipse", "mixed"]);

        if (subtype === "circle") {
          // x^2 + y^2 = r^2, cari dy/dx di titik (x0, y0)
          const r = getRandomInt(3, 7);
          const rSquared = r * r;

          // Pilih titik (x0, y0) pada lingkaran
          const x0 = getRandomInt(1, r - 1);
          const y0Squared = rSquared - x0 * x0;
          const y0 = Math.sqrt(y0Squared);

          // Pastikan y0 adalah bilangan bulat
          if (!Number.isInteger(y0)) {
            return generateHardDerivativeQuestion();
          }

          question = `Diketahui persamaan implisit \\(x^2 + y^2 = ${rSquared}\\). Tentukan nilai \\(\\frac{dy}{dx}\\) di titik \\((${x0}, ${y0})\\).`;

          // dy/dx = -x/y
          answer = -x0 / y0;

          if (!Number.isInteger(answer)) {
            return generateHardDerivativeQuestion();
          }

          steps = `Langkah penyelesaian:
1. Persamaan yang diberikan:
   \\[x^2 + y^2 = ${rSquared}\\]

2. Turunkan kedua ruas terhadap \\(x\\) (gunakan turunan implisit):
   \\[\\frac{d}{dx}(x^2) + \\frac{d}{dx}(y^2) = \\frac{d}{dx}(${rSquared})\\]

3. Terapkan aturan rantai pada \\(y^2\\):
   \\[2x + 2y\\frac{dy}{dx} = 0\\]

4. Selesaikan untuk \\(\\frac{dy}{dx}\\):
   \\[2y\\frac{dy}{dx} = -2x\\]
   \\[\\frac{dy}{dx} = -\\frac{x}{y}\\]

5. Substitusi titik \\((${x0}, ${y0})\\):
   \\[\\frac{dy}{dx}\\bigg|_{(${x0},${y0})} = -\\frac{${x0}}{${y0}}\\]

6. Hitung:
   \\[\\frac{dy}{dx} = ${answer}\\]

7. Jadi, nilai turunan di titik \\((${x0}, ${y0})\\) adalah \\(${answer}\\)`;

          qType = "Turunan Implisit (Lingkaran)";
        } else if (subtype === "ellipse") {
          // ax^2 + by^2 = c
          const a1 = getRandomInt(1, 4);
          const b1 = getRandomInt(1, 4);
          const x1 = getRandomInt(1, 3);
          const y1 = getRandomInt(1, 3);
          const c1 = a1 * x1 * x1 + b1 * y1 * y1;

          question = `Diketahui persamaan implisit \\(${a1}x^2 + ${b1}y^2 = ${c1}\\). Tentukan nilai \\(\\frac{dy}{dx}\\) di titik \\((${x1}, ${y1})\\).`;

          // 2ax + 2by(dy/dx) = 0
          // dy/dx = -ax/(by)
          answer = -(a1 * x1) / (b1 * y1);

          if (!Number.isInteger(answer)) {
            return generateHardDerivativeQuestion();
          }

          steps = `Langkah penyelesaian:
1. Persamaan yang diberikan:
   \\[${a1}x^2 + ${b1}y^2 = ${c1}\\]

2. Turunkan kedua ruas terhadap \\(x\\):
   \\[${a1} \\cdot 2x + ${b1} \\cdot 2y\\frac{dy}{dx} = 0\\]

3. Sederhanakan:
   \\[${2 * a1}x + ${2 * b1}y\\frac{dy}{dx} = 0\\]

4. Selesaikan untuk \\(\\frac{dy}{dx}\\):
   \\[${2 * b1}y\\frac{dy}{dx} = -${2 * a1}x\\]
   \\[\\frac{dy}{dx} = -\\frac{${2 * a1}x}{${
            2 * b1
          }y} = -\\frac{${a1}x}{${b1}y}\\]

5. Substitusi titik \\((${x1}, ${y1})\\):
   \\[\\frac{dy}{dx}\\bigg|_{(${x1},${y1})} = -\\frac{${a1} \\cdot ${x1}}{${b1} \\cdot ${y1}}\\]

6. Hitung:
   \\[\\frac{dy}{dx} = -\\frac{${a1 * x1}}{${b1 * y1}} = ${answer}\\]

7. Jadi, nilai turunan di titik \\((${x1}, ${y1})\\) adalah \\(${answer}\\)`;

          qType = "Turunan Implisit (Elips)";
        } else {
          // x^2 + axy + y^2 = c
          const a2 = getRandomInt(1, 3);
          const x2 = getRandomInt(1, 2);
          const y2 = getRandomInt(1, 2);
          const c2 = x2 * x2 + a2 * x2 * y2 + y2 * y2;

          question = `Diketahui persamaan implisit \\(x^2 + ${a2}xy + y^2 = ${c2}\\). Tentukan nilai \\(\\frac{dy}{dx}\\) di titik \\((${x2}, ${y2})\\).`;

          // 2x + a(y + x·dy/dx) + 2y·dy/dx = 0
          // 2x + ay + ax·dy/dx + 2y·dy/dx = 0
          // (ax + 2y)·dy/dx = -2x - ay
          // dy/dx = -(2x + ay)/(ax + 2y)
          const numerator = -(2 * x2 + a2 * y2);
          const denominator = a2 * x2 + 2 * y2;
          answer = numerator / denominator;

          if (!Number.isInteger(answer)) {
            return generateHardDerivativeQuestion();
          }

          steps = `Langkah penyelesaian:
1. Persamaan yang diberikan:
   \\[x^2 + ${a2}xy + y^2 = ${c2}\\]

2. Turunkan kedua ruas terhadap \\(x\\):
   \\[2x + ${a2}\\left(y + x\\frac{dy}{dx}\\right) + 2y\\frac{dy}{dx} = 0\\]

3. Distribusikan dan kelompokkan:
   \\[2x + ${a2}y + ${a2}x\\frac{dy}{dx} + 2y\\frac{dy}{dx} = 0\\]

4. Kelompokkan suku \\(\\frac{dy}{dx}\\):
   \\[(${a2}x + 2y)\\frac{dy}{dx} = -2x - ${a2}y\\]

5. Selesaikan untuk \\(\\frac{dy}{dx}\\):
   \\[\\frac{dy}{dx} = -\\frac{2x + ${a2}y}{${a2}x + 2y}\\]

6. Substitusi titik \\((${x2}, ${y2})\\):
   \\[\\frac{dy}{dx}\\bigg|_{(${x2},${y2})} = -\\frac{2(${x2}) + ${a2}(${y2})}{${a2}(${x2}) + 2(${y2})}\\]

7. Hitung:
   \\[\\frac{dy}{dx} = -\\frac{${2 * x2 + a2 * y2}}{${
            a2 * x2 + 2 * y2
          }} = ${answer}\\]

8. Jadi, nilai turunan di titik \\((${x2}, ${y2})\\) adalah \\(${answer}\\)`;

          qType = "Turunan Implisit (Campuran)";
        }
        break;

      case "exponential_derivative":
        // Turunan eksponensial
        const expType = getRandomElement(["e_simple", "e_chain", "a_power"]);

        if (expType === "e_simple") {
          // d/dx[a·e^(bx)] = ab·e^(bx)
          const a3 = getRandomInt(1, 5);
          const b3 = getRandomInt(1, 3);
          const x3 = getRandomInt(0, 2);

          question = `Diketahui \\(f(x) = ${a3}e^{${b3}x}\\). Tentukan nilai \\(f'(${x3})\\).`;

          // f'(x) = a·b·e^(bx)
          // f'(x3) = a·b·e^(b·x3)
          answer = a3 * b3 * Math.round(Math.exp(b3 * x3));

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a3}e^{${b3}x}\\]

2. Turunan eksponensial dengan aturan rantai:
   \\[\\frac{d}{dx}[e^{u}] = e^{u} \\cdot u'\\]

3. Di sini, \\(u = ${b3}x\\), maka \\(u' = ${b3}\\)

4. Terapkan aturan:
   \\[f'(x) = ${a3} \\cdot e^{${b3}x} \\cdot ${b3}\\]
   \\[f'(x) = ${a3 * b3}e^{${b3}x}\\]

5. Substitusi \\(x = ${x3}\\):
   \\[f'(${x3}) = ${a3 * b3}e^{${b3 * x3}}\\]

6. Hitung \\(e^{${b3 * x3}} \\approx ${Math.round(Math.exp(b3 * x3))}\\):
   \\[f'(${x3}) = ${a3 * b3} \\times ${Math.round(Math.exp(b3 * x3))}\\]
   \\[f'(${x3}) = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${x3}\\) adalah \\(${answer}\\)`;

          qType = "Turunan Eksponensial (e^x)";
        } else if (expType === "e_chain") {
          // d/dx[e^(ax+b)] di titik yang membuat eksponen = 0
          const a4 = getRandomInt(1, 4);
          const b4 = getRandomInt(1, 5);

          // Pilih x sehingga ax + b = 0, maka e^0 = 1
          const x4 = -b4 / a4;

          if (!Number.isInteger(x4)) {
            return generateHardDerivativeQuestion();
          }

          question = `Diketahui \\(f(x) = e^{${a4}x + ${b4}}\\). Tentukan nilai \\(f'(${x4})\\).`;

          // f'(x) = a·e^(ax+b)
          // At x4: a·e^0 = a·1 = a
          answer = a4;

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = e^{${a4}x + ${b4}}\\]

2. Gunakan aturan rantai:
   \\[\\frac{d}{dx}[e^{u}] = e^{u} \\cdot u'\\]

3. Di sini, \\(u = ${a4}x + ${b4}\\), maka \\(u' = ${a4}\\)

4. Terapkan aturan:
   \\[f'(x) = e^{${a4}x + ${b4}} \\cdot ${a4}\\]
   \\[f'(x) = ${a4}e^{${a4}x + ${b4}}\\]

5. Substitusi \\(x = ${x4}\\):
   \\[f'(${x4}) = ${a4}e^{${a4}(${x4}) + ${b4}}\\]
   \\[f'(${x4}) = ${a4}e^{0}\\]
   \\[f'(${x4}) = ${a4} \\times 1\\]

6. Jadi, nilai turunan di \\(x = ${x4}\\) adalah \\(${answer}\\)`;

          qType = "Turunan Eksponensial (Rantai)";
        } else {
          // d/dx[a^x] = a^x · ln(a), evaluasi di x=0 atau x=1
          const base = getRandomElement([2, 3, 5]);
          const coeff = getRandomInt(1, 4);
          const x5 = getRandomElement([0, 1]);

          question = `Diketahui \\(f(x) = ${coeff} \\cdot ${base}^x\\). Tentukan nilai \\(f'(${x5})\\).`;

          // f'(x) = coeff · a^x · ln(a)
          // f'(x5) = coeff · a^x5 · ln(a)
          const lnValue = Math.round(Math.log(base));
          answer = coeff * Math.pow(base, x5) * lnValue;

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${coeff} \\cdot ${base}^x\\]

2. Turunan fungsi eksponensial basis \\(a\\):
   \\[\\frac{d}{dx}[a^x] = a^x \\cdot \\ln(a)\\]

3. Terapkan aturan:
   \\[f'(x) = ${coeff} \\cdot ${base}^x \\cdot \\ln(${base})\\]

4. Substitusi \\(x = ${x5}\\):
   \\[f'(${x5}) = ${coeff} \\cdot ${base}^{${x5}} \\cdot \\ln(${base})\\]
   \\[f'(${x5}) = ${coeff} \\cdot ${Math.pow(base, x5)} \\cdot ${lnValue}\\]

5. Hitung:
   \\[f'(${x5}) = ${answer}\\]

6. Jadi, nilai turunan di \\(x = ${x5}\\) adalah \\(${answer}\\)`;

          qType = "Turunan Eksponensial (a^x)";
        }
        break;

      case "logarithmic_derivative":
        // Turunan logaritma
        const logType = getRandomElement(["ln_simple", "ln_chain", "log_base"]);

        if (logType === "ln_simple") {
          // d/dx[a·ln(x)] = a/x
          const a6 = getRandomInt(1, 10);
          const x6 = getRandomInt(1, 5);

          question = `Diketahui \\(f(x) = ${a6}\\ln(x)\\). Tentukan nilai \\(f'(${x6})\\).`;

          // f'(x) = a/x
          answer = a6 / x6;

          if (!Number.isInteger(answer)) {
            return generateHardDerivativeQuestion();
          }

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a6}\\ln(x)\\]

2. Turunan logaritma natural:
   \\[\\frac{d}{dx}[\\ln(x)] = \\frac{1}{x}\\]

3. Terapkan aturan:
   \\[f'(x) = ${a6} \\cdot \\frac{1}{x} = \\frac{${a6}}{x}\\]

4. Substitusi \\(x = ${x6}\\):
   \\[f'(${x6}) = \\frac{${a6}}{${x6}}\\]

5. Hitung:
   \\[f'(${x6}) = ${answer}\\]

6. Jadi, nilai turunan di \\(x = ${x6}\\) adalah \\(${answer}\\)`;

          qType = "Turunan Logaritma Natural";
        } else if (logType === "ln_chain") {
          // d/dx[ln(ax+b)] = a/(ax+b)
          const a7 = getRandomInt(1, 5);
          const b7 = getRandomInt(1, 8);
          const x7 = getRandomInt(1, 3);

          question = `Diketahui \\(f(x) = \\ln(${a7}x + ${b7})\\). Tentukan nilai \\(f'(${x7})\\).`;

          // f'(x) = a/(ax+b)
          const denominator = a7 * x7 + b7;
          answer = a7 / denominator;

          if (!Number.isInteger(answer)) {
            return generateHardDerivativeQuestion();
          }

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = \\ln(${a7}x + ${b7})\\]

2. Gunakan aturan rantai:
   \\[\\frac{d}{dx}[\\ln(u)] = \\frac{1}{u} \\cdot u'\\]

3. Di sini, \\(u = ${a7}x + ${b7}\\), maka \\(u' = ${a7}\\)

4. Terapkan aturan:
   \\[f'(x) = \\frac{1}{${a7}x + ${b7}} \\cdot ${a7}\\]
   \\[f'(x) = \\frac{${a7}}{${a7}x + ${b7}}\\]

5. Substitusi \\(x = ${x7}\\):
   \\[f'(${x7}) = \\frac{${a7}}{${a7}(${x7}) + ${b7}}\\]
   \\[f'(${x7}) = \\frac{${a7}}{${denominator}}\\]

6. Hitung:
   \\[f'(${x7}) = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${x7}\\) adalah \\(${answer}\\)`;

          qType = "Turunan Logaritma (Rantai)";
        } else {
          // d/dx[log_a(x)] = 1/(x·ln(a))
          const base = getRandomElement([2, 10]);
          const x8 = getRandomInt(1, 5);
          const lnBase = Math.round(Math.log(base));

          // Cari koefisien yang membuat hasil integer
          const coeff = x8 * lnBase;

          question = `Diketahui \\(f(x) = ${coeff}\\log_{${base}}(x)\\). Tentukan nilai \\(f'(${x8})\\).`;

          // f'(x) = coeff / (x·ln(base))
          answer = coeff / (x8 * lnBase);

          if (!Number.isInteger(answer)) {
            return generateHardDerivativeQuestion();
          }

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${coeff}\\log_{${base}}(x)\\]

2. Turunan logaritma basis \\(a\\):
   \\[\\frac{d}{dx}[\\log_a(x)] = \\frac{1}{x \\cdot \\ln(a)}\\]

3. Terapkan aturan:
   \\[f'(x) = ${coeff} \\cdot \\frac{1}{x \\cdot \\ln(${base})}\\]
   \\[f'(x) = \\frac{${coeff}}{x \\cdot ${lnBase}}\\]

4. Substitusi \\(x = ${x8}\\):
   \\[f'(${x8}) = \\frac{${coeff}}{${x8} \\cdot ${lnBase}}\\]
   \\[f'(${x8}) = \\frac{${coeff}}{${x8 * lnBase}}\\]

5. Hitung:
   \\[f'(${x8}) = ${answer}\\]

6. Jadi, nilai turunan di \\(x = ${x8}\\) adalah \\(${answer}\\)`;

          qType = "Turunan Logaritma Basis a";
        }
        break;

      case "advanced_trig":
        // Turunan trigonometri lanjutan: tan, sec, csc, cot
        const trigType = getRandomElement(["tan", "sec"]);

        if (trigType === "tan") {
          // d/dx[tan(x)] = sec²(x)
          const a9 = getRandomInt(1, 4);
          const angle = getRandomElement([0, 45]); // tan(0)=0, tan(45)=1, sec²(0)=1, sec²(45)=2

          question = `Diketahui \\(f(x) = ${a9}\\tan(x^\\circ)\\). Tentukan nilai \\(f'(${angle}^\\circ)\\).`;

          // f'(x) = a·sec²(x)
          const secSquaredValues = {
            0: 1, // sec²(0°) = 1
            45: 2, // sec²(45°) = (√2)² = 2
          };

          answer = a9 * secSquaredValues[angle];

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a9}\\tan(x^\\circ)\\]

2. Turunan tangen:
   \\[\\frac{d}{dx}[\\tan(x)] = \\sec^2(x)\\]

3. Terapkan aturan:
   \\[f'(x) = ${a9}\\sec^2(x^\\circ)\\]

4. Substitusi \\(x = ${angle}^\\circ\\):
   \\[f'(${angle}^\\circ) = ${a9}\\sec^2(${angle}^\\circ)\\]

5. Nilai \\(\\sec^2(${angle}^\\circ) = ${secSquaredValues[angle]}\\)

6. Hitung:
   \\[f'(${angle}^\\circ) = ${a9} \\times ${secSquaredValues[angle]} = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${angle}^\\circ\\) adalah \\(${answer}\\)`;

          qType = "Turunan Trigonometri (Tangen)";
        } else {
          // d/dx[sec(x)] = sec(x)·tan(x)
          const a10 = getRandomInt(1, 4);
          const angle = getRandomElement([0, 45]); // sec(0)=1, tan(0)=0 → 0; sec(45)=√2, tan(45)=1 → √2

          question = `Diketahui \\(f(x) = ${a10}\\sec(x^\\circ)\\). Tentukan nilai \\(f'(${angle}^\\circ)\\).`;

          // f'(x) = a·sec(x)·tan(x)
          const productValues = {
            0: 0, // sec(0)·tan(0) = 1·0 = 0
            45: 1, // sec(45)·tan(45) = √2·1/√2 = 1 (simplified)
          };

          answer = a10 * productValues[angle];

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a10}\\sec(x^\\circ)\\]

2. Turunan sekan:
   \\[\\frac{d}{dx}[\\sec(x)] = \\sec(x) \\cdot \\tan(x)\\]

3. Terapkan aturan:
   \\[f'(x) = ${a10}\\sec(x^\\circ) \\cdot \\tan(x^\\circ)\\]

4. Substitusi \\(x = ${angle}^\\circ\\):
   \\[f'(${angle}^\\circ) = ${a10}\\sec(${angle}^\\circ) \\cdot \\tan(${angle}^\\circ)\\]

5. Nilai \\(\\sec(${angle}^\\circ) \\cdot \\tan(${angle}^\\circ) = ${productValues[angle]}\\)

6. Hitung:
   \\[f'(${angle}^\\circ) = ${a10} \\times ${productValues[angle]} = ${answer}\\]

7. Jadi, nilai turunan di \\(x = ${angle}^\\circ\\) adalah \\(${answer}\\)`;

          qType = "Turunan Trigonometri (Sekan)";
        }
        break;

      case "higher_order_derivative":
        // Turunan tingkat tinggi
        const orderType = getRandomElement([
          "second_poly",
          "second_trig",
          "third_poly",
        ]);

        if (orderType === "second_poly") {
          // f''(x) untuk polinomial
          const a11 = getRandomInt(1, 4);
          const b11 = getRandomInt(1, 6);
          const c11 = getRandomInt(1, 8);
          const x11 = getRandomInt(1, 3);

          question = `Diketahui \\(f(x) = ${a11}x^3 + ${b11}x^2 + ${c11}x\\). Tentukan nilai \\(f''(${x11})\\).`;

          // f'(x) = 3ax^2 + 2bx + c
          // f''(x) = 6ax + 2b
          answer = 6 * a11 * x11 + 2 * b11;

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a11}x^3 + ${b11}x^2 + ${c11}x\\]

2. Cari turunan pertama:
   \\[f'(x) = 3 \\cdot ${a11}x^2 + 2 \\cdot ${b11}x + ${c11}\\]
   \\[f'(x) = ${3 * a11}x^2 + ${2 * b11}x + ${c11}\\]

3. Cari turunan kedua:
   \\[f''(x) = 2 \\cdot ${3 * a11}x + ${2 * b11}\\]
   \\[f''(x) = ${6 * a11}x + ${2 * b11}\\]

4. Substitusi \\(x = ${x11}\\):
   \\[f''(${x11}) = ${6 * a11}(${x11}) + ${2 * b11}\\]

5. Hitung:
   \\[f''(${x11}) = ${6 * a11 * x11} + ${2 * b11}\\]
   \\[f''(${x11}) = ${answer}\\]

6. Jadi, turunan kedua di \\(x = ${x11}\\) adalah \\(${answer}\\)`;

          qType = "Turunan Kedua (Polinomial)";
        } else if (orderType === "second_trig") {
          // f''(x) untuk trigonometri
          const a12 = getRandomInt(1, 4);
          const angle = getRandomElement([0, 90, 180, 270]);

          question = `Diketahui \\(f(x) = ${a12}\\sin(x^\\circ)\\). Tentukan nilai \\(f''(${angle}^\\circ)\\).`;

          // f'(x) = a·cos(x)
          // f''(x) = -a·sin(x)
          const sinValues = {
            0: 0,
            90: 1,
            180: 0,
            270: -1,
          };

          answer = -a12 * sinValues[angle];

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a12}\\sin(x^\\circ)\\]

2. Cari turunan pertama:
   \\[f'(x) = ${a12}\\cos(x^\\circ)\\]

3. Cari turunan kedua:
   \\[f''(x) = -${a12}\\sin(x^\\circ)\\]

4. Substitusi \\(x = ${angle}^\\circ\\):
   \\[f''(${angle}^\\circ) = -${a12}\\sin(${angle}^\\circ)\\]

5. Nilai \\(\\sin(${angle}^\\circ) = ${sinValues[angle]}\\)

6. Hitung:
   \\[f''(${angle}^\\circ) = -${a12} \\times ${sinValues[angle]} = ${answer}\\]

7. Jadi, turunan kedua di \\(x = ${angle}^\\circ\\) adalah \\(${answer}\\)`;

          qType = "Turunan Kedua (Trigonometri)";
        } else {
          // f'''(x) untuk polinomial
          const a13 = getRandomInt(1, 3);
          const b13 = getRandomInt(1, 5);
          const c13 = getRandomInt(1, 7);
          const d13 = getRandomInt(1, 9);
          const x13 = getRandomInt(1, 2);

          question = `Diketahui \\(f(x) = ${a13}x^4 + ${b13}x^3 + ${c13}x^2 + ${d13}x\\). Tentukan nilai \\(f'''(${x13})\\).`;

          // f'(x) = 4ax^3 + 3bx^2 + 2cx + d
          // f''(x) = 12ax^2 + 6bx + 2c
          // f'''(x) = 24ax + 6b
          answer = 24 * a13 * x13 + 6 * b13;

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan:
   \\[f(x) = ${a13}x^4 + ${b13}x^3 + ${c13}x^2 + ${d13}x\\]

2. Cari turunan pertama:
   \\[f'(x) = ${4 * a13}x^3 + ${3 * b13}x^2 + ${2 * c13}x + ${d13}\\]

3. Cari turunan kedua:
   \\[f''(x) = ${12 * a13}x^2 + ${6 * b13}x + ${2 * c13}\\]

4. Cari turunan ketiga:
   \\[f'''(x) = ${24 * a13}x + ${6 * b13}\\]

5. Substitusi \\(x = ${x13}\\):
   \\[f'''(${x13}) = ${24 * a13}(${x13}) + ${6 * b13}\\]

6. Hitung:
   \\[f'''(${x13}) = ${24 * a13 * x13} + ${6 * b13}\\]
   \\[f'''(${x13}) = ${answer}\\]

7. Jadi, turunan ketiga di \\(x = ${x13}\\) adalah \\(${answer}\\)`;

          qType = "Turunan Ketiga (Polinomial)";
        }
        break;
    }

    return { question, answer, steps, type: qType };
  }

  const generators = [
    generateHardLimitQuestion,
    generateHardFunctionQuestion,
    generateHardDerivativeQuestion,
  ];
  const chosenGenerator =
    generators[Math.floor(Math.random() * generators.length)];

  return chosenGenerator();
}
