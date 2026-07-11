// Curated high-resolution genuine public domain classical masterpieces from Wikimedia Commons / Google Art Project.
// These are guaranteed authentic, stable, and perfectly representative of the actual classical paintings.
export interface PaintingDetail {
  title: string;
  originalTitle: string;
  artist: string;
  year: string;
  style: string;
  url: string;
  keywords: string[];
}

export const MASTERPIECES: PaintingDetail[] = [
  {
    title: "星夜",
    originalTitle: "The Starry Night",
    artist: "文森特·梵高 Vincent van Gogh",
    year: "1889",
    style: "后印象主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    keywords: ["星夜", "星空", "starry night", "van gogh", "梵高", "孤独", "星光"]
  },
  {
    title: "睡莲",
    originalTitle: "Water Lilies",
    artist: "克劳德·莫奈 Claude Monet",
    year: "1916",
    style: "印象主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Water_Lilies_by_Claude_Monet_1916.jpg/1200px-Water_Lilies_by_Claude_Monet_1916.jpg",
    keywords: ["睡莲", "water lilies", "monet", "莫奈", "池塘", "静谧", "宁静", "荷花"]
  },
  {
    title: "吻",
    originalTitle: "The Kiss",
    artist: "古斯塔夫·克里姆特 Gustav Klimt",
    year: "1908",
    style: "象征主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Art_Project.jpg/1200px-The_Kiss_-_Gustav_Klimt_-_Google_Art_Project.jpg",
    keywords: ["吻", "the kiss", "klimt", "克里姆特", "温暖", "爱", "黄金", "拥抱"]
  },
  {
    title: "神奈川冲浪里",
    originalTitle: "The Great Wave off Kanagawa",
    artist: "葛饰北斋 Katsushika Hokusai",
    year: "1831",
    style: "浮世绘",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Great_Wave_off_Kanagawa2.jpg/1200px-Great_Wave_off_Kanagawa2.jpg",
    keywords: ["神奈川", "巨浪", "浪", "great wave", "hokusai", "葛饰北斋", "力量", "狂风", "暴雨", "海潮", "浮世绘"]
  },
  {
    title: "印象·日出",
    originalTitle: "Impression, Sunrise",
    artist: "克劳德·莫奈 Claude Monet",
    year: "1872",
    style: "印象主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1200px-Monet_-_Impression%2C_Sunrise.jpg",
    keywords: ["日出", "印象", "sunrise", "monet", "莫奈", "希望", "黎明", "清晨"]
  },
  {
    title: "戴珍珠耳环的少女",
    originalTitle: "Girl with a Pearl Earring",
    artist: "约翰内斯·维米尔 Johannes Vermeer",
    year: "1665",
    style: "巴洛克",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/1200px-1665_Girl_with_a_Pearl_Earring.jpg",
    keywords: ["珍珠耳环", "少女", "vermeer", "维米尔", "回眸", "纯真", "神秘", "肖像"]
  },
  {
    title: "大碗岛的星期天下午",
    originalTitle: "A Sunday on La Grande Jatte",
    artist: "乔治·修拉 Georges Seurat",
    year: "1884",
    style: "点彩画派",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/1200px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg",
    keywords: ["大碗岛", "星期天", "下午", "sunday on la grande jatte", "seurat", "修拉", "悠闲", "阳光", "惬意"]
  },
  {
    title: "雾海上的旅人",
    originalTitle: "Wanderer above the Sea of Fog",
    artist: "卡斯帕·大卫·弗里德里希 Caspar David Friedrich",
    year: "1818",
    style: "浪漫主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/1200px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
    keywords: ["雾海", "旅人", "wanderer", "friedrich", "弗里德里希", "孤独", "沉思", "壮丽", "高山"]
  },
  {
    title: "向日葵",
    originalTitle: "Sunflowers",
    artist: "文森特·梵高 Vincent van Gogh",
    year: "1888",
    style: "后印象主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/1200px-Vincent_Willem_van_Gogh_127.jpg",
    keywords: ["向日葵", "sunflowers", "van gogh", "梵高", "炽热", "生命力", "阳光", "金黄"]
  },
  {
    title: "奥菲莉娅",
    originalTitle: "Ophelia",
    artist: "约翰·埃弗里特·米莱斯 John Everett Millais",
    year: "1851",
    style: "前拉斐尔派",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg/1200px-John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg",
    keywords: ["奥菲莉娅", "欧菲莉亚", "ophelia", "millais", "米莱斯", "忧伤", "河流", "诗意", "凄美", "死亡"]
  },
  {
    title: "沉睡的吉普赛人",
    originalTitle: "The Sleeping Gypsy",
    artist: "亨利·卢梭 Henri Rousseau",
    year: "1897",
    style: "幼稚主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Henri_Rousseau_-_The_Sleeping_Gypsy_-_Google_Art_Project.jpg/1200px-Henri_Rousseau_-_The_Sleeping_Gypsy_-_Google_Art_Project.jpg",
    keywords: ["吉普赛人", "沉睡", "sleeping gypsy", "rousseau", "卢梭", "梦境", "神秘", "狮子", "夜色"]
  },
  {
    title: "死之岛",
    originalTitle: "Isle of the Dead",
    artist: "阿诺德·勃克林 Arnold Böcklin",
    year: "1883",
    style: "象征主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Arnold_B%C3%B6cklin_-_Die_Toteninsel_III_%28Alte_Nationalgalerie%2C_Berlin%29.jpg/1200px-Arnold_B%C3%B6cklin_-_Die_Toteninsel_III_%28Alte_Nationalgalerie%2C_Berlin%29.jpg",
    keywords: ["死之岛", "isle of the dead", "böcklin", "勃克林", "庄严", "静谧", "哀思", "神秘", "彼岸"]
  },
  {
    title: "夜游者",
    originalTitle: "Nighthawks",
    artist: "爱德华·霍普 Edward Hopper",
    year: "1942",
    style: "现代写实主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg/1200px-Nighthawks_by_Edward_Hopper_1942.jpg",
    keywords: ["夜游者", "nighthawks", "hopper", "霍普", "都市", "孤独", "深夜", "酒馆", "寂静"]
  },
  {
    title: "煎饼磨坊的舞会",
    originalTitle: "Bal du moulin de la Galette",
    artist: "皮耶尔-奥古斯特·雷诺阿 Pierre-Auguste Renoir",
    year: "1876",
    style: "印象主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg/1200px-Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg",
    keywords: ["煎饼磨坊", "舞会", "moulin de la galette", "renoir", "雷诺阿", "欢乐", "派对", "热闹", "光影"]
  },
  {
    title: "创造亚当",
    originalTitle: "The Creation of Adam",
    artist: "米开朗基罗 Michelangelo",
    year: "1512",
    style: "文艺复兴全盛期",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1200px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
    keywords: ["创造亚当", "creation of adam", "michelangelo", "米开朗基罗", "神圣", "力量", "指尖", "生命的诞生"]
  },
  {
    title: "蒙娜丽莎",
    originalTitle: "Mona Lisa",
    artist: "列奥纳多·达·芬奇 Leonardo da Vinci",
    year: "1503",
    style: "文艺复兴全盛期",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    keywords: ["蒙娜丽莎", "mona lisa", "da vinci", "达芬奇", "微笑", "永恒", "神秘"]
  },
  {
    title: "战舰无畏号",
    originalTitle: "The Fighting Temeraire",
    artist: "约瑟夫·玛罗德·威廉·透纳 J.M.W. Turner",
    year: "1838",
    style: "浪漫主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Turner_-_The_Fighting_Temeraire.jpg/1200px-Turner_-_The_Fighting_Temeraire.jpg",
    keywords: ["战舰无畏号", "无畏号", "fighting temeraire", "turner", "透纳", "落日", "挽歌", "壮丽", "晚霞"]
  },
  {
    title: "拾穗者",
    originalTitle: "The Gleaners",
    artist: "让-弗朗索瓦·米勒 Jean-François Millet",
    year: "1857",
    style: "写实主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project.jpg/1200px-Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project.jpg",
    keywords: ["拾穗", "拾穗者", "gleaners", "millet", "米勒", "谦卑", "大地", "朴素", "宁静", "劳动"]
  },
  {
    title: "蒙马特大街夜景",
    originalTitle: "The Boulevard Montmartre at Night",
    artist: "卡米耶·毕沙罗 Camille Pissarro",
    year: "1897",
    style: "印象主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Camille_Pissarro_-_The_Boulevard_Montmartre_at_Night_-_Google_Art_Project.jpg/1200px-Camille_Pissarro_-_The_Boulevard_Montmartre_at_Night_-_Google_Art_Project.jpg",
    keywords: ["蒙马特", "夜景", "boulevard montmartre", "pissarro", "毕沙罗", "霓虹", "雨夜", "繁华", "城市"]
  },
  {
    title: "维纳斯的诞生",
    originalTitle: "The Birth of Venus",
    artist: "桑德罗·波提切利 Sandro Botticelli",
    year: "1486",
    style: "早期文艺复兴",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project.jpg/1200px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project.jpg",
    keywords: ["维纳斯", "诞生", "birth of venus", "botticelli", "波提切利", "优雅", "神话", "春风"]
  },
  {
    title: "春",
    originalTitle: "Primavera",
    artist: "桑德罗·波提切利 Sandro Botticelli",
    year: "1482",
    style: "早期文艺复兴",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Botticelli_-_Primavera_-_Google_Art_Project.jpg/1200px-Botticelli_-_Primavera_-_Google_Art_Project.jpg",
    keywords: ["春", "primavera", "botticelli", "波提切利", "生机", "花神", "森林", "复苏"]
  },
  {
    title: "夜巡",
    originalTitle: "The Night Watch",
    artist: "伦勃朗·凡·莱因 Rembrandt van Rijn",
    year: "1642",
    style: "巴洛克",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_Rembrandt_van_Rijn_-_Google_Art_Project.jpg/1200px-The_Night_Watch_-_Rembrandt_van_Rijn_-_Google_Art_Project.jpg",
    keywords: ["夜巡", "night watch", "rembrandt", "伦勃朗", "明暗对比", "光影", "庄重", "英勇"]
  },
  {
    title: "戴草帽的自画像",
    originalTitle: "Self-Portrait with a Straw Hat",
    artist: "文森特·梵高 Vincent van Gogh",
    year: "1887",
    style: "后印象主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Vincent_van_Gogh_-_Self-Portrait_with_Straw_Hat_-_Google_Art_Project.jpg/1200px-Vincent_van_Gogh_-_Self-Portrait_with_Straw_Hat_-_Google_Art_Project.jpg",
    keywords: ["草帽", "自画像", "self portrait", "van gogh", "梵高", "质朴", "执着"]
  },
  {
    title: "散步，撑阳伞的女人",
    originalTitle: "Woman with a Parasol - Madame Monet and Her Son",
    artist: "克劳德·莫奈 Claude Monet",
    year: "1875",
    style: "印象主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg/1200px-Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg",
    keywords: ["撑阳伞", "阳伞", "散步", "woman with a parasol", "monet", "莫奈", "微风", "夏日", "轻盈"]
  },
  {
    title: "玩牌者",
    originalTitle: "The Card Players",
    artist: "保罗·塞尚 Paul Cézanne",
    year: "1892",
    style: "后印象主义",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Les_Joueurs_de_cartes%2C_par_Paul_C%C3%A9zanne.jpg/1200px-Les_Joueurs_de_cartes%2C_par_Paul_C%C3%A9zanne.jpg",
    keywords: ["玩牌者", "玩牌", "card players", "cézanne", "塞尚", "沉稳", "专注", "乡村"]
  }
];

export function resolvePaintingImage(title: string, artist: string, keywords: string): string {
  const searchStr = `${title} ${artist} ${keywords}`.toLowerCase();
  
  // 1. Try an exact or strong keyword match from our authentic collection
  for (const masterpiece of MASTERPIECES) {
    if (searchStr.includes(masterpiece.title.toLowerCase()) || 
        searchStr.includes(masterpiece.originalTitle.toLowerCase()) ||
        masterpiece.keywords.some(kw => searchStr.includes(kw.toLowerCase()))) {
      return masterpiece.url;
    }
  }

  // 2. Deterministic fallback to one of our genuine, gorgeous masterpieces if no direct match.
  // This guarantees that we ALWAYS render an authentic, top-tier high-res classical masterpiece
  // instead of a modern stock photo or missing visual.
  const hash = Array.from(title || "default").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return MASTERPIECES[hash % MASTERPIECES.length].url;
}
