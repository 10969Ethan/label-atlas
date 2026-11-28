"""設計師職涯（任職品牌）與聯名合作。執行後寫入 designers.json 的 profile.career / profile.collabs。

  python3 tools/careers.py

career：[年份, 職位, 品牌／機構]
collabs：[年份, 合作對象, 內容]
只收錄能查證的公開資訊；不確定的年份留空字串。
"""
import json, os

C = {
'yohji-yamamoto': ([['1972', '創辦人', "Y's"], ['1981', '創辦人・首次巴黎發表', 'Yohji Yamamoto'], ['2002–', '創意總監', 'Y-3（與 adidas）']],
  [['2002', 'adidas', '共同推出 Y-3，結合前衛設計與運動機能'], ['1989', 'Wim Wenders', '紀錄片《都市時裝速記》（Notebook on Cities and Clothes）記錄他的創作']]),
'issey-miyake': ([['1966', '助理', 'Guy Laroche'], ['1968', '助理', 'Givenchy'], ['1969', '設計師', 'Geoffrey Beene（紐約）'], ['1970', '創辦人', 'Miyake Design Studio'], ['1993', '推出', 'PLEATS PLEASE'], ['1998', '與藤原大推出', 'A-POC'], ['2010', '推出', '132 5. ISSEY MIYAKE']],
  [['1987–1999', 'Irving Penn', '攝影師長期拍攝他的作品，出版多本攝影集'], ['1991', 'William Forsythe', '為法蘭克福芭蕾舞團設計舞衣，催生了褶皺服裝'], ['', 'Steve Jobs', '為賈伯斯製作招牌的黑色高領衫']]),
'kenzo-takada': ([['1964', '移居巴黎', ''], ['1970', '開設 Jungle Jap 精品店', 'KENZO'], ['1993', '品牌售予 LVMH', 'KENZO'], ['1999', '退休', ''], ['2020', '推出生活品牌', 'K-3']],
  [['2019', 'Roche Bobois', '為家具品牌設計 Mah Jong 沙發布料']]),
'hanae-mori': ([['1951', '開設工作室', '東京'], ['1965', '首次在紐約發表', 'Hanae Mori'], ['1977', '成為巴黎高級訂製時裝公會成員', 'Hanae Mori Haute Couture'], ['2004', '舉辦最後一場高級訂製秀', '']],
  [['1950–60 年代', '日本電影', '為數百部電影設計戲服'], ['', '日本航空', '設計空服員制服']]),
'junya-watanabe': ([['1984', '打版師', 'Comme des Garçons'], ['1987', '設計師', 'Comme des Garçons Tricot'], ['1992', '推出', 'JUNYA WATANABE COMME des GARÇONS'], ['2001', '推出', 'JUNYA WATANABE MAN']],
  [['', "Levi's", '長期改造經典牛仔單品'], ['', 'The North Face', '機能外套改造系列'], ['', 'Carhartt', '工作服拼接系列'], ['', 'New Balance', '球鞋合作'], ['', 'Nike', '球鞋合作']]),
'nigo': ([['1993', '創辦人', 'A BATHING APE'], ['2003', '與 Pharrell 共同創立', 'Billionaire Boys Club／ICECREAM'], ['2010', '創辦人', 'HUMAN MADE'], ['2014', '創意總監', 'UNIQLO UT'], ['2021–', '藝術總監', 'KENZO']],
  [['2003', 'Pharrell Williams', '共同創立 BBC／ICECREAM'], ['2020', 'Louis Vuitton', '與 Virgil Abloh 推出 LV² 系列'], ['', 'UNIQLO', 'UT 系列']]),
'guo-pei': ([['1997', '創辦人', '玫瑰坊'], ['2016', '巴黎高級訂製時裝公會客座會員', 'Guo Pei']],
  [['2008', '北京奧運', '設計頒獎禮服'], ['2015', 'Rihanna', '大都會博物館慈善晚宴的黃色長披風']]),
'ma-ke': ([['1996', '共同創立', '例外 EXCEPTION de MIXMIND'], ['2006', '創辦人・巴黎發表', '無用 WUYONG']],
  [['2007', '賈樟柯', '紀錄片《無用》記錄她的創作']]),
'shiatzy-chen': ([['1978', '創辦人', '夏姿・陳'], ['2001', '開設巴黎旗艦店', ''], ['2008', '進入巴黎時裝週', '']], []),
'rei-kawakubo': ([['1964', '廣告部門', '旭化成'], ['1969', '開始以 Comme des Garçons 為名設計', ''], ['1973', '創辦人', 'Comme des Garçons'], ['2004', '開設', 'Dover Street Market']],
  [['2008', 'H&M', '設計師聯名系列'], ['2008', 'Louis Vuitton', '包款合作'], ['2009', 'Converse', 'PLAY 系列帆布鞋'], ['', 'Nike', '多次球鞋合作'], ['', 'Supreme', '多次聯名']]),
'jun-takahashi': ([['1993', '創辦人', 'UNDERCOVER'], ['1993', '與 NIGO 合開', 'NOWHERE'], ['2002', '首次巴黎發表', 'UNDERCOVER']],
  [['2010', 'Nike', 'GYAKUSOU 跑步系列'], ['2010', 'UNIQLO', 'UU 系列'], ['2019', 'Valentino', '男裝系列合作'], ['', 'Supreme', '多次聯名']]),
'chitose-abe': ([['', '企劃', 'World'], ['', '打版師', 'Comme des Garçons'], ['', '打版', 'JUNYA WATANABE'], ['1999', '創辦人', 'sacai']],
  [['2015', 'Nike', '首次球鞋與服裝合作'], ['2019', 'Nike', 'LDWaffle'], ['2021', 'Jean Paul Gaultier', '客座設計高級訂製系列'], ['2022', 'Carhartt WIP', '工作服合作']]),
'hiroshi-fujiwara': ([['1990', '參與創立', 'GOODENOUGH'], ['2003', '創辦人', 'fragment design']],
  [['2002', 'Nike', '與 Mark Parker、Tinker Hatfield 組成 HTM'], ['2017', 'Louis Vuitton', '聯名系列'], ['2018', 'Moncler', 'Moncler Genius 7 FRAGMENT'], ['2021', '寶可夢', 'THUNDERBOLT PROJECT']]),
'uma-wang': ([['2009', '創辦人', 'UMA WANG'], ['2017', '進入巴黎官方時裝週', '']], [['2022', '聯合國難民署', '公益合作']]),
'vivienne-tam': ([['1981', '移居紐約', ''], ['1990 年代', '創辦人', 'Vivienne Tam']], [['2009', '惠普 HP', '設計筆記型電腦外殼']]),
'sophie-hong': ([['1985', '創辦人', '洪麗芬']], [['', '音樂、戲劇與舞蹈團體', '設計表演服裝']]),
'manish-arora': ([['1997', '創辦人', 'Manish Arora'], ['2001', '推出', 'Fish Fry'], ['2011–2012', '女裝創意總監', 'Paco Rabanne']], [['2001', 'Reebok', '合作推出運動風副牌 Fish Fry']]),
'sabyasachi-mukherjee': ([['1999', '創辦人', 'Sabyasachi']], [['2017', 'Christian Louboutin', '鞋款合作'], ['2018', 'Estée Lauder', '彩妝合作'], ['2021', 'H&M', '設計師聯名系列']]),
'yiqing-yin': ([['2010', '首個系列', 'Yiqing Yin'], ['2011', '巴黎高級訂製時裝公會客座會員', '']], []),
'robert-wun': ([['2014', '創辦人', 'Robert Wun']], []),
'nora-noh': ([['1952', '創辦人', 'House of Nora Noh']], [['1959', '環球小姐選美', '阿里郎禮服'], ['1960 年代', '尹福姬', '歌手造型與迷你裙']]),
'andre-kim': ([['1962', '創辦人', 'Salon André']], [['1988', '首爾奧運', '韓國選手服裝']]),
'lee-young-hee': ([['1970 年代', '開始設計韓服', ''], ['2004', '創辦人', '紐約韓國文化博物館']], []),
'lie-sang-bong': ([['1993', '首爾時裝週首次發表', 'LIE SANGBONG'], ['2002', '首次巴黎發表', '']], []),
'jin-teok': ([['1965', '創辦人', 'Francoise'], ['1990', '組織', '首爾時裝藝術家協會']], [['1988', '首爾奧運', '典禮服裝']]),
'woo-young-mi': ([['1988', '創辦人', 'SOLID HOMME'], ['2002', '創辦人', 'WOOYOUNGMI']], []),
'juun-j': ([['2007', '首次巴黎發表', 'JUUN.J']], [['2020', 'adidas', '球鞋與服裝合作']]),
'kathleen-kye': ([['2010', '創辦人', 'KYE']], []),
'minju-kim': ([['2015', '創辦人', 'MINJUKIM']], [['', 'Red Velvet', '女團舞台服裝'], ['2020', 'Netflix', '《Next in Fashion》冠軍']]),
'ader-error': ([['2014', '成立', 'ADER ERROR']], [['', 'PUMA', '球鞋合作'], ['2022', 'ZARA', '聯名系列']]),
'andersson-bell': ([['2014', '成立', 'Andersson Bell']], []),
'kimseoryong': ([['', '創辦人', 'KIMSEORYONG']], []),
'charles-frederick-worth': ([['1840 年代', '店員', 'Gagelin（巴黎）'], ['1858', '與 Otto Bobergh 創立', 'House of Worth']], [['', '歐仁妮皇后', '成為皇后的御用設計師']]),
'coco-chanel': ([['1910', '開設帽店', 'Chanel Modes（康朋街）'], ['1913', '開設精品店', '杜維爾'], ['1915', '開設時裝屋', '比亞里茨'], ['1939', '關閉時裝店', ''], ['1954', '重返時裝界', 'Chanel']],
  [['1921', '調香師 Ernest Beaux', '推出 N°5 香水']]),
'christian-dior': ([['1938', '設計師', 'Robert Piguet'], ['1941', '設計師', 'Lucien Lelong'], ['1946', '創辦人', 'Christian Dior']], [['1946', 'Marcel Boussac', '紡織業鉅子出資成立時裝屋']]),
'yves-saint-laurent': ([['1955', '助理', 'Christian Dior'], ['1957–1960', '首席設計師', 'Christian Dior'], ['1961', '與 Pierre Bergé 創立', 'Yves Saint Laurent'], ['1966', '推出成衣線', 'Saint Laurent Rive Gauche'], ['2002', '退休', '']],
  [['1965', '蒙德里安（藝術）', '以其畫作為靈感的洋裝'], ['1966', 'Catherine Deneuve', '長期為其設計電影與私人服裝']]),
'cristobal-balenciaga': ([['1917', '開店', '聖塞巴斯蒂安'], ['1937', '開設時裝屋', '巴黎'], ['1968', '關閉時裝屋', '']], [['1969', '法國航空', '設計空服員制服，是他最後的作品之一']]),
'elsa-schiaparelli': ([['1927', '開始設計', 'Schiaparelli'], ['1954', '關閉時裝屋', '']], [['1937', 'Salvador Dalí', '龍蝦洋裝、鞋子帽'], ['1937', 'Jean Cocteau', '刺繡圖案設計']]),
'hubert-de-givenchy': ([['1945', '助理', 'Jacques Fath'], ['', '設計師', 'Robert Piguet、Lucien Lelong'], ['1947–1951', '設計師', 'Schiaparelli'], ['1952', '創辦人', 'Givenchy'], ['1995', '退休', '']],
  [['1954', 'Audrey Hepburn', '《龍鳳配》等多部電影服裝'], ['1961', 'Audrey Hepburn', '《第凡內早餐》小黑裙']]),
'paul-poiret': ([['1898', '設計師', 'Jacques Doucet'], ['1901', '設計師', 'House of Worth'], ['1903', '創辦人', 'Paul Poiret'], ['1911', '推出香水', 'Parfums de Rosine']],
  [['1908', 'Paul Iribe', '插畫集《Les Robes de Paul Poiret》'], ['1911', 'Raoul Dufy', '布料印花設計']]),
'madeleine-vionnet': ([['', '設計師', 'Callot Sœurs'], ['1907–1911', '設計師', 'Jacques Doucet'], ['1912', '創辦人', 'Vionnet'], ['1939', '關閉時裝屋', '']], [['1919', 'Thayaht', '設計品牌標誌與時裝插畫']]),
'pierre-cardin': ([['', '學徒', 'Paquin'], ['', '設計師', 'Schiaparelli'], ['1947', '工坊主管', 'Christian Dior'], ['1950', '創辦人', 'Pierre Cardin']],
  [['1959', 'Printemps 百貨', '推出設計師成衣'], ['1972', 'AMC', '設計 Javelin 汽車內裝']]),
'paco-rabanne': ([['1966', '創辦人', 'Paco Rabanne']], [['1968', '電影《太空英雌芭芭麗娜》', '服裝設計'], ['1969', 'Puig', '推出 Calandre 香水']]),
'mary-quant': ([['1955', '與 Alexander Plunket Greene 開設', 'Bazaar'], ['1963', '推出', 'Ginger Group'], ['1966', '推出化妝品', 'Mary Quant Cosmetics']], [['1962', 'J.C. Penney', '在美國百貨推出系列']]),
'karl-lagerfeld': ([['1955', '助理', 'Pierre Balmain'], ['1958–1963', '藝術總監', 'Jean Patou'], ['1964–1983', '設計師', 'Chloé'], ['1965–2019', '創意總監', 'Fendi'], ['1983–2019', '創意總監', 'Chanel'], ['1984', '創辦人', 'Karl Lagerfeld'], ['1992–1997', '設計師（再度）', 'Chloé']],
  [['2004', 'H&M', '首個精品設計師聯名系列'], ['2011', 'Coca-Cola', 'Diet Coke 瓶身設計']]),
'vivienne-westwood': ([['1971', '與 Malcolm McLaren 開店', 'Let It Rock（國王路 430 號）'], ['1974', '店名改為', 'SEX'], ['1976', '店名改為', 'Seditionaries'], ['1980', '店名改為', 'Worlds End'], ['1981', '首次時裝秀', 'Vivienne Westwood']],
  [['1970 年代', 'Sex Pistols', '樂團的龐克造型'], ['', 'Melissa', '塑膠鞋合作'], ['2018', 'Burberry', '聯名系列']]),
'alexander-mcqueen': ([['', '學徒', 'Anderson & Sheppard（薩佛街）'], ['', '學徒', 'Gieves & Hawkes'], ['', '助理', 'Koji Tatsuno、Romeo Gigli'], ['1992', '創辦人', 'Alexander McQueen'], ['1996–2001', '首席設計師', 'Givenchy']],
  [['1997', 'Björk', '專輯《Homogenic》封面造型'], ['2005', 'Puma', '球鞋合作'], ['2009', 'Target', 'McQ 平價系列']]),
'john-galliano': ([['1984', '創辦人', 'John Galliano'], ['1995', '設計師', 'Givenchy'], ['1996–2011', '創意總監', 'Dior'], ['2014–2024', '創意總監', 'Maison Margiela']], []),
'jean-paul-gaultier': ([['1970', '助理', 'Pierre Cardin'], ['', '設計師', 'Jacques Esterel、Jean Patou'], ['1976', '創辦人', 'Jean Paul Gaultier'], ['2003–2010', '女裝創意總監', 'Hermès']],
  [['1990', 'Madonna', 'Blond Ambition 巡迴演唱會服裝'], ['1997', '電影《第五元素》', '服裝設計'], ['2010', 'Target', '平價聯名系列'], ['2012', 'Diet Coke', '瓶身設計'], ['2019', 'Supreme', '聯名系列']]),
'azzedine-alaia': ([['1957', '短暫任職', 'Christian Dior'], ['', '設計師', 'Guy Laroche'], ['1980 年代初', '推出自己的系列', 'Alaïa']], [['1991', 'Tati', '以平價百貨招牌的粉紅格紋做系列']]),
'martin-margiela': ([['1984–1987', '助理', 'Jean Paul Gaultier'], ['1988', '與 Jenny Meirens 創立', 'Maison Martin Margiela'], ['1997–2003', '女裝設計師', 'Hermès'], ['2009', '離開品牌', '']], []),
'ann-demeulemeester': ([['1985', '與 Patrick Robyn 創立', 'Ann Demeulemeester'], ['2013', '離開品牌', '']], [['', 'Patti Smith', '長期的靈感與友誼']]),
'dries-van-noten': ([['1986', '創辦人', 'Dries Van Noten'], ['2018', '品牌由 Puig 收購多數股權', ''], ['2024', '退休', '']], [['2020', 'Christian Lacroix', '2020 春夏共同設計系列']]),
'raf-simons': ([['1995', '創辦人', 'Raf Simons'], ['2005–2012', '創意總監', 'Jil Sander'], ['2012–2015', '創意總監', 'Christian Dior'], ['2016–2018', '創意總監', 'Calvin Klein'], ['2020–', '共同創意總監', 'Prada'], ['2022', '關閉同名品牌', '']],
  [['', 'adidas', 'Ozweego 等球鞋'], ['', 'Fred Perry', 'Polo 衫系列'], ['', 'Eastpak', '後背包系列'], ['', 'Sterling Ruby', '藝術家合作']]),
'helmut-lang': ([['1986', '首次巴黎發表', 'Helmut Lang'], ['1998', '品牌移至紐約', ''], ['1999', 'Prada 集團入股', ''], ['2005', '離開品牌', '']], [['1990 年代', 'Jenny Holzer', '藝術裝置合作']]),
'jil-sander': ([['1968', '開設精品店', '漢堡'], ['1973', '創辦人', 'Jil Sander'], ['1999', 'Prada 集團收購', ''], ['2003–2004', '回歸品牌', 'Jil Sander'], ['2012–2013', '再度回歸', 'Jil Sander']], [['2009–2011', 'UNIQLO', '+J 系列'], ['2020', 'UNIQLO', '+J 系列回歸']]),
'miuccia-prada': ([['1978', '接手家族品牌', 'Prada'], ['1993', '推出', 'Miu Miu'], ['1993', '成立', 'Prada 基金會'], ['2020–', '與 Raf Simons 共同創意總監', 'Prada']],
  [['2001', 'Rem Koolhaas／OMA', '紐約 Prada Epicenter 旗艦店'], ['2019', 'adidas', '聯名球鞋與包款']]),
'giorgio-armani': ([['', '櫥窗設計與採購', 'La Rinascente 百貨'], ['1960 年代', '男裝設計師', 'Nino Cerruti'], ['1975', '與 Sergio Galeotti 創立', 'Giorgio Armani']],
  [['1980', '電影《美國舞男》', '男主角服裝'], ['2012–', '義大利奧運代表團', '設計開閉幕與選手服裝']]),
'gianni-versace': ([['1970 年代', '設計師', 'Genny、Complice、Callaghan'], ['1978', '創辦人', 'Versace']], [['', 'Maurice Béjart、斯卡拉歌劇院', '芭蕾與歌劇服裝'], ['', 'Richard Avedon', '品牌形象攝影']]),
'valentino-garavani': ([['1950 年代', '助理', 'Jean Dessès、Guy Laroche'], ['1959', '創辦人', 'Valentino（羅馬）'], ['2008', '退休', '']], [['1960', 'Giancarlo Giammetti', '成為一生的事業夥伴'], ['1968', '賈桂琳·甘迺迪', '婚禮禮服']]),
'massimo-osti': ([['1971', '創辦人', 'Chester Perry（後改名 C.P. Company）'], ['1982', '創辦人', 'Stone Island'], ['1990 年代', '離開 C.P. Company', '']], [['1988', 'Mille Miglia 賽車', '護目鏡外套']]),
'phoebe-philo': ([['1997–2001', '助理', 'Chloé（Stella McCartney）'], ['2001–2006', '創意總監', 'Chloé'], ['2008–2017', '創意總監', 'Céline'], ['2023', '創辦人', 'Phoebe Philo']], []),
'hedi-slimane': ([['1997–2000', '男裝設計', 'Yves Saint Laurent'], ['2000–2007', '創意總監', 'Dior Homme'], ['2012–2016', '創意總監', 'Saint Laurent'], ['2018–2024', '創意總監', 'Celine']], []),
'demna': ([['2009–2013', '設計師', 'Maison Martin Margiela'], ['2013', '資深設計師', 'Louis Vuitton'], ['2014', '共同創辦', 'VETEMENTS'], ['2015–2025', '創意總監', 'Balenciaga'], ['2025–', '創意總監', 'Gucci']],
  [['2017', 'Crocs', 'Balenciaga 厚底布希鞋'], ['2021', 'Gucci', 'The Hacker Project'], ['2021', '《要塞英雄》Fortnite', '遊戲虛擬服裝'], ['2021', '《辛普森家庭》', '時裝秀特別篇'], ['2022', 'adidas', '聯名系列']]),
'claire-mccardell': ([['1930 年代', '設計師', 'Townley Frocks'], ['1938', '短暫任職', 'Hattie Carnegie']], [['', 'Capezio', '芭蕾平底鞋']]),
'halston': ([['1959', '帽子設計師', 'Bergdorf Goodman'], ['1968', '創辦人', 'Halston'], ['1983', '授權合作', 'J.C. Penney']], [['1961', '賈桂琳·甘迺迪', '就職典禮藥盒帽'], ['1977', 'Braniff 航空', '空服員制服'], ['1978', '美國女童軍', '制服設計']]),
'stephen-burrows': ([['1970', '開設專櫃', "Stephen Burrows' World（Henri Bendel）"]], [['1973', '凡爾賽之戰時裝秀', '代表美國參展']]),
'willi-smith': ([['1976', '與 Laurie Mallet 創立', 'WilliWear']], [['1983', 'Christo & Jeanne-Claude', '為《被包圍的島嶼》工作人員設計制服'], ['', 'Butterick', '可自己縫製的紙型系列']]),
'patrick-kelly': ([['1979', '移居巴黎', ''], ['1987', '與 Warnaco 簽約', 'Patrick Kelly Paris'], ['1988', '加入法國成衣設計師公會', '']], []),
'dapper-dan': ([['1982', '創辦人', "Dapper Dan's Boutique（哈林區）"], ['2018', '開設工作室', "Dapper Dan's of Harlem"]], [['2017', 'Gucci', '聯名系列與工作室合作']]),
'calvin-klein': ([['1968', '與 Barry Schwartz 創立', 'Calvin Klein'], ['2003', '品牌售予', 'PVH']], [['1980', 'Brooke Shields', '牛仔褲廣告']]),
'ralph-lauren': ([['1967', '推出', 'Polo 領帶'], ['1971', '推出女裝', 'Ralph Lauren'], ['1972', '推出 Polo 衫', 'Polo Ralph Lauren']], [['1974', '電影《大亨小傳》', '男裝'], ['2006–', '溫布頓網球賽', '工作人員服裝'], ['2008–', '美國奧運代表團', '開閉幕服裝']]),
'donna-karan': ([['1968–1984', '設計師・首席設計師', 'Anne Klein'], ['1984', '與 Stephan Weiss 創立', 'Donna Karan New York'], ['1989', '推出', 'DKNY']], []),
'diane-von-furstenberg': ([['1970', '創辦人', 'DVF'], ['2006–2019', '主席', '美國時裝設計師協會 CFDA']], [['2014', 'Google Glass', '眼鏡框設計']]),
'tommy-hilfiger': ([['1969', '開設', "People's Place"], ['1985', '創辦人', 'Tommy Hilfiger'], ['2010', '品牌由 PVH 收購', '']], [['2016–2018', 'Gigi Hadid', 'TommyXGigi 系列'], ['2018', 'Lewis Hamilton', 'TommyXLewis 系列'], ['2019', 'Zendaya', 'TommyXZendaya 系列']]),
'oscar-de-la-renta': ([['1950 年代', '助理', 'Balenciaga（馬德里）'], ['1961', '助理', 'Lanvin'], ['1963', '設計師', 'Elizabeth Arden'], ['1965', '創辦人', 'Oscar de la Renta'], ['1993–2002', '高級訂製設計師', 'Balmain']], []),
'carolina-herrera': ([['1980', '創辦人', 'Carolina Herrera'], ['2018', '交棒創意總監', 'Wes Gordon']], [['1986', 'Caroline Kennedy', '婚紗']]),
'anna-sui': ([['1991', '首場時裝秀', 'Anna Sui'], ['1992', '開設蘇活區首家店', '']], [['2009', 'Target', '以《花邊教主》為靈感的系列']]),
'vera-wang': ([['1971–1987', '時尚編輯', 'Vogue'], ['1987–1989', '設計總監', 'Ralph Lauren'], ['1990', '創辦人', 'Vera Wang（婚紗）']], [['2007', "Kohl's", 'Simply Vera 平價系列'], ['', '花式滑冰選手', '比賽服設計']]),
'isaac-mizrahi': ([['', '設計師', 'Perry Ellis、Calvin Klein'], ['1987', '創辦人', 'Isaac Mizrahi'], ['2008–2009', '創意總監', 'Liz Claiborne']], [['2003–2008', 'Target', '平價設計師系列'], ['1995', '紀錄片《Unzipped》', '記錄他的創作過程']]),
'marc-jacobs': ([['1984', '創辦人', 'Marc Jacobs'], ['1988–1992', '設計師', 'Perry Ellis'], ['1997–2013', '創意總監', 'Louis Vuitton'], ['2001', '推出副牌', 'Marc by Marc Jacobs']],
  [['2001', 'Stephen Sprouse', 'LV 塗鴉包'], ['2003', '村上隆', 'LV 彩色老花'], ['2008', 'Richard Prince', 'LV 系列'], ['2012', '草間彌生', 'LV 圓點系列']]),
'tom-ford': ([['1990', '女裝設計師', 'Gucci'], ['1994–2004', '創意總監', 'Gucci'], ['2000–2004', '創意總監', 'Yves Saint Laurent'], ['2005', '創辦人', 'Tom Ford'], ['2019–2022', '主席', 'CFDA']], [['2008–', '007 電影', '詹姆士·龐德的西裝']]),
'rick-owens': ([['1994', '創辦人', 'Rick Owens（洛杉磯）'], ['2003–2006', '藝術總監', 'Revillon'], ['2003', '移居巴黎', '']], [['', 'adidas', '球鞋合作'], ['', 'Moncler', '羽絨系列'], ['2018', 'Birkenstock', '涼鞋合作'], ['', 'Converse', 'DRKSHDW 系列']]),
'thom-browne': ([['', '業務', 'Club Monaco'], ['2001', '創辦人', 'Thom Browne'], ['2007–2015', '設計師', 'Brooks Brothers Black Fleece'], ['2009', '設計師', 'Moncler Gamme Bleu'], ['2023–', '主席', 'CFDA']], [['', 'FC Barcelona', '球隊正式服裝']]),
'jeremy-scott': ([['1997', '創辦人', 'Jeremy Scott'], ['2013–2023', '創意總監', 'Moschino']], [['2000 年代起', 'adidas', '翅膀運動鞋等長期合作'], ['', 'Longchamp', '包款合作']]),
'zac-posen': ([['2001', '創辦人', 'Zac Posen'], ['2014–2020', '女裝創意總監', 'Brooks Brothers'], ['2024–', '創意總監／首席創意長', 'Gap／Old Navy']], [['2018', 'Delta 航空', '空服員與地勤制服']]),
'jason-wu': ([['', '娃娃服裝設計', 'Integrity Toys'], ['', '設計助理', 'Narciso Rodriguez'], ['2006', '創辦人', 'Jason Wu'], ['2013–2016', '女裝藝術總監', 'Hugo Boss']], [['2009', '蜜雪兒·歐巴馬', '就職舞會禮服'], ['2012', 'Target', '平價聯名系列']]),
'alexander-wang': ([['2005', '創辦人', 'Alexander Wang'], ['2012–2015', '創意總監', 'Balenciaga']], [['2014', 'H&M', '設計師聯名系列'], ['2016', 'adidas', '聯名系列']]),
'virgil-abloh': ([['2009', '實習', 'Fendi（與 Kanye West）'], ['2010', '創意總監', 'DONDA'], ['2012', '創辦人', 'Pyrex Vision'], ['2013', '創辦人', 'Off-White'], ['2018–2021', '男裝藝術總監', 'Louis Vuitton']],
  [['2017', 'Nike', 'The Ten 球鞋系列'], ['2019', 'IKEA', 'MARKERAD 家居系列'], ['2021', 'Mercedes-Benz', 'Project MAYBACH 概念車']]),
'kerby-jean-raymond': ([['2013', '創辦人', 'Pyer Moss'], ['2020–2022', '全球創意總監', 'Reebok']], [['2018', 'Reebok', '聯名系列']]),
'christopher-john-rogers': ([['2018', '首個系列', 'Christopher John Rogers']], [['2021', '賀錦麗', '總統就職典禮服裝']]),
}

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = os.path.join(ROOT, 'designers.json')
books = json.load(open(p, encoding='utf-8'))
ids = {b['id'] for b in books}
missing = [b['id'] for b in books if b['id'] not in C]
unknown = [k for k in C if k not in ids]
if unknown:
    raise SystemExit(f'未知 id：{unknown}')
for b in books:
    if b['id'] in C:
        career, collabs = C[b['id']]
        b.setdefault('profile', {})
        b['profile']['career'] = [{'years': y, 'role': r, 'org': o} for y, r, o in career]
        b['profile']['collabs'] = [{'year': y, 'partner': pa, 'note': n} for y, pa, n in collabs]
json.dump(books, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('寫入', len(C), '位；缺少：', missing)
