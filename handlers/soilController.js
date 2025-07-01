const Soil = require("../pkg/soils/soilSchema");
const { chatWithAI } = require("./aiSystem");

exports.createSoil = async (req, res) => {
  try {
    const soil = new Soil(req.body);
    await soil.save();

    return res.status(200).json(soil);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getAllSoils = async (req, res) => {
  try {
    const soils = await Soil.find();
    return res.status(200).json(soils);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.chatAboutSoils = async (req, res) => {
  try {
    const soils = await Soil.find();

    const context = soils
      .map(
        (s) =>
          `Име: ${s.name}, Тип: ${s.type}, pH: ${s.ph}, Хумус: ${s.humus}, Локација: ${s.location}, Култура: ${s.culture}`
      )
      .join("\n");

    const systemMessage =
      "Ти си експерт за почви во Македонија. Користи ги следниве информации за да одговараш на прашања:";

    const fullPrompt = `${systemMessage}\n${context}\n\nПрашање: ${req.body.prompt}`;

    const aiResponse = await chatWithAI(fullPrompt);

    return res.status(200).json(aiResponse);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.addSampleSoils = async (req, res) => {
  try {
    const sampleSoils = [
      {
        name: "Црница",
        type: "Црнозем",
        ph: 6.8,
        humus: 3.5,
        texture: "глинеста",
        color: "темно кафеава",
        location: "Пелагонија",
        seaLevel: 600,
        characteristics:
          "Плодна почва, богата со хумус, погодна за житни култури.",
        culture: ["пченица", "јачмен", "сончоглед"],
      },
      {
        name: "Алувијална почва",
        type: "Алувијална",
        ph: 7.2,
        humus: 2.1,
        texture: "песоклива",
        color: "светло кафеава",
        location: "Вардарска долина",
        seaLevel: 150,
        characteristics: "Добра дренажа, погодна за овоштарство и зеленчук.",
        culture: ["јаболка", "пиперка", "домати"],
      },
      {
        name: "Рендзина",
        type: "Рендзина",
        ph: 7.5,
        humus: 4.0,
        texture: "глинесто-песоклива",
        color: "сива",
        location: "Охридско-Преспански регион",
        seaLevel: 900,
        characteristics: "Карбонатна почва, богата со минерали.",
        culture: ["винова лоза", "пченка"],
      },
      {
        name: "Планинска почва",
        type: "Планинска",
        ph: 5.8,
        humus: 2.8,
        texture: "каменеста",
        color: "темно сива",
        location: "Шар Планина",
        seaLevel: 1500,
        characteristics: "Слабо развиена, погодна за пасишта.",
        culture: ["детелина", "ливадарка"],
      },
      {
        name: "Глинеста почва",
        type: "Глинеста",
        ph: 6.2,
        humus: 2.5,
        texture: "глинеста",
        color: "црвеникава",
        location: "Тиквешко",
        seaLevel: 200,
        characteristics: "Добра за лозарство и градинарство.",
        culture: ["грозје", "краставици"],
      },
      {
        name: "Песоклива почва",
        type: "Песоклива",
        ph: 7.0,
        humus: 1.2,
        texture: "песоклива",
        color: "жолта",
        location: "Гевгелиско",
        seaLevel: 80,
        characteristics: "Лесна за обработка, брзо се загрева.",
        culture: ["лубеница", "диња"],
      },
      {
        name: "Солончаци",
        type: "Солончаци",
        ph: 8.5,
        humus: 0.8,
        texture: "глинесто-песоклива",
        color: "бела",
        location: "Кумановско",
        seaLevel: 120,
        characteristics: "Висока содржина на соли.",
        culture: ["јачмен", "пченка"],
      },
      {
        name: "Каменеста почва",
        type: "Каменеста",
        ph: 6.0,
        humus: 1.0,
        texture: "каменеста",
        color: "сива",
        location: "Крушевско",
        seaLevel: 1100,
        characteristics: "Слабо плодна, погодна за шуми.",
        culture: ["бор", "буква"],
      },
      {
        name: "Иловица",
        type: "Иловица",
        ph: 6.5,
        humus: 2.0,
        texture: "иловична",
        color: "светло кафеава",
        location: "Струмичко",
        seaLevel: 250,
        characteristics: "Добра за зеленчук и овошје.",
        culture: ["домати", "јагоди"],
      },
      {
        name: "Планинска црница",
        type: "Црнозем",
        ph: 6.9,
        humus: 3.8,
        texture: "глинеста",
        color: "темно кафеава",
        location: "Маврово",
        seaLevel: 1400,
        characteristics: "Плодна, богата со органска материја.",
        culture: ["пченица", "компир"],
      },
    ];

    const inserted = await Soil.insertMany(sampleSoils);
    return res.status(201).json({
      message: "Soils added",
      data: inserted,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
