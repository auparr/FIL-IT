export function generateHardFunctionQuestion() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Fungsi untuk memilih elemen acak dari array
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  const types = [
    // "exponential", // Fungsi eksponen
    // "logarithmic", // Fungsi logaritma
    "trigonometric", // Fungsi trigonometri
    // "functional_properties", // Sifat fungsi
    // "transformations", // Transformasi grafik
    // "functional_equations", // Persamaan fungsional
  ];

  const type = getRandomElement(types);
  let question, answer, steps, qType;

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

      steps = `Langkah penyelesaian:
1. Fungsi yang diberikan: 
\\[
f(x) = ${multiplier} \\cdot ${base}^{${expCoeff}x ${
        expConst >= 0 ? "+" : ""
      } ${expConst}} ${addConst >= 0 ? "+" : ""} ${addConst}
\\]

2. Substitusi \\(x = ${xVal}\\): 
\\[
f(${xVal}) = ${multiplier} \\cdot ${base}^{${expCoeff}(${xVal}) ${
        expConst >= 0 ? "+" : ""
      } ${expConst}} ${addConst >= 0 ? "+" : ""} ${addConst}
\\]

3. Hitung eksponen: 
\\[
${expCoeff}(${xVal}) ${expConst >= 0 ? "+" : ""} ${expConst} = ${exponent}
\\]

4. Hitung pangkat: 
\\[
${base}^{${exponent}} = ${Math.pow(base, exponent)}
\\]

5. Kalikan dengan ${multiplier}: 
\\[
${multiplier} \\cdot ${Math.pow(base, exponent)} = ${
        multiplier * Math.pow(base, exponent)
      }
\\]

6. Tambahkan ${addConst}: 
\\[
${multiplier * Math.pow(base, exponent)} ${
        addConst >= 0 ? "+" : ""
      } ${addConst} = ${answer}
\\]`;

      qType = "Fungsi Eksponen";
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
            steps: `Langkah penyelesaian:
1. Fungsi: 
\\[
f(x) = ${logMultiplier} \\cdot \\log_{${logBase}}(${argCoeff}x + ${argConst}) ${
              logAddConst >= 0 ? "+" : ""
            } ${logAddConst}
\\]

2. Substitusi \\(x = ${logXVal}\\): 
\\[
f(${logXVal}) = ${logMultiplier} \\cdot \\log_{${logBase}}(${argCoeff}(${logXVal}) + ${argConst}) ${
              logAddConst >= 0 ? "+" : ""
            } ${logAddConst}
\\]

3. Hitung argumen logaritma: 
\\[
${argCoeff}(${logXVal}) + ${argConst} = ${Math.pow(
              logBase,
              power
            )} = ${logBase}^{${power}}
\\]

4. Sifat logaritma: 
\\[
\\log_{${logBase}}(${logBase}^{${power}}) = ${power}
\\]

5. Kalikan dengan koefisien: 
\\[
${logMultiplier} \\times ${power} = ${logMultiplier * power}
\\]

6. Tambah konstanta: 
\\[
${logMultiplier * power} ${logAddConst >= 0 ? "+" : ""} ${logAddConst} = ${
              logMultiplier * power + logAddConst
            }
\\]`,
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
            steps: `Langkah penyelesaian:
1. Fungsi: 
\\[
f(x) = ${logMultiplier} \\cdot \\log_{${logBase}}(${argCoeff}x + ${argConst}) ${
              logAddConst >= 0 ? "+" : ""
            } ${logAddConst}
\\]

2. Substitusi \\(x = ${logXVal}\\): 
\\[
f(${logXVal}) = ${logMultiplier} \\cdot \\log_{${logBase}}(${argCoeff}(${logXVal}) + ${argConst}) ${
              logAddConst >= 0 ? "+" : ""
            } ${logAddConst}
\\]

3. Hitung argumen logaritma: 
\\[
${argCoeff}(${logXVal}) + ${argConst} = 1
\\]

4. Sifat logaritma: 
\\[
\\log_{${logBase}}(1) = 0
\\]

5. Kalikan dengan koefisien: 
\\[
${logMultiplier} \\times 0 = 0
\\]

6. Tambah konstanta: 
\\[
0 ${logAddConst >= 0 ? "+" : ""} ${logAddConst} = ${logAddConst}
\\]`,
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
          steps: "Karena x+1=4=2^2, log_2(4)=2.",
        };
      }

      question = generated.question;
      answer = generated.answer;
      steps = generated.steps;
      qType = "Fungsi Logaritma";
      break;

    case "trigonometric":
      // Soal fungsi trigonometri dengan sudut istimewa
      const trigFunc = getRandomElement(["sin", "cos", "tan"]);
      const trigCoeff = getRandomInt(1, 2);
      let angle;
      let trigValue;

      // Daftar sudut istimewa yang nilai trigonometrinya integer atau setengah integer
      // dan dapat dikalikan dengan integer untuk menghasilkan integer.
      const specialAngles = [
        { angle: 0, sin: 0, cos: 1, tan: 0 },
        {
          angle: 30,
          sin: 0.5,
          cos: Math.sqrt(3) / 2,
          tan: 1 / Math.sqrt(3),
        },
        {
          angle: 45,
          sin: Math.sqrt(2) / 2,
          cos: Math.sqrt(2) / 2,
          tan: 1,
        },
        { angle: 60, sin: Math.sqrt(3) / 2, cos: 0.5, tan: Math.sqrt(3) },
        { angle: 90, sin: 1, cos: 0, tan: undefined },
        {
          angle: 120,
          sin: Math.sqrt(3) / 2,
          cos: -0.5,
          tan: -Math.sqrt(3),
        },
        {
          angle: 135,
          sin: Math.sqrt(2) / 2,
          cos: -Math.sqrt(2) / 2,
          tan: -1,
        },
        {
          angle: 150,
          sin: 0.5,
          cos: -Math.sqrt(3) / 2,
          tan: -1 / Math.sqrt(3),
        },
        { angle: 180, sin: 0, cos: -1, tan: 0 },
        {
          angle: 210,
          sin: -0.5,
          cos: -Math.sqrt(3) / 2,
          tan: 1 / Math.sqrt(3),
        },
        {
          angle: 225,
          sin: -Math.sqrt(2) / 2,
          cos: -Math.sqrt(2) / 2,
          tan: 1,
        },
        {
          angle: 240,
          sin: -Math.sqrt(3) / 2,
          cos: -0.5,
          tan: Math.sqrt(3),
        },
        { angle: 270, sin: -1, cos: 0, tan: undefined },
        {
          angle: 300,
          sin: -Math.sqrt(3) / 2,
          cos: 0.5,
          tan: -Math.sqrt(3),
        },
        {
          angle: 315,
          sin: -Math.sqrt(2) / 2,
          cos: Math.sqrt(2) / 2,
          tan: -1,
        },
        {
          angle: 330,
          sin: -0.5,
          cos: Math.sqrt(3) / 2,
          tan: -1 / Math.sqrt(3),
        },
      ];

      // Filter sudut yang sesuai dengan fungsi trigonometri (khusus tan, hindari undefined)
      let suitableAngles = specialAngles.filter((a) => {
        if (trigFunc === "tan") return a.tan !== undefined;
        return true;
      });

      // Kita akan memilih sudut yang nilai trigonometrinya dapat dijadikan integer dengan mengalikan bilangan bulat.
      // Misalnya, untuk sin 30° = 0.5, kita bisa kalikan 2 untuk mendapatkan 1 (integer).
      // Jadi, kita akan kelompokkan sudut berdasarkan nilai trigonometrinya:
      // - Nilai integer: 0, 1, -1 -> multiplier bebas (1,2,3) akan tetap integer.
      // - Nilai 0.5 atau -0.5 -> multiplier harus genap (2,4,6) untuk hasil integer.
      // - Nilai √2/2 atau -√2/2 -> multiplier harus kelipatan √2? Tapi kita ingin integer, jadi hindari atau gunakan multiplier 0? Tidak, kita ingin hasil integer. Jadi lebih baik hindari nilai yang tidak rasional.
      // - Nilai √3/2 atau -√3/2 -> multiplier harus kelipatan 2/√3? Tidak rasional. Jadi hindari.

      // Karena kita ingin jawaban integer, maka kita hanya akan menggunakan sudut yang nilai trigonometrinya:
      // 0, 1, -1, 0.5, -0.5 (untuk sin dan cos) dan untuk tan: 0, 1, -1 (karena tan 45°=1, tan 225°=1, tan 135°=-1, dll)

      // Jadi, kita filter lagi suitableAngles hanya untuk nilai-nilai yang disebutkan.
      suitableAngles = suitableAngles.filter((a) => {
        if (trigFunc === "sin") {
          return (
            a.sin === 0 ||
            a.sin === 1 ||
            a.sin === -1 ||
            a.sin === 0.5 ||
            a.sin === -0.5
          );
        } else if (trigFunc === "cos") {
          return (
            a.cos === 0 ||
            a.cos === 1 ||
            a.cos === -1 ||
            a.cos === 0.5 ||
            a.cos === -0.5
          );
        } else if (trigFunc === "tan") {
          return a.tan === 0 || a.tan === 1 || a.tan === -1;
        }
      });

      // Jika tidak ada sudut yang memenuhi, ulangi dengan fungsi lain? Atau paksa menggunakan sudut yang diinginkan?
      if (suitableAngles.length === 0) {
        // Jika tidak ada, maka kita gunakan sudut yang menghasilkan integer (0,1,-1) saja.
        suitableAngles = specialAngles.filter((a) => {
          if (trigFunc === "sin") {
            return a.sin === 0 || a.sin === 1 || a.sin === -1;
          } else if (trigFunc === "cos") {
            return a.cos === 0 || a.cos === 1 || a.cos === -1;
          } else if (trigFunc === "tan") {
            return a.tan === 0 || a.tan === 1 || a.tan === -1;
          }
        });
      }

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

      // Tentukan multiplier agar hasil perkalian dengan trigValue integer
      let trigMultiplier;
      if (trigValue === 0.5 || trigValue === -0.5) {
        // Kalikan 2 untuk mendapatkan integer
        trigMultiplier = 2 * getRandomInt(1, 3); // 2, 4, 6
      } else {
        // Untuk nilai integer (0,1,-1) multiplier bebas
        trigMultiplier = getRandomInt(1, 3);
      }

      // Konstanta penambah
      const trigAddConst = getRandomInt(-5, 5);

      // Pastikan bahwa x yang akan disubstitusi adalah integer
      // Karena angle adalah integer, dan trigCoeff adalah integer (1 atau 2), maka x = angle / trigCoeff harus integer?
      // Tapi jika trigCoeff=2 dan angle=30, maka x=15 (integer) -> baik.
      // Tapi jika trigCoeff=2 dan angle=45, maka x=22.5 (bukan integer) -> tidak baik.
      // Jadi, kita harus memastikan bahwa angle / trigCoeff adalah integer.

      // Kita akan pilih trigCoeff dan angle sedemikian sehingga angle % trigCoeff === 0
      // Tapi dalam kode, kita sudah memilih angle dan trigCoeff secara acak. Maka kita perlu menyesuaikan.

      // Solusi: kita pilih angle yang habis dibagi trigCoeff.
      // Atau kita atur agar x yang ditanyakan adalah integer, maka angle = trigCoeff * x, dan x kita pilih integer.

      // Ubah pendekatan: tentukan x integer dulu, lalu angle = trigCoeff * x, dan angle harus ada di daftar suitableAngles.

      // Tapi karena kode sudah berjalan, kita bisa lakukan penyesuaian dengan memfilter suitableAngles yang angle-nya habis dibagi trigCoeff.

      suitableAngles = suitableAngles.filter((a) => a.angle % trigCoeff === 0);

      // Jika setelah filter tidak ada, maka kita ubah trigCoeff menjadi 1 (atau pilih angle yang memenuhi)
      if (suitableAngles.length === 0) {
        trigCoeff = 1;
        // Filter lagi dengan trigCoeff=1
        suitableAngles = suitableAngles.filter(
          (a) => a.angle % trigCoeff === 0
        );
      }

      // Sekarang pilih lagi selectedAngle dari suitableAngles yang sudah difilter
      const selectedAngleNew = getRandomElement(suitableAngles);
      angle = selectedAngleNew.angle;

      // Update trigValue sesuai sudut yang baru
      switch (trigFunc) {
        case "sin":
          trigValue = selectedAngleNew.sin;
          break;
        case "cos":
          trigValue = selectedAngleNew.cos;
          break;
        case "tan":
          trigValue = selectedAngleNew.tan;
          break;
      }

      // Hitung x
      const x = angle / trigCoeff;

      // Sekarang, soal akan menjadi: f(x) = trigMultiplier * trigFunc(trigCoeff * x) + trigAddConst
      // Dan kita minta f(x) untuk x yang sudah dihitung.

      question = `Diketahui fungsi \\(f(x) = ${trigMultiplier} \\cdot ${trigFunc}(${trigCoeff}x^\\circ) ${
        trigAddConst >= 0 ? "+" : ""
      }${trigAddConst}\\). Tentukan nilai \\(f(${x})\\).`;

      answer = trigMultiplier * trigValue + trigAddConst;

      // Steps penyelesaian
      steps = `Langkah penyelesaian:
1. Fungsi yang diberikan: 
\\[
f(x) = ${trigMultiplier} \\cdot ${trigFunc}(${trigCoeff}x^\\circ) ${
        trigAddConst >= 0 ? "+" : ""
      } ${trigAddConst}
\\]

2. Substitusi \\(x = ${x}\\): 
\\[
f(${x}) = ${trigMultiplier} \\cdot ${trigFunc}(${trigCoeff} \\cdot ${x}^\\circ) ${
        trigAddConst >= 0 ? "+" : ""
      } ${trigAddConst}
\\]

3. Hitung sudut: 
\\[
${trigCoeff} \\cdot ${x}^\\circ = ${angle}^\\circ
\\]

4. Nilai fungsi trigonometri: 
\\[
${trigFunc}(${angle}^\\circ) = ${trigValue}
\\]

5. Kalikan dengan konstanta: 
\\[
${trigMultiplier} \\cdot ${trigValue} = ${trigMultiplier * trigValue}
\\]

6. Tambahkan konstanta: 
\\[
${trigMultiplier * trigValue} ${
        trigAddConst >= 0 ? "+" : ""
      } ${trigAddConst} = ${answer}
\\]`;

      qType = "Fungsi Trigonometri";
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

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan: 
\\[
f(x) = ${oddFunction} \\quad \\text{(fungsi ganjil)}
\\]

