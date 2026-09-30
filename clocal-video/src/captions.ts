// Edited from 09301.srt (times in seconds). Words are revealed one by one,
// spread across each phrase in proportion to their length.
// word_word = one token (keeps multi-word English in order) · *word* = Electric Blue highlight · #word# = orange (numbers / technical)
export type Phrase = { start: number; end: number; text: string };

export const PHRASES: Phrase[] = [
  { start: 0.0, end: 1.0, text: "احنا اختفينا #ست# #شهور#" },
  { start: 1.066, end: 2.1, text: "عارف إننا *طوّلنا*" },
  { start: 2.166, end: 3.45, text: "بس كان بعد #تلات# #سنين# شغل" },
  { start: 3.5, end: 4.533, text: "كان لازم ناخد *خطوة* لورا" },
  { start: 4.533, end: 6.0, text: "كان في حاجات كتير محتاجة *تتطور*" },
  { start: 6.066, end: 7.85, text: "جوّه الـ*operation*" },
  { start: 7.9, end: 8.066, text: "وكده" },
  // 8.066 – 8.9  «فاحنا رجعنا» → title card
  // 8.966 – 10.0 «بـ rebranding أقوى» → wordmark card
  { start: 10.0, end: 11.366, text: "*character* الـbrand فيه أوضح" },
  { start: 11.366, end: 13.6, text: "حسّنّا الـoperation، عملنا" },
  { start: 13.7, end: 14.233, text: "*أحسن* بكتير" },
  { start: 14.233, end: 14.566, text: "من أول" },
  { start: 14.566, end: 16.3, text: "الـwebsite لحد اللي هيكلّم" },
  { start: 16.366, end: 16.733, text: "الـclient" },
  { start: 16.733, end: 17.9, text: "دلوقتي احنا *جاهزين* نرجع" },
  { start: 17.9, end: 18.7, text: "أكتر حاجة سألتوا" },
  { start: 18.733, end: 19.8, text: "عليها واحنا واقفين" },
  { start: 19.866, end: 20.166, text: "كان الـstock" },
  { start: 20.166, end: 20.966, text: "*Gawhar_×_Wound*" },
  { start: 20.966, end: 21.9, text: "فهمّا أخيرًا" },
  { start: 21.933, end: 23.45, text: "راجعين وهيبقوا معانا في *الـdrop*" },
  // 23.5 – 24.866 «الجاية اللي ميعادها يوم الجمعة» → title card
  { start: 24.966, end: 26.15, text: "الـstock بتاع Gawhar_×_Wound" },
  { start: 26.2, end: 26.9, text: "*limited* جدًا" },
  { start: 26.9, end: 28.05, text: "طبعًا في حاجات تانية كتير" },
  { start: 28.1, end: 28.73, text: "في الـdrop مش بس" },
  { start: 28.766, end: 30.25, text: "Gawhar_×_Wound، في *pieces*" },
  { start: 30.333, end: 31.2, text: "هتنزل على طول" },
  // 31.3 – 32.566 «في الـ end of season sale» → title card
  { start: 32.566, end: 33.35, text: "في حاجات *جديدة*" },
  { start: 33.4, end: 34.9, text: "مش هحرق عليكو كل حاجة" },
  { start: 34.933, end: 35.7, text: "زي ما قلتلكو" },
  { start: 35.7, end: 37.85, text: "الـdrop هيبقى يوم *الجمعة*، هنفتح" },
  { start: 37.9, end: 39.066, text: "على الـdrop قبلها *بكام* *ساعة*" },
  { start: 39.066, end: 39.566, text: "عشان الـstock" },
  { start: 39.566, end: 41.1, text: "*limited* جدًا، اللي عايز *يلحق* الـstock" },
  { start: 41.166, end: 41.966, text: "أخيرًا *رجعنا*" },
  { start: 41.966, end: 42.666, text: "ومتأكد إن" },
  // 42.666 – 43.366 «كلوكال» → Arabic mark card
  { start: 43.366, end: 44.55, text: "هتعجبكو بكل" },
  { start: 44.6, end: 46.4, text: "جوانب الـbusiness اللي هتتعاملوا معاها" },
  { start: 46.4, end: 46.766, text: "مستني" },
  { start: 46.766, end: 48.6, text: "أسمع منكو *feedback* على كل حاجة" },
  { start: 48.666, end: 49.6, text: "من الـwebsite" },
  { start: 49.666, end: 51.066, text: "لحد *customer_experience*" },
  { start: 51.066, end: 52.45, text: "واللي جاي أحسن، انتو عارفين" },
  { start: 52.5, end: 53.65, text: "احنا مش بنعمل *الـhype*" },
  // 53.7 – 55.066 «الـproducts بتاعتنا هي الـhype» → closing card
];

export type Word = {
  text: string;
  kind: "plain" | "hl" | "tech";
  start: number;
};

export const splitPhrase = (p: Phrase): Word[] => {
  const raw = p.text.split(" ").filter(Boolean);
  // "الـword" → "الـ word": keep the Arabic article visually apart from an English word.
  const clean = raw.map((w) =>
    w.replace(/[*#]/g, "").replace(/_/g, " ").replace(/الـ(?=[A-Za-z])/g, "الـ "),
  );
  const total = clean.reduce((a, w) => a + w.length + 1, 0);
  // Words are spoken over ~85% of the phrase window; the tail holds the full line.
  const span = (p.end - p.start) * 0.85;
  let acc = 0;
  return raw.map((w, i) => {
    const start = p.start + (acc / total) * span;
    acc += clean[i].length + 1;
    const kind = w.includes("*") ? "hl" : w.includes("#") ? "tech" : "plain";
    return { text: clean[i], kind, start };
  });
};
