/* LABEL ATLAS · Time Machine 資料庫
 * 每一站：時代背景 context、人物與品牌 bio、可辨識特色 features（name / desc / clue＝一眼認出的關鍵）、
 * 代表作 works、影響 legacy、對照 contrast、帶走的問題 question、出處 sources、Met 物件編號 met（選填，用來抓圖）。
 * 文字皆為依出處重新撰寫的摘要；出處連結為博物館、學術或可信媒體頁面。
 */
const TM_CASES = [
{
  year: 1858, person: 'Charles Frederick Worth', house: 'House of Worth', city: '巴黎', chapter: 'couture',
  title: '把裁縫變成「設計師」',
  tags: ['高級訂製服', '第二帝國', '品牌標籤'],
  context: '1850 年代的巴黎正處於拿破崙三世的第二帝國，宮廷舞會與奢華排場讓上流社會對新衣需求極大。當時的女裝多由裁縫依顧客指示縫製，裁縫是手藝人，不是決定流行的人。紡織業與百貨商店正在興起，巴黎需要一種能把布料、工藝與名聲整合起來的新角色。',
  bio: '沃斯（1825–1895）生於英格蘭，年輕時在倫敦布商工作，並常去博物館研究畫作中的服裝。1845 年移居巴黎，在布料商 Gagelin 擔任銷售並開設裁縫部門。1858 年與瑞典商人 Bobergh 合開 Worth et Bobergh，很快得到歐仁妮皇后青睞；1870 年獨立經營，後由兒孫延續到二十世紀中期。',
  features: [
    { name: '設計師先決定', desc: '由沃斯預先設計整套服裝，再讓顧客挑選與調整，顛倒了「顧客出主意、裁縫照做」的關係。', clue: '看到「季節性系列」的概念，就是從這裡開始。' },
    { name: '真人模特兒展示', desc: '在店內讓真人穿上完成的作品走給顧客看，顧客再依喜好訂製。', clue: '今日時裝秀的雛形。' },
    { name: '布料即奢華', desc: '大量使用里昂絲綢與訂製織品，甚至保留布邊當作裝飾，宣示布料的昂貴與品質。', clue: '外觀相對簡潔、但材質極度講究。' }
  ],
  works: [
    { name: 'Worth & Bobergh 套裝', year: '1862–65', note: 'The Met 典藏，少數留存的合夥時期作品，以優雅的簡潔著稱。' },
    { name: '舞會禮服', year: '1880 年代', note: '絲綢、水晶與大量裝飾，展現第二帝國之後的華麗風格。' }
  ],
  legacy: '沃斯建立的運作方式——設計師署名、季節系列、真人展示、國際客戶——成為後來巴黎高級訂製服體系的藍圖。今天說「設計師品牌」，追溯起點常是他。',
  contrast: '對照 Chanel：沃斯讓衣服成為權力與財富的展示，Chanel 則在七十年後把奢華簡化成可以日常穿著的衣服。',
  question: '當設計師開始「決定流行」，顧客失去了什麼、又得到了什麼？',
  met: 156080,
  sources: [
    { label: 'The Met｜Charles Frederick Worth and the House of Worth（Heilbrunn Timeline）', url: 'https://www.metmuseum.org/essays/charles-frederick-worth-1825-1895-and-the-house-of-worth' },
    { label: 'The Met｜Worth and Bobergh 套裝（2009.300.1372a–d）', url: 'https://www.metmuseum.org/art/collection/search/156080' },
    { label: 'The Met｜Evening dress, ca. 1882（館藏說明）', url: 'https://www.metmuseum.org/art/collection/search/159187' }
  ]
},
{
  year: 1926, person: 'Gabrielle Chanel', house: 'Chanel', city: '巴黎', chapter: 'modern',
  title: '小黑裙：時尚界的福特汽車',
  tags: ['小黑裙', '針織 jersey', '現代女性'],
  context: '第一次世界大戰後，女性大量進入職場、運動與城市生活，束腹與繁複裝飾變得不合時宜。1920 年代的「摩登女郎」剪短髮、穿及膝裙，汽車與大量生產改變了人們對「現代」的想像。',
  bio: 'Chanel（1883–1971）從帽子起家，1910 年代在多維爾與比亞里茨開店，用原本做男性內衣的 jersey 針織布製作女裝。她本人的短髮、曬黑的膚色與經濟獨立，本身就是品牌形象。1921 年推出香水 No.5，1954 年復出後的斜紋軟呢套裝成為另一個代表符號。',
  features: [
    { name: '把黑色變日常', desc: '黑色原本多與喪服或店員制服連結，Chanel 把它變成白天到晚上都能穿的基本款。', clue: '直筒、及膝、幾乎沒有裝飾的黑色洋裝。' },
    { name: '舒適的材質', desc: '用 jersey 等柔軟、好活動的布料取代硬挺布料，讓衣服跟著身體走。', clue: '線條鬆、不強調腰身。' },
    { name: '借自男裝', desc: '從男性衣櫥與運動服借用剪裁與配色，黑白對比成為品牌標誌。', clue: '套裝＋襯衫、黑配白、人造珍珠串。' }
  ],
  works: [
    { name: '「小黑裙」', year: '1926', note: '美國 Vogue 1926 年 10 月刊出插畫，把它比作福特 T 型車——人人都能擁有的基本款。' },
    { name: '斜紋軟呢套裝', year: '1954 起', note: '復出後的代表作，無墊肩、可活動的外套成為經典。' }
  ],
  legacy: '小黑裙成為二十世紀最普及的女裝基本款之一；「舒適也可以優雅」的想法，影響了之後的成衣與職業女裝。',
  contrast: '對照 Dior：Chanel 解放腰身，Dior 在 1947 年又把腰收回來；兩人代表了「舒適」與「造型」兩條路線。',
  question: '為什麼一件「沒有裝飾」的衣服，反而能成為身分的象徵？',
  met: 81482,
  sources: [
    { label: 'The Met｜Gabrielle "Coco" Chanel and the House of Chanel（Heilbrunn Timeline）', url: 'https://www.metmuseum.org/toah/hd/chnl/hd_chnl.htm' },
    { label: 'The Met｜Ensemble, ca. 1927（小黑裙範例）', url: 'https://www.metmuseum.org/art/collection/search/81482' },
    { label: 'Smithsonian Magazine｜Why Coco Chanel Created the Little Black Dress', url: 'https://www.smithsonianmag.com/smart-news/why-coco-chanel-created-lbd-180965024/' }
  ]
},
{
  year: 1938, person: 'Claire McCardell', house: 'Townley Frocks', city: '紐約', chapter: 'modern',
  title: '美國運動休閒服的起點',
  tags: ['American Look', '成衣', '可機洗'],
  context: '1930 年代的美國時裝界仍大量模仿巴黎訂製服。經濟大蕭條讓多數女性需要便宜、耐穿、能自己打理的衣服；二戰期間布料配給，更讓「實用」成為設計條件。',
  bio: 'McCardell（1905–1958）在紐約 Parsons 讀書，曾在巴黎拆解二手高級訂製服研究結構。她長期為成衣廠 Townley Frocks 設計，被視為「美國運動休閒服（American sportswear）」的奠基者，1943 年獲 Coty 時尚獎。',
  features: [
    { name: '無腰線、靠綁帶塑形', desc: 'Monastic 洋裝以斜裁製作，沒有縫死的腰線，穿的人自己用腰帶決定合身度。', clue: '平放像布袋、繫上腰帶才有曲線。' },
    { name: '可互相搭配的單品', desc: '推動上衣、裙子、褲子可以混搭的「分件式」穿法。', clue: '一個衣櫥、多種組合。' },
    { name: '平價材料做出好設計', desc: '用棉布、牛仔布、針織等日常材料，搭配外露明線、黃銅扣等細節。', clue: '明線、口袋、綁帶，像工作服又很俐落。' }
  ],
  works: [
    { name: 'Monastic 洋裝', year: '1938', note: '大受歡迎並被大量仿製，仿冒問題一度讓 Townley 停業。' },
    { name: 'Popover 洋裝', year: '1942', note: '回應 Harper\'s Bazaar 的挑戰：能做家事也能穿去派對，售價 6.95 美元，附隔熱手套。' }
  ],
  legacy: '她證明美國可以有自己的時尚語言，而不只是複製巴黎；今天的休閒成衣、分件式衣櫥都可追溯到她。',
  contrast: '對照 Dior：同一時期，Dior 用大量布料與內襯做出戲劇性輪廓，McCardell 則用最少的結構讓衣服好穿、好洗。',
  question: '「好穿」能不能成為一種設計標準，而不只是妥協？',
  met: 84029,
  sources: [
    { label: 'The Museum at FIT｜Claire McCardell', url: 'https://fashionmuseum.fitnyc.edu/people/6603/claire-mccardell' },
    { label: 'The Met｜"Pop-over" 洋裝館藏說明', url: 'https://www.metmuseum.org/art/collection/search/84029' },
    { label: 'The Met｜American Ingenuity: Sportswear, 1930s–1970s', url: 'https://www.metmuseum.org/essays/american-ingenuity-sportswear-1930s-1970s' }
  ]
},
{
  year: 1947, person: 'Christian Dior', house: 'Dior', city: '巴黎', chapter: 'couture',
  title: 'New Look：戰後的新面貌',
  tags: ['New Look', 'Bar 外套', '沙漏輪廓'],
  context: '二戰期間布料配給、制服化的服裝讓女裝線條平直、方正。戰後巴黎急需重建時尚之都的地位，也需要一種能象徵「回到美好生活」的形象。',
  bio: 'Dior（1905–1957）早年開畫廊，戰時在 Lucien Lelong 擔任設計師。1946 年在紡織大亨 Marcel Boussac 支持下創立品牌，1947 年 2 月發表第一個系列，美國媒體稱之為「New Look」。他只以自己名字設計了約十年，卻建立了授權經營等商業模式。',
  features: [
    { name: '沙漏輪廓', desc: '圓潤肩線、極細腰、極寬下擺，刻意誇張女性曲線。', clue: '收腰外套＋大圓裙，像一朵倒放的花。' },
    { name: '用大量布料', desc: '一件裙子可用到十幾碼布，在剛結束配給的年代引起爭議。', clue: '裙擺打褶厚重、會「站」起來。' },
    { name: '內部結構', desc: '用襯墊、內衣結構與硬挺內裡塑形，靈感部分來自十九世紀的束身服裝。', clue: '外觀柔美，內部其實像建築。' }
  ],
  works: [
    { name: '「Bar」套裝', year: '1947 春夏', note: '象牙色收腰外套配黑色百褶裙，被視為 New Look 最具代表性的單品。' },
    { name: '「Chérie」洋裝', year: '1947 春夏', note: '裙擺使用超過 13 碼布料，展現新造型的份量。' }
  ],
  legacy: 'New Look 主導了整個 1950 年代的女性輪廓；Dior 開創的授權與全球化經營，也成為後來奢侈品牌的商業模型。',
  contrast: '對照 Balenciaga：同一時代，Dior 強調腰線，Balenciaga 逐步把腰線拿掉，走向更抽象的造型。',
  question: '在物資剛恢復的年代，「浪費布料」為什麼會被當成希望的象徵？',
  met: 81460,
  sources: [
    { label: 'The Met｜Christian Dior (1905–1957)（Heilbrunn Timeline）', url: 'https://www.metmuseum.org/essays/christian-dior-1905-1957' },
    { label: 'The Met｜"Bar" 套裝（C.I.58.34.30）', url: 'https://www.metmuseum.org/art/collection/search/81460' }
  ]
},
{
  year: 1955, person: 'Cristóbal Balenciaga', house: 'Balenciaga', city: '巴黎', chapter: 'couture',
  title: '把腰線拿掉的建築師',
  tags: ['Tunic', 'Sack', '雕塑感'],
  context: '1950 年代中期，Dior 的沙漏輪廓仍是主流。高級訂製服之間競爭激烈，設計師需要用新的「線條」來定義每一季。',
  bio: 'Balenciaga（1895–1972）出身西班牙巴斯克地區漁村，母親是裁縫。他先在聖塞巴斯蒂安開設時裝屋，西班牙內戰後於 1937 年在巴黎開店。他能親手完成從打版到縫製的每個步驟，被同行稱為「設計師中的設計師」，1968 年關閉時裝屋。',
  features: [
    { name: '去掉腰線', desc: '從 1950 年代起逐步放鬆腰部：半合身套裝、tunic 長版上衣、sack 布袋洋裝。', clue: '衣服離開身體，在背後形成空間。' },
    { name: '結構與材料', desc: '偏好挺括厚實的布料，讓衣服自己撐出形狀，例如後來開發的 gazar。', clue: '剪裁極少、但輪廓像雕塑。' },
    { name: '西班牙元素', desc: '從鬥牛服、宗教服飾與西班牙繪畫取材，色彩濃烈、黑色深沉。', clue: '深黑、斗篷、刺繡。' }
  ],
  works: [
    { name: 'Tunic 套裝', year: '1955 春夏', note: 'The Met 館藏，由 1952 年的無腰套裝發展而來，是後來 chemise 與 sack 的前身。' },
    { name: 'Sack 洋裝', year: '1957', note: '完全去除腰線，當時被英國媒體嘲諷「穿布袋很難性感」，卻預告了 1960 年代的直筒洋裝。' }
  ],
  legacy: '他的 tunic、sack、baby doll 等輪廓成為現代女裝的基本形；Courrèges、Ungaro、Givenchy 都曾受他影響。',
  contrast: '對照 Dior：Dior 用內部結構塑造身體曲線，Balenciaga 用布料本身塑造身體以外的空間。',
  question: '衣服一定要「貼合」身體才算好看嗎？',
  met: 85421,
  sources: [
    { label: 'The Met｜Balenciaga Ensemble, spring/summer 1955（C.I.55.60a–c）', url: 'https://www.metmuseum.org/art/collection/search/85421' },
    { label: 'V&A｜Introducing Cristóbal Balenciaga', url: 'https://www.vam.ac.uk/articles/introducing-cristobal-balenciaga' },
    { label: 'V&A｜Wool \'sack\' dress, 1957–8（T.90-1973）', url: 'https://collections.vam.ac.uk/item/O109277/dress-cristobal-balenciaga' }
  ]
},
{
  year: 1966, person: 'Yves Saint Laurent', house: 'Yves Saint Laurent', city: '巴黎', chapter: 'modern',
  title: 'Le Smoking：女人穿上燕尾服',
  tags: ['Le Smoking', 'Rive Gauche', '性別界線'],
  context: '1960 年代青年文化興起，學運、搖滾樂與女性運動挑戰既有規範。高級訂製服開始顯得老派，年輕人想要更直接、更能反映街頭的衣服。',
  bio: 'Saint Laurent（1936–2008）生於阿爾及利亞奧蘭，21 歲接替驟逝的 Dior 成為首席設計師。1961 年與伴侶 Pierre Bergé 創立自己的品牌。1966 年開設成衣店 Saint Laurent Rive Gauche，把設計師作品帶向更年輕的顧客。1983 年 The Met 為他舉辦回顧展，是該館首次為在世設計師辦個展。',
  features: [
    { name: '把男裝給女性', desc: '燕尾服、獵裝、海軍外套、褲裝——把男性衣櫥的經典單品改造成女裝。', clue: '黑色燕尾服外套＋長褲＋白襯衫。' },
    { name: '藝術作為圖像', desc: '1965 年以 Mondrian 色塊做成洋裝，之後也向畢卡索、梵谷致敬。', clue: '色塊、幾何、像畫作一樣的衣服。' },
    { name: '高訂與成衣並行', desc: 'Rive Gauche 讓設計師品牌第一次大規模走進成衣市場。', clue: '同一個名字，同時做訂製與現貨。' }
  ],
  works: [
    { name: 'Le Smoking', year: '1966 秋冬', note: '首次發表時引發爭議，訂製版銷量很少，卻在成衣線成為經典，之後他持續推出不同版本直到 2002 年。' },
    { name: 'Mondrian 洋裝', year: '1965 秋冬', note: '把畫作的色塊直接轉化為剪裁線。' }
  ],
  legacy: '女性褲裝與燕尾服從爭議變成日常；「高級品牌也做成衣」的模式成為業界常態。',
  contrast: '對照 Chanel：Chanel 從男裝借「舒適」，YSL 從男裝借「權力與態度」。',
  question: '一件衣服的「性別」是由剪裁決定，還是由社會決定？',
  met: 130453,
  sources: [
    { label: 'The Met｜Yves Saint Laurent: When Fashion Meets Art', url: 'https://www.metmuseum.org/perspectives/yves-saint-laurent' },
    { label: 'The Met｜Yves Saint Laurent Ensemble（Le Smoking 說明）', url: 'https://www.metmuseum.org/art/collection/search/130453' },
    { label: 'UAL Fashion Exhibition Making｜Yves Saint Laurent: Smoking Forever (2005)', url: 'https://fashionexhibitionmaking.arts.ac.uk/yves-saint-laurent-smoking-forever/' }
  ]
},
{
  year: 1971, person: 'Vivienne Westwood', house: 'Let It Rock → SEX → Seditionaries', city: '倫敦', chapter: 'subculture',
  title: '國王路 430 號：龐克的服裝實驗室',
  tags: ['龐克', '次文化', '歷史再造'],
  context: '1970 年代的英國經濟停滯、失業率高，年輕人對嬉皮理想與主流社會都感到失望。音樂與服裝成為反叛的語言，倫敦國王路一帶是次文化的聚集地。',
  bio: 'Westwood（1941–2022）原本是小學老師，與經紀人 Malcolm McLaren 合作。1971 年兩人在國王路 430 號開設 Let It Rock，販售 1950 年代 Teddy Boy 風格服裝；店名後來改為 Too Fast to Live Too Young to Die（1973）、SEX（1974）、Seditionaries（1976）、Worlds End。1981 年的「Pirate」是兩人第一場正式時裝秀。',
  features: [
    { name: '挪用禁忌服裝', desc: '把皮革、拘束服、安全別針、撕裂印字 T 恤變成街頭服裝，刻意挑釁。', clue: '綁帶褲、別針、撕破的標語 T 恤。' },
    { name: '店就是作品', desc: '一間店反覆改名、改裝潢，每一版都對應一種次文化。', clue: '店名本身就是宣言。' },
    { name: '回到歷史再反叛', desc: '1980 年代後轉向十八世紀束身衣、英國蘇格蘭格紋與花呢，用傳統顛覆傳統。', clue: '格紋＋束腰＋誇張的歷史輪廓。' }
  ],
  works: [
    { name: 'Seditionaries 綁帶褲', year: '1976–77', note: '以拘束服為靈感，與性手槍樂團形象緊密結合。' },
    { name: 'Pirate 系列', year: '1981–82 秋冬', note: '第一場正式時裝秀，以海盜、紈褲子弟為主題。' }
  ],
  legacy: '她讓次文化成為正式的設計來源，也讓「時裝可以表達政治立場」成為可能；晚年長期投入環保與社會運動。',
  contrast: '對照 Ralph Lauren：同一時期，Westwood 打破英國傳統，Lauren 則把英美上流傳統包裝成嚮往。',
  question: '當反叛的衣服被賣到全世界，它還算反叛嗎？',
  note: '原站此站標示為 1970；依 V&A、The Met 與倫敦博物館資料，Let It Rock 開幕於 1971 年，此處已更正。',
  sources: [
    { label: 'V&A｜Vivienne Westwood designs', url: 'https://www.vam.ac.uk/content/articles/v/vivienne-westwood-designs' },
    { label: 'The Met｜Vivienne Westwood (born 1941)（Heilbrunn Timeline）', url: 'https://www.metmuseum.org/toah/hd/vivw/hd_vivw.htm' },
    { label: 'London Museum｜Vivienne Westwood & Malcolm McLaren: King\'s Road royalty', url: 'https://londonmuseum.org.uk/collections/london-stories/vivienne-westwood-malcolm-mclaren-kings-road-royalty' }
  ]
},
{
  year: 1971, person: 'Massimo Osti', house: 'C.P. Company / Stone Island', city: '波隆那', chapter: 'subculture',
  title: '把實驗室搬進男裝',
  tags: ['成衣染色', '軍裝檔案', '功能布料'],
  context: '1970 年代的義大利男裝仍以傳統西裝為核心。另一方面，軍用剩餘物資、工作服與運動服大量流入市面，紡織技術也在快速發展。',
  bio: 'Osti（1944–2005）出身波隆那，原本是平面設計師，熱愛普普藝術與影印機。1971 年創立 Chester Perry（因 Fred Perry 提出法律異議，1978 年改名 C.P. Company），1982 年推出 Stone Island。他收藏大量軍裝與工作服作為研究檔案，每件 C.P. 衣服的標籤寫著「Ideas from Massimo Osti」。',
  features: [
    { name: '成衣染色', desc: '先把衣服縫好再整件染色，不同材質吸色不同，產生同色系的深淺層次。', clue: '縫線、口袋與布身顏色略有差異。' },
    { name: '布料實驗', desc: 'Stone Island 第一個系列用卡車防水帆布（Tela Stella）；之後有遇冷變色、反光等布料。', clue: '摸起來像工業材料，看起來會「變」。' },
    { name: '功能細節', desc: '從軍裝與防護裝備研究出可拆、可收納、可保護的設計。', clue: '帽兜上的護目鏡、袖子上的徽章。' }
  ],
  works: [
    { name: 'Mille Miglia 護目鏡外套', year: '1988', note: '為同名古董車賽設計，帽兜上的鏡片可直接觀看。' },
    { name: 'Stone Island Ice Jacket', year: '1991', note: '用溫感變色材料，讓衣服隨溫度改變顏色。' }
  ],
  legacy: '他把「研發」帶進男裝，影響了今天的機能服與街頭品牌；英國足球 casuals 與義大利 paninari 次文化也把他的品牌當成身分標誌。',
  contrast: '對照 Armani：同樣在義大利改造男裝，Armani 拿掉西裝的硬挺，Osti 則把軍裝與工業材料變成日常服裝。',
  question: '一件衣服的價值，可以來自「技術」而不是品牌標誌嗎？',
  sources: [
    { label: 'Domus｜Massimo Osti: how the founder of Stone Island reshaped fashion (2025)', url: 'https://www.domusweb.it/en/design/2025/06/10/massimo-osti-stone-island-cp-company-exhibition.html' },
    { label: 'SSENSE｜How Massimo Osti Re-Engineered Menswear', url: 'https://www.ssense.com/en-us/editorial/fashion/how-massimo-osti-re-engineered-menswear' },
    { label: 'SSENSE｜The A–Z Guide to Stone Island', url: 'https://www.ssense.com/en-us/editorial/fashion/stone-island-brand-history' }
  ]
},
{
  year: 1972, person: 'Ralph Lauren', house: 'Polo Ralph Lauren', city: '紐約', chapter: 'american',
  title: '販賣一種生活方式',
  tags: ['Polo 衫', '學院風', '生活風格品牌'],
  context: '1960–70 年代的美國郊區中產階級擴大，人們嚮往英國鄉村、常春藤學院與西部牛仔等「美國夢」意象。百貨公司是時尚主要通路。',
  bio: 'Lauren 1939 年生於紐約布朗克斯，沒有受過正式設計訓練。1967 年在領帶公司 Beau Brummell 以「Polo」為名推出寬版領帶，1968 年發展成完整男裝線。1971 年推出女裝襯衫，首次出現馬球騎士標誌；1972 年推出網眼棉質 Polo 衫，初版有 24 種顏色。',
  features: [
    { name: '說故事的品牌', desc: '不只賣衣服，而是賣英倫鄉紳、常春藤、牛仔等完整場景與生活方式。', clue: '店面像住家、廣告像電影劇照。' },
    { name: '經典再製', desc: '把傳統服裝（牛津襯衫、粗花呢、牛仔布）重新做成高品質商品。', clue: '看起來「一直都在」的衣服。' },
    { name: '小標誌大辨識', desc: '胸前的馬球騎士讓品牌在遠處也能被認出。', clue: '左胸刺繡標誌。' }
  ],
  works: [
    { name: 'Polo 寬版領帶', year: '1967', note: 'The Met 館藏，比當時流行的窄領帶寬得多，帶有英國風格。' },
    { name: '網眼 Polo 衫', year: '1972', note: '多色推出，後來成為學院風的代表單品。' }
  ],
  legacy: '他示範了「生活風格品牌」的模式：服裝、家具、香水、餐廳都可以屬於同一個世界觀。',
  contrast: '對照 Westwood：兩人都在重新詮釋英國傳統，一個把它變成嚮往，一個把它變成反諷。',
  question: '我們買衣服時，是在買衣服，還是在買一個想成為的自己？',
  met: 156090,
  sources: [
    { label: 'The Met｜Polo 領帶館藏說明（Ralph Lauren 1967 年起家）', url: 'https://www.metmuseum.org/art/collection/search/156090' },
    { label: 'Ralph Lauren｜Making History: the Polo shirt', url: 'https://www.ralphlauren.com/rlmag/ralph-lauren-culture-style-polo-shirt-book.html' }
  ]
},
{
  year: 1975, person: 'Giorgio Armani', house: 'Giorgio Armani', city: '米蘭', chapter: 'italian',
  title: '拆掉西裝的盔甲',
  tags: ['無結構外套', '米蘭成衣', '權力套裝'],
  context: '1970 年代的男西裝仍以厚墊肩、硬襯為主，像一副盔甲。米蘭正在成為成衣重鎮，與巴黎的高級訂製服形成不同路線。',
  bio: 'Armani（1934–2025）原本讀醫學，後在米蘭百貨 La Rinascente 擔任櫥窗與採購，再到 Nino Cerruti 設計男裝。1975 年與伴侶 Sergio Galeotti 創立公司，同年發表男裝系列。1980 年電影《美國舞男》的服裝讓他在全球大眾間成名。',
  features: [
    { name: '無結構外套', desc: '拿掉硬襯與厚墊肩、改變比例，讓外套像襯衫一樣輕。', clue: '肩線柔軟、布料垂墜、外套會「流動」。' },
    { name: '低彩度色盤', desc: '偏好灰褐（greige）、米色、海軍藍等安靜的中間色。', clue: '整身沒有強烈顏色。' },
    { name: '男女共用語言', desc: '把同樣柔軟的西裝語彙用在女裝，成為 1980 年代職業女性的權力套裝。', clue: '寬肩但不僵硬的女性西裝。' }
  ],
  works: [
    { name: '無結構男西裝外套', year: '1975 起', note: '當時男裝普遍硬挺，這種外套被視為男裝的轉捩點。' },
    { name: '女性無結構外套', year: '1977 起', note: '搭配寬褲或百褶裙，成為職場女性的新選擇。' }
  ],
  legacy: '「舒適但專業」的西裝成為現代職場的標準；Guggenheim 2000 年的回顧展也引發「時尚能否進美術館」的討論。',
  contrast: '對照 YSL：YSL 把男裝的權力給女性，Armani 把男裝的權力「放鬆」，讓男女都能穿得自在。',
  question: '正式服裝一定要讓人不舒服才顯得專業嗎？',
  met: 96171,
  sources: [
    { label: 'Guggenheim Bilbao｜Giorgio Armani (2001)', url: 'https://guggenheim-bilbao.eus/en/exhibitions/giorgio-armani-2' },
    { label: 'The Met｜Giorgio Armani Ensemble, ca. 1979（無結構外套說明）', url: 'https://www.metmuseum.org/art/collection/search/96171' },
    { label: 'V&A｜Five iconic Giorgio Armani looks from the V&A collections', url: 'https://www.vam.ac.uk/articles/five-iconic-giorgio-armani-looks-from-the-vampa-collections' }
  ]
},
{
  year: 1981, person: 'Rei Kawakubo', house: 'Comme des Garçons', city: '東京 / 巴黎', chapter: 'japan',
  title: '黑色、破洞與不對稱：巴黎的震撼',
  tags: ['反時尚', '不對稱', '解構'],
  context: '1980 年代初的巴黎時尚追求華麗、性感與強烈的肩線。日本經濟正在崛起，但西方對日本設計的認識仍很有限。',
  bio: '川久保玲 1942 年生於東京，慶應大學主修美學與文學，沒有正式學過服裝設計。1969 年創立 Comme des Garçons（法文意為「像男孩一樣」），1975 年在東京發表，1981 年 4 月首次在巴黎發表。她也創立了 Dover Street Market 等複合店。',
  features: [
    { name: '以黑色為主', desc: '大量使用黑與深色，被當時部分評論者形容為悲觀或「後原子彈」風格。', clue: '整場秀幾乎沒有顏色。' },
    { name: '破洞與未完成', desc: '刻意讓針織有洞、邊緣不收、結構不對稱，挑戰「完美」的標準。', clue: '看起來像壞掉，其實是設計。' },
    { name: '衣服與身體之間的空間', desc: '不追隨身體曲線，用填充物、超大輪廓重新定義身體形狀。', clue: '不知道哪裡是腰、哪裡是肩。' }
  ],
  works: [
    { name: '巴黎首秀', year: '1981', note: '與山本耀司前後登場，引發巨大爭議，也讓日本設計進入國際視野。' },
    { name: 'Body Meets Dress, Dress Meets Body', year: '1997 春夏', note: '在洋裝中加入填充物，讓身體出現不尋常的隆起。' }
  ],
  legacy: 'The Met 在 2017 年為她舉辦「Art of the In-Between」，是繼 YSL 之後第二位在世時獲該館個展的設計師；她影響了 Margiela 到整個解構主義世代。',
  contrast: '對照山本耀司：兩人同時來到巴黎、同樣以黑色出名，但川久保玲更偏向概念與造型實驗，山本耀司更重視剪裁與穿著感。',
  question: '「不美」的衣服，能不能是好的設計？',
  sources: [
    { label: 'The Met｜Rei Kawakubo/Comme des Garçons: Art of the In-Between（出版品）', url: 'https://metmuseum.org/met-publications/rei-kawakubo-comme-des-garcons-art-of-the-in-between' },
    { label: 'The Met｜展覽導覽手冊 PDF（2017）', url: 'https://www.metmuseum.org/-/media/Files/Exhibitions/2017/Rei%20Kawakubo%20Guide.pdf' },
    { label: 'NGV｜Rei Kawakubo: Reframing fashion', url: 'https://www.ngv.vic.gov.au/collecting-comme/rei-kawakubo-reframing-fashion/' }
  ]
},
{
  year: 1981, person: 'Yohji Yamamoto', house: 'Yohji Yamamoto', city: '東京 / 巴黎', chapter: 'japan',
  title: '黑色的詩人',
  tags: ['黑色', '寬鬆剪裁', '男裝女穿'],
  context: '與川久保玲同一時期，日本設計師以完全不同於西方的身體觀進入巴黎，挑戰「衣服要展現身材」的前提。',
  bio: '山本耀司 1943 年生於東京，母親是裁縫，他在慶應大學讀法律後進入文化服裝學院。1972 年創立 Y\'s，1977 年在東京發表，1981 年首次在巴黎發表同名品牌。2002 年與 adidas 合作推出 Y-3，2011 年 V&A 為他舉辦回顧展。',
  features: [
    { name: '黑色作為態度', desc: '他曾說黑色既謙虛又傲慢，代表「不打擾別人，也別打擾我」。', clue: '全黑、層次靠材質而不是顏色。' },
    { name: '寬鬆與垂墜', desc: '超大尺寸、不對稱下擺，讓布料隨動作流動。', clue: '衣服比身體大一圈，走路時會擺動。' },
    { name: '男裝語彙給女性', desc: '把男性西裝、大衣的剪裁用在女裝，模糊性別。', clue: '女生穿寬大的男式外套。' }
  ],
  works: [
    { name: '巴黎首秀', year: '1981', note: '模特兒素顏、深色寬大服裝，被法國媒體貶為「廣島時尚」，卻改變了時尚的走向。' },
    { name: 'Y-3', year: '2002', note: '與 adidas 合作，被視為早期設計師與運動品牌結合的重要案例。' }
  ],
  legacy: '他讓「寬鬆、不性感、不強調身材」成為一種高級美學，也是設計師跨足運動服的先行者。',
  contrast: '對照川久保玲：兩人常被並列，但山本耀司更接近「裁縫師」，關注衣服穿在身上的狀態。',
  question: '如果衣服不再強調身材，它還能表達什麼？',
  sources: [
    { label: 'V&A｜Yohji Yamamoto: Poet of Black', url: 'https://www.vam.ac.uk/articles/yohji-yamamoto-poet-of-black' },
    { label: 'Palais Galliera｜Yohji Yamamoto', url: 'https://www.palaisgalliera.paris.fr/fr/node/1128' },
    { label: 'UAL Fashion Exhibition Making｜Yohji Yamamoto at Work (2011)', url: 'https://fashionexhibitionmaking.arts.ac.uk/yohji-yamamoto-at-work/' }
  ]
},
{
  year: 1984, person: 'Miuccia Prada', house: 'Prada', city: '米蘭', chapter: 'italian',
  title: '尼龍後背包：工業材料的奢華',
  tags: ['尼龍', '知性', 'ugly chic'],
  context: '1980 年代的奢侈品以皮革、金飾與炫耀為主。Prada 原本是 1913 年創立的米蘭皮件老店，到 1970 年代已不再受年輕人關注。',
  bio: 'Miuccia Prada 1949 年生，擁有政治學博士學位，曾學習默劇。1978 年接手家族事業，與丈夫 Patrizio Bertelli 共同經營。1984 年推出用 Pocone 尼龍製作的後背包，1988 年推出第一個女裝成衣系列，1993 年創立 Miu Miu 與 Prada 基金會。',
  features: [
    { name: '工業材料變奢侈品', desc: '用原本做軍用帳篷的防水尼龍取代皮革，以高價出售。', clue: '黑色尼龍＋三角形金屬標誌。' },
    { name: '刻意的「不好看」', desc: '1990 年代起用不協調的花色、老派剪裁製造「ugly chic」，挑戰品味。', clue: '像奶奶衣櫥裡的花色，卻很前衛。' },
    { name: '知性的女性形象', desc: '設計像在提問：女性、制服、權力與品味是什麼。', clue: '端莊、帶點怪的制服感。' }
  ],
  works: [
    { name: '尼龍後背包（Vela）', year: '1984', note: 'MoMA 已收藏此設計，代表工業材料進入奢侈品的轉折。' },
    { name: '首個女裝成衣系列', year: '1988 秋冬', note: '奠定 Prada 的極簡、知性路線。' }
  ],
  legacy: '她讓奢侈品從「炫富」轉向「品味與觀點」；尼龍、機能材料在今天的高級品牌中已很普遍。',
  contrast: '對照 Massimo Osti：兩人都把工業與軍用材料帶進時尚，Osti 重視功能與研發，Prada 重視材料的象徵意義。',
  question: '奢侈品的價值，來自材料本身還是來自想法？',
  sources: [
    { label: 'MoMA｜Miuccia Prada, Backpack, designed 1984', url: 'https://www.moma.org/collection/works/275417' },
    { label: 'W Magazine｜How Prada\'s Nylon Backpack Rewrote the Rules of Luxury', url: 'https://www.wmagazine.com/fashion/prada-nylon-backpack-history-backstory' }
  ]
},
{
  year: 1986, person: 'Dries Van Noten', house: 'Dries Van Noten', city: '安特衛普', chapter: 'belgian',
  title: '安特衛普六君子與印花的詩意',
  tags: ['Antwerp Six', '印花', '刺繡'],
  context: '1980 年代的國際時尚由巴黎、米蘭、紐約主導，比利時並不被視為時尚重鎮。安特衛普皇家藝術學院卻培養出一批風格強烈的年輕設計師。',
  bio: 'Van Noten 1958 年生於安特衛普的裁縫世家，就讀皇家藝術學院。1986 年他與 Ann Demeulemeester 等五位同學開著一台貨車到倫敦參加 British Designer Show，英國媒體因唸不出他們的名字，稱之為「Antwerp Six」。他長期不做廣告，2024 年卸任，由 Julian Klausner 接任。',
  features: [
    { name: '印花與色彩的拼貼', desc: '把不同文化的印花、刺繡與色彩混搭在同一套衣服上。', clue: '花卉、民族圖案與迷彩同時出現。' },
    { name: '工藝與在地合作', desc: '長期與印度等地的刺繡工坊合作。', clue: '大量手工刺繡細節。' },
    { name: '低調經營', desc: '幾乎不買廣告，靠作品與口碑建立品牌。', clue: '一個獨立設計師也能長期存活。' }
  ],
  works: [
    { name: 'British Designer Show 倫敦發表', year: '1986', note: '他的男裝在倫敦獲得國際買手訂單，成為事業起點。' },
    { name: '安特衛普六君子 40 週年展', year: '2026', note: 'MoMu 以素描、拼貼、邀請卡等檔案，重建 1986 年倫敦之行與六人的發展。' }
  ],
  legacy: 'Antwerp Six 讓安特衛普成為時尚重鎮，也示範了不依附大集團的獨立設計師模式。',
  contrast: '對照 Margiela：同一間學院出身，Van Noten 擁抱色彩與裝飾，Margiela 走向解構與匿名。',
  question: '一個小城市的設計學院，如何改變世界的時尚地圖？',
  sources: [
    { label: 'MoMu｜The Antwerp Six（40 週年展）', url: 'https://www.momu.be/en/magazine/the-antwerp-six-geert-bruloot-kaat-debo-romy-cockx' },
    { label: 'Google Arts & Culture × MoMu｜EMERGENCE. The Antwerp 6+1', url: 'https://artsandculture.google.com/story/fAWhlnD6KqLGJg' },
    { label: 'ArtReview｜The Antwerp Six and the Problem of Now', url: 'https://artreview.com/the-antwerp-six-and-the-problem-of-now/' }
  ]
},
{
  year: 1988, person: 'Martin Margiela', house: 'Maison Martin Margiela', city: '巴黎', chapter: 'belgian',
  title: '隱形的設計師',
  tags: ['解構', '匿名', 'Tabi 靴'],
  context: '1980 年代後期是設計師明星化、商標狂熱的高峰。消費者追逐大 logo，設計師本人也成為媒體焦點。',
  bio: 'Margiela 1957 年生於比利時，畢業於安特衛普皇家藝術學院，曾任 Jean Paul Gaultier 助理約三年。1988 年與 Jenny Meirens 在巴黎創立品牌，第一場秀（1989 春夏）於 1988 年 10 月舉行。他拒絕露臉與受訪，1997–2003 年同時擔任 Hermès 女裝設計，2009 年離開自己的品牌。',
  features: [
    { name: '匿名與白標', desc: '標籤是一塊空白白布，只用四個白色縫線固定，外面看得到線頭。', clue: '衣服背後四個白點。' },
    { name: '解構與回收', desc: '把舊衣、手套、海報、盤子碎片拆解再組成新衣服，縫份與內裡外露。', clue: '像半成品，看得到製作痕跡。' },
    { name: 'Tabi 分趾靴', desc: '以日本分趾足袋為靈感，搭配圓柱形鞋跟。', clue: '鞋頭分成兩趾。' }
  ],
  works: [
    { name: '首秀與 Tabi 靴', year: '1989 春夏', note: '模特兒穿著沾紅漆的 Tabi 靴走過白色伸展台，留下腳印。' },
    { name: '海報背心', year: '1990 春夏', note: '用撕碎的海報疊在棉布上做成背心，Palais Galliera 典藏。' }
  ],
  legacy: '他讓「解構」成為主流語言，也讓設計師可以不靠個人明星形象成功；Demna 等後輩都公開承認受他影響。',
  contrast: '對照川久保玲：兩人都被稱為解構，但川久保玲重造身體輪廓，Margiela 重新思考衣服的製作過程與身分。',
  question: '如果看不到設計師是誰，我們還會想買他的衣服嗎？',
  sources: [
    { label: 'Palais Galliera｜Margiela/Galliera 1989–2009', url: 'https://www.palaisgalliera.paris.fr/en/node/1874' },
    { label: 'Palais Galliera｜Martin Margiela, Tabi boots（首秀說明）', url: 'https://www.palaisgalliera.paris.fr/en/node/3406' },
    { label: 'UAL Fashion Exhibition Making｜Margiela/Galliera 1989–2009', url: 'https://fashionexhibitionmaking.arts.ac.uk/margiela-galliera-1989-2009/' }
  ]
},
{
  year: 1993, person: 'Issey Miyake', house: 'Pleats Please Issey Miyake', city: '東京', chapter: 'japan',
  title: '先做衣服、再打褶',
  tags: ['成衣打褶', '一塊布', '科技'],
  context: '1990 年代的服裝產業開始重視機能、易保養與全球化生產。合成纖維技術成熟，讓「好穿、好洗、好收納」的高級服裝成為可能。',
  bio: '三宅一生（1938–2022）生於廣島，多摩美術大學畢業後赴巴黎、紐約學習，1970 年成立三宅設計事務所。他長期研究「一塊布（A Piece of Cloth）」的概念，1993 年推出 Pleats Please，之後與藤原大合作 A-POC。',
  features: [
    { name: '成衣打褶（garment pleating）', desc: '先把衣服裁成兩到三倍大並縫好，夾在紙中送進熱壓機，形成永久性的褶。', clue: '細密的直條褶，衣服可以拉長、壓扁。' },
    { name: '幾何與平面', desc: '很多作品平放時是幾何形狀，穿上後才變成立體。', clue: '攤平像一個方形或圓形。' },
    { name: '易保養', desc: '聚酯材料可直接機洗、不需熨燙，方便旅行收納。', clue: '可以捲起來放進包包。' }
  ],
  works: [
    { name: 'Pleats Please', year: '1993', note: 'The Met 說明他在 1993 年為此製程申請專利，並把它獨立成一條產品線。' },
    { name: '「Flying Saucer」洋裝', year: '1994 春夏', note: '褶子讓衣服像燈籠一樣伸縮。' }
  ],
  legacy: '他把科技研發與傳統工藝結合，示範了「設計就是解決問題」；Pleats Please 至今仍是長銷系列。',
  contrast: '對照 Massimo Osti：兩人都重視材料研發，Osti 從軍裝出發，三宅一生從身體與布的關係出發。',
  question: '科技能讓衣服更接近藝術，還是更接近日用品？',
  met: 762098,
  sources: [
    { label: 'The Met｜Issey Miyake Ensemble, ca. 1994（Pleats Please 製程說明）', url: 'https://www.metmuseum.org/art/collection/search/762098' },
    { label: 'The Met｜Issey Miyake Dress（garment pleating 說明）', url: 'https://www.metmuseum.org/art/collection/search/678868' },
    { label: 'ASU FIDM Museum｜Issey Miyake Pleats Please', url: 'https://asufidmmuseum.asu.edu/learn/articles/issey-miyake-pleats-please' }
  ]
},
{
  year: 1994, person: 'Rick Owens', house: 'Rick Owens', city: '洛杉磯 → 巴黎', chapter: 'american',
  title: '好萊塢大道上的暗黑垂墜',
  tags: ['暗黑', '垂墜', '另類美學'],
  context: '1990 年代中期，極簡主義與 grunge 同時流行。洛杉磯不是時尚中心，卻聚集了大量音樂、電影與地下文化。',
  bio: 'Owens 1961 年生於加州 Porterville，曾就讀 Otis 藝術設計學院，後在洛杉磯職業技術學院學打版，並在成衣廠做仿製版型。1994 年在好萊塢大道旁的店面創立品牌，伴侶 Michèle Lamy 是重要合作夥伴。2002 年在紐約首次走秀，2003 年移居巴黎。',
  features: [
    { name: '垂墜的長線條', desc: '用嫘縈 jersey、皮革做出長、窄、向下垂的輪廓。', clue: '又長又瘦、下擺不規則。' },
    { name: '灰黑色調', desc: '常被形容為「glunge」（glamour＋grunge），大量使用灰、黑、塵土色。', clue: '像被風沙洗過的顏色。' },
    { name: '挑戰美的標準', desc: '秀場常用非典型的身體與表演，探討包容與極端。', clue: '伸展台像行為藝術。' }
  ],
  works: [
    { name: '紐約首秀', year: '2002 秋冬', note: '在美國 Vogue 支持下舉行，讓他從地下品牌走向國際。' },
    { name: '「Vicious」踏步秀', year: '2014 春夏', note: '找來大學踏步舞團體走秀，挑戰伸展台的身體標準。' }
  ],
  legacy: '他證明另類、暗黑的美學也能成為長期的高級品牌，並延伸到家具設計；2017 年 Triennale di Milano 為他舉辦首次回顧展。',
  contrast: '對照 Hedi Slimane：兩人都偏好黑色與瘦長線條，Slimane 來自搖滾的銳利，Owens 來自哥德與廢墟般的柔軟垂墜。',
  question: '時尚可以只為「小眾」存在嗎？',
  sources: [
    { label: 'Dazed｜Talking to Rick Owens about his new retrospective (Triennale di Milano, 2017)', url: 'https://www.dazeddigital.com/fashion/article/38413/1/rick-owens-interview-subhuman-inhuman-superhuman-retrospective-exhibition-milan' },
    { label: 'Palais Galliera｜Rick Owens（館藏說明）', url: 'https://www.palaisgalliera.paris.fr/en/node/3452' },
    { label: 'Carpenters Workshop Gallery｜Rick Owens Biography (PDF)', url: 'https://carpentersworkshopgallery.com/wp-content/uploads/2019/09/RICK-OWENS_BIOGRAPHY.pdf' }
  ]
},
{
  year: 1997, person: 'John Galliano', house: 'Dior', city: '巴黎', chapter: 'couture',
  title: '高級訂製服的「大爆炸」',
  tags: ['歷史戲劇', '斜裁', '高訂復興'],
  context: '1990 年代中期，高級訂製服被認為正在沒落。LVMH 收購老牌時裝屋後，大膽任命英國年輕設計師：1996 年 McQueen 接 Givenchy，Galliano 接 Dior。Vogue Paris 把 1997 年春夏高訂季稱為巴黎需要的「Big Bang」。',
  bio: 'Galliano 1960 年生於直布羅陀，1984 年中央聖馬丁畢業作「Les Incroyables」以法國大革命時期服裝為靈感，全數被精品店買下。1995 年接掌 Givenchy，1996 年轉任 Dior，1997 年 1 月發表第一個 Dior 高訂系列，任期至 2011 年（因公開發表反猶言論被解職）。2014–2024 年擔任 Maison Margiela 創意總監。',
  features: [
    { name: '歷史變裝劇', desc: '每一季像一部電影，從美好年代、埃及、中國到各種歷史時期取材。', clue: '誇張妝髮＋完整角色設定。' },
    { name: '斜裁技術', desc: '擅長 1930 年代式的斜裁，讓布料貼身流動。', clue: '絲緞洋裝像水一樣服貼。' },
    { name: '戲劇化秀場', desc: '把時裝秀變成大型演出，強化品牌的夢想感。', clue: '場景、音樂、角色都很重。' }
  ],
  works: [
    { name: '首個 Dior 高訂系列', year: '1997 春夏', note: '在 Dior 品牌 50 週年時發表，被視為高訂復興的象徵。' },
    { name: 'Dior 1997–98 秋冬高訂', year: '1997', note: 'Palais Galliera 指出其靈感來自美好年代（1898–1908）的時尚。' }
  ],
  legacy: '他讓高級訂製服重新成為話題，也確立了「老牌由明星設計師翻新」的產業模式。',
  contrast: '對照 Dior 本人：1947 年的 Dior 創造新輪廓，1997 年的 Galliano 則是用戲劇重新包裝 Dior 的歷史。',
  question: '老品牌換上新設計師，應該延續傳統，還是打破傳統？',
  met: 87845,
  sources: [
    { label: 'Palais Galliera｜1997 Fashion Big Bang 新聞稿（PDF）', url: 'https://www.palaisgalliera.paris.fr/sites/galliera/files/cp_dp_visuels/dossiers_de_presse/dp_1997_uk_bd_0.pdf' },
    { label: 'Palais Galliera｜John Galliano for Dior, AW 1997–98', url: 'https://www.palaisgalliera.paris.fr/en/node/3635' },
    { label: 'The Met｜Galliano for Dior Ensemble, fall/winter 1997–98', url: 'https://www.metmuseum.org/art/collection/search/87845' }
  ]
},
{
  year: 1999, person: 'Alexander McQueen', house: 'Alexander McQueen', city: '倫敦', chapter: 'subculture',
  title: '人與機器：No.13 的噴漆洋裝',
  tags: ['裁縫技術', '秀場表演', '浪漫與暴力'],
  context: '世紀末的時尚充滿對科技、身體與未來的焦慮。倫敦年輕設計師以挑釁的秀場吸引全球目光，「酷不列顛」成為文化話題。',
  bio: 'McQueen（1969–2010）16 歲輟學到薩佛街學徒，在 Anderson & Sheppard、Gieves & Hawkes 學會傳統西裝裁縫。1992 年中央聖馬丁碩士畢業作被造型師 Isabella Blow 全數買下。1996–2001 年同時擔任 Givenchy 設計師。The Met 2011 年與 V&A 2015 年的「Savage Beauty」回顧展都創下參觀紀錄。',
  features: [
    { name: '薩佛街剪裁', desc: '極精準的西裝結構，是他所有誇張造型的基礎。', clue: '線條銳利、肩線精準。' },
    { name: '秀場即表演', desc: '把伸展台變成劇場與裝置藝術，引發強烈情緒。', clue: '一場秀被記住的是「事件」。' },
    { name: '美與暴力並存', desc: '把歷史、自然、死亡與浪漫放在一起，挑戰觀眾的舒適感。', clue: '蕾絲配皮革、羽毛配骨架。' }
  ],
  works: [
    { name: 'No.13 噴漆洋裝', year: '1999 春夏', note: '模特兒 Shalom Harlow 在旋轉台上，被兩台工業機器人噴上黑與黃色顏料。' },
    { name: '雕花木製義肢', year: '1999 春夏', note: '同場秀中運動員 Aimee Mullins 穿著手工雕刻的木製義肢走秀。' }
  ],
  legacy: '他讓時裝秀成為藝術事件，也證明傳統工藝與前衛概念可以並存；「噴漆洋裝」至今仍被不斷引用。',
  contrast: '對照 Galliano：兩人都在 1990 年代後期接手巴黎老牌，Galliano 偏向歷史幻想，McQueen 偏向黑暗與衝突。',
  question: '時裝秀如果能讓人落淚，它還只是商品發表嗎？',
  met: 163152,
  sources: [
    { label: 'The Met｜Savage Beauty: Dress, No. 13, spring/summer 1999', url: 'https://blog.metmuseum.org/alexandermcqueen/dress-no-13' },
    { label: 'V&A｜The Museum of Savage Beauty: No.13', url: 'https://www.vam.ac.uk/museumofsavagebeauty/rel/encyclopedia-of-collections-no-13/' },
    { label: 'V&A｜Fashion in Motion: Alexander McQueen', url: 'https://www.vam.ac.uk/articles/fashion-in-motion-alexander-mcqueen' }
  ]
},
{
  year: 2000, person: 'Hedi Slimane', house: 'Dior Homme', city: '巴黎', chapter: 'modern',
  title: '男裝的「窄」革命',
  tags: ['Skinny 輪廓', '搖滾', '男裝'],
  context: '1990 年代男裝以寬鬆西裝與休閒服為主。2000 年代初，獨立搖滾樂團與年輕男性形象改變，時尚開始尋找新的男性身體。',
  bio: 'Slimane 1968 年生於巴黎，主修藝術史，1997–2000 年負責 YSL Rive Gauche 男裝，2000 年秋冬「Black Tie」系列首次提出極窄輪廓。之後他把 Dior 男裝改名為 Dior Homme，擔任創意總監到 2007 年；後來執掌 Saint Laurent（2012–2016）與 Celine（2018–2024），同時是攝影師。',
  features: [
    { name: '極窄輪廓', desc: '窄肩、窄腰、極細長褲，徹底改變男性西裝的比例。', clue: 'Skinny 褲＋短版窄西裝。' },
    { name: '搖滾樂作為靈感', desc: '從英國獨立搖滾樂團取材，秀場音樂常由樂團創作。', clue: '黑西裝、細領帶、瘦長的樂手形象。' },
    { name: '黑白影像', desc: '親自拍攝廣告與青年文化，建立強烈統一的視覺。', clue: '高反差黑白照片。' }
  ],
  works: [
    { name: '「Black Tie」系列', year: '2000 秋冬（YSL）', note: '被視為 skinny 男裝輪廓的起點。' },
    { name: 'Dior Homme 首季', year: '2001 秋冬', note: '把 Dior Monsieur 重新命名，建立整套新男裝語言。' }
  ],
  legacy: 'Britannica 指出他的窄輪廓主導男裝十多年；skinny jeans 從伸展台走向全世界的街頭。',
  contrast: '對照 Armani：Armani 讓男西裝變得寬鬆柔軟，Slimane 讓它變得極窄銳利——兩次男裝革命方向相反。',
  question: '一個設計師的「理想身材」，會不會變成所有人的壓力？',
  sources: [
    { label: 'Britannica｜Hedi Slimane', url: 'https://www.britannica.com/print/article/1249710' },
    { label: 'Palais Galliera｜Hedi Slimane（館藏說明）', url: 'https://www.palaisgalliera.paris.fr/en/node/3593' },
    { label: 'UAL Research Online｜McCauley Bowstead, Hedi Slimane & the reinvention of menswear', url: 'https://ualresearchonline.arts.ac.uk/id/eprint/15657/3/McCauley%20Bowstead%20Hedi%20Slimane%20manuscript.pdf' }
  ]
},
{
  year: 2013, person: 'Virgil Abloh', house: 'Off-White', city: '米蘭 / 芝加哥', chapter: 'american',
  title: '街頭服裝走進精品殿堂',
  tags: ['街頭服裝', '引號', '跨界'],
  context: '2010 年代社群媒體興起，球鞋、嘻哈與街頭文化成為年輕人的主流。精品品牌急需與新世代對話，「限量」與「聯名」成為新的商業語言。',
  bio: 'Abloh（1980–2021）生於伊利諾州羅克福德，主修土木工程，後取得伊利諾理工學院建築碩士。他長期擔任 Kanye West 的創意總監，2012 年推出 Pyrex Vision，2013 年在米蘭創立 Off-White。2018 年成為 Louis Vuitton 男裝藝術總監，是該職位首位黑人設計師。',
  features: [
    { name: '引號與標示', desc: '在商品上加上引號文字（如 "SHOELACES"），讓日常物件變成被評論的對象。', clue: '大寫引號字樣。' },
    { name: '斜紋與工業符號', desc: '黑白斜紋、工業用束帶，把工地與城市符號變成品牌標誌。', clue: '黑白斜條紋＋紅色束帶。' },
    { name: '「3% 原則」', desc: '他主張只改動既有設計的一小部分，就能創造新意義。', clue: '經典鞋款上加幾個小改動。' }
  ],
  works: [
    { name: 'Off-White 創立', year: '2013', note: 'MCA Chicago 展出他第一個系列的斜紋風衣。' },
    { name: 'Louis Vuitton 男裝首秀', year: '2019 春夏', note: '2018 年 6 月於巴黎發表，以多元族群的模特兒陣容引起關注。' }
  ],
  legacy: '他打通街頭服裝與精品的界線；2019 年 MCA Chicago 的「Figures of Speech」是第一個以他為主題的博物館展覽。',
  contrast: '對照 Ralph Lauren：兩人都沒受過正式時裝訓練，Lauren 包裝上流傳統，Abloh 則把街頭文化帶進上流殿堂。',
  question: '當街頭文化成為奢侈品，誰從中受益？',
  sources: [
    { label: 'Britannica｜Virgil Abloh', url: 'https://www.britannica.com/biography/Virgil-Abloh' },
    { label: 'MCA Chicago｜Virgil Abloh: "Figures of Speech" (2019)', url: 'https://mcachicago.org/Exhibitions/2019/Virgil-Abloh' }
  ]
},
{
  year: 2017, person: 'Phoebe Philo', house: 'Céline', city: '巴黎 / 倫敦', chapter: 'modern',
  title: '為女性自己設計的極簡',
  tags: ['極簡', '女性觀點', 'Old Céline'],
  context: '2008 年金融危機後，炫耀式消費退燒，「安靜的奢華」開始受重視。2010 年代社群媒體加速潮流循環，也讓實穿、耐看的衣服更顯珍貴。',
  bio: 'Philo 1973 年生於巴黎，中央聖馬丁畢業，2001–2006 年擔任 Chloé 創意總監。2008 年受 LVMH 邀請接掌 Céline，讓沉寂的品牌重新受到關注，2017 年宣布離開（最後一季為 2018 秋冬）。2023 年推出同名品牌。',
  features: [
    { name: '女性視角', desc: '從職業女性的實際生活出發，設計好穿、能工作、不取悅他人的衣服。', clue: '寬褲、平底鞋、大外套。' },
    { name: '精準的極簡', desc: '色彩安靜、剪裁乾淨，但比例與材質很講究。', clue: '單色、少裝飾、份量感強。' },
    { name: '反社群', desc: '任內長期抗拒社群媒體與電商，讓品牌保有距離感。', clue: '「沒有 logo 的辨識度」。' }
  ],
  works: [
    { name: 'Céline 首個系列', year: '2010 早春', note: '一推出就獲好評，奠定此後十年的極簡路線。' },
    { name: 'Joan Didion 廣告', year: '2015', note: '由 Juergen Teller 拍攝作家 Joan Didion，強化知性女性形象。' }
  ],
  legacy: '她定義了 2010 年代的女性極簡美學，粉絲甚至以「Old Céline」懷念她的時期；BoF 形容她把 Céline 變成被大量模仿的品牌。',
  contrast: '對照 Chanel：兩人相隔近一世紀，都主張讓女性穿得自在；Chanel 解放身體，Philo 解放「被觀看」的壓力。',
  question: '「安靜」的衣服為什麼能在吵鬧的社群時代被記住？',
  sources: [
    { label: 'Britannica｜Phoebe Philo', url: 'https://www.britannica.com/print/article/1742163' },
    { label: 'The Business of Fashion｜Phoebe Philo', url: 'https://businessoffashion.com/tags/people/phoebe-philo/' }
  ]
}
];

/* 原站 22 站中，以下 Westwood 年份已依出處更正為 1971。 */
const TM_ROUTES = [
  { id: 'all', name: '新手完整旅程' },
  { id: 'couture', name: '巴黎高級訂製服' },
  { id: 'modern', name: '現代衣櫥的誕生' },
  { id: 'japan', name: '日本前衛' },
  { id: 'belgian', name: '安特衛普與解構' },
  { id: 'italian', name: '米蘭與義大利工藝' },
  { id: 'subculture', name: '次文化與反叛' },
  { id: 'american', name: '美國與街頭' }
];