2. Sifat fungsi ganjil: 
\\[
f(-x) = -f(x)
\\]

3. Hitung: 
\\[
f(-${oddXVal}) + f(${oddXVal}) = -f(${oddXVal}) + f(${oddXVal})
\\]

4. Hasil: 
\\[
0
\\]`;

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

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan: 
\\[
f(x) = ${evenFunction} \\quad \\text{(fungsi genap)}
\\]

2. Sifat fungsi genap: 
\\[
f(-x) = f(x)
\\]

3. Hitung: 
\\[
f(-${evenXVal}) - f(${evenXVal}) = f(${evenXVal}) - f(${evenXVal})
\\]

4. Hasil: 
\\[
0
\\]`;

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

          steps = `Langkah penyelesaian:
1. Fungsi yang diberikan: 
\\[
f(x) = ${periodicCoeff} \\cdot ${selectedType.func}(x) ${
            periodicConst >= 0 ? "+" : ""
          } ${periodicConst}, 
\\quad \\text{dengan periode } ${selectedType.period}
\\]

2. Sifat fungsi periodik: 
\\[
f(x + T) = f(x) \\quad \\text{dengan } T = ${selectedType.period}
\\]

3. Hitung: 
\\[
f(${selectedPoint}) ${selectedOp.symbol} f(${selectedPoint} + ${
            selectedType.period
          }) 
= f(${selectedPoint}) ${selectedOp.symbol} f(${selectedPoint})
\\]

4. Nilai fungsi di titik tersebut: 
\\[
f(${selectedPoint}) = ${periodicCoeff} \\cdot ${
            selectedType.func
          }(${selectedPoint}) ${periodicConst >= 0 ? "+" : ""} ${periodicConst} 
= ${periodicCoeff * funcValue} ${
            periodicConst >= 0 ? "+" : ""
          } ${periodicConst} 
= ${periodicCoeff * funcValue + periodicConst}
\\]

5. Hasil akhir: 
\\[
${periodicCoeff * funcValue + periodicConst} ${selectedOp.symbol} ${
            periodicCoeff * funcValue + periodicConst
          } = ${answer}
\\]`;

          break;
      }
      qType = "Sifat Fungsi";
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

          steps = `Langkah penyelesaian:
1. Fungsi asli: 
\\[
f(x) = ${selectedFunc.func}
\\]

2. Transformasi: 
\\[
\\text{Geser horizontal sebesar } ${h} \\text{ satuan, vertikal sebesar } ${k} \\text{ satuan}
\\]

3. Fungsi hasil transformasi: 
\\[
g(x) = f(x - ${h}) ${k >= 0 ? "+" : ""} ${k}
\\]

4. Substitusi \\(x = ${xValTrans}\\): 
\\[
g(${xValTrans}) = f(${xValTrans} - ${h}) ${
            k >= 0 ? "+" : ""
          } ${k} = f(${newX}) ${k >= 0 ? "+" : ""} ${k}
\\]

5. Hitung nilai fungsi: 
\\[
f(${newX}) = ${funcValue}
\\]

6. Tambahkan konstanta: 
\\[
${funcValue} ${k >= 0 ? "+" : ""} ${k} = ${answer}
\\]`;
          // Menggunakan 'steps' dari scope luar
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

          steps = `Langkah penyelesaian:
1. Fungsi asli: 
\\[
f(x) = ${selectedFunc.func}
\\]

2. Transformasi: pencerminan terhadap sumbu-${axis}

3. Fungsi hasil: 
\\[
${axis === "x" ? `g(x) = -f(x)` : `g(x) = f(-x)`}
\\]

4. Substitusi \\(x = ${xValRef}\\): 
\\[
${
  axis === "x"
    ? `g(${xValRef}) = -f(${xValRef})`
    : `g(${xValRef}) = f(-${xValRef})`
}
\\]

5. Hitung: 
\\[
${
  axis === "x"
    ? `-(${selectedFunc.eval(xValRef)}) = ${answer}`
    : `f(-${xValRef}) = ${answer}`
}
\\]`;

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

          steps = `Langkah penyelesaian:
1. Fungsi asli: 
\\[
f(x) = ${selectedFunc.func}
\\]

2. Transformasi: regangan vertikal faktor ${a}, horizontal faktor \\(\\frac{1}{${b}}\\)

3. Fungsi hasil transformasi: 
\\[
g(x) = ${a} \\cdot f(${b}x)
\\]

4. Substitusi \\(x = ${xValScale}\\): 
\\[
g(${xValScale}) = ${a} \\cdot f(${b} \\times ${xValScale}) = ${a} \\cdot f(${scaledX})
\\]

5. Hitung nilai fungsi: 
\\[
f(${scaledX}) = ${scaleFuncValue}
\\]

6. Kalikan dengan faktor vertikal: 
\\[
${a} \\times ${scaleFuncValue} = ${answer}
\\]`;

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

          steps = `Langkah penyelesaian:
1. Fungsi asli: 
\\[
f(x) = ${selectedFunc.func}
\\]

2. Transformasi: geser horizontal ${transH}, vertikal ${transK}, regangan vertikal ${transA}

3. Fungsi hasil transformasi: 
\\[
g(x) = ${transA} \\cdot f(x - ${transH}) ${transK >= 0 ? "+" : ""} ${transK}
\\]

4. Substitusi \\(x = ${xValComb}\\): 
\\[
g(${xValComb}) = ${transA} \\cdot f(${xValComb} - ${transH}) ${
            transK >= 0 ? "+" : ""
          } ${transK} = ${transA} \\cdot f(${combNewX}) ${
            transK >= 0 ? "+" : ""
          } ${transK}
\\]

5. Hitung nilai fungsi: 
\\[
f(${combNewX}) = ${combFuncValue}
\\]

6. Kalikan dengan faktor vertikal: 
\\[
${transA} \\times ${combFuncValue} = ${transA * combFuncValue}
\\]

7. Tambahkan konstanta vertikal: 
\\[
${transA * combFuncValue} ${transK >= 0 ? "+" : ""} ${transK} = ${answer}
\\]`;

          break;
      }

      qType = "Transformasi Grafik";
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

          steps = `Langkah penyelesaian:
1. Persamaan fungsional: 
\\[
f(x+y) = f(x) + f(y)
\\]

2. Diketahui: 
\\[
f(1) = 3
\\]

3. Untuk mencari \\(f(${linearX + linearY})\\), perhatikan bahwa: 
\\[
${linearX + linearY} = 1 + 1 + \\dots + 1 \\quad \\text{(sebanyak ${
            linearX + linearY
          } kali)}
\\]

4. Gunakan persamaan fungsional berulang kali: 
\\[
f(${
            linearX + linearY
          }) = f(1 + 1 + \\dots + 1) = f(1) + f(1) + \\dots + f(1) = ${
            linearX + linearY
          } \\cdot f(1)
\\]

5. Substitusi \\(f(1) = 3\\): 
\\[
${linearX + linearY} \\cdot 3 = ${answer}
\\]`;

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

          steps = `Langkah penyelesaian:
1. Persamaan fungsional: 
\\[
f(x+y) = f(x) \\cdot f(y)
\\]

2. Diketahui: 
\\[
f(1) = ${baseValue}
\\]

3. Untuk mencari \\(f(${expX + expY})\\), perhatikan bahwa: 
\\[
${expX + expY} = 1 + 1 + \\dots + 1 \\quad \\text{(sebanyak ${
            expX + expY
          } kali)}
\\]

4. Gunakan persamaan fungsional berulang kali: 
\\[
f(${
            expX + expY
          }) = f(1 + 1 + \\dots + 1) = f(1) \\cdot f(1) \\cdot \\dots \\cdot f(1) = [f(1)]^{${
            expX + expY
          }}
\\]

5. Substitusi \\(f(1) = ${baseValue}\\): 
\\[
${baseValue}^{${expX + expY}} = ${answer}
\\]`;

          break;
      }
      qType = "Persamaan Fungsional";
      break;
  }

  return { question, answer, steps, type: qType };
}
