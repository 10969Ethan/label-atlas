# 給 ChatGPT／Codex 的完整交接指令

把「交接指令」整段貼給 chatgpt.site 版 LABEL ATLAS 的 Codex 對話。它會先理解 GitHub 版做了哪些修改，再把修改同步到 chatgpt.site，並放上 Grok 生成的影片。

---

## 交接指令（整段複製）

```text
你好，這是 LABEL ATLAS 網站的交接說明。另一個 AI（Claude）已經在 GitHub 上完成一輪修改，請你先讀懂，再同步到這個 chatgpt.site 網站。

━━━━━━━━━━━━━━━━━━
一、兩個版本的關係
━━━━━━━━━━━━━━━━━━
- chatgpt.site 版（這裡）：有伺服器 API（/api/search、/api/glossary、/api/translate、/api/me、/api/library、/api/designer-profile、/api/collection）。
- GitHub 版：https://github.com/10969Ethan/label-atlas（main 分支），部署在 https://10969ethan.github.io/label-atlas/，純靜態，沒有伺服器。
- 前端程式已經是「雙模式」：只在網址是 github.io 時改用靜態資料（判斷式為 location.hostname.endsWith('github.io') 或 window.__staticSite）。在 chatgpt.site 上仍會呼叫原本的 API，所以前端檔案可以直接覆蓋，不需要也不要修改任何 /api 路由與伺服器程式。

━━━━━━━━━━━━━━━━━━
二、這輪做了什麼（請先理解）
━━━━━━━━━━━━━━━━━━
A. 設計師資料全部靜態化（designers.json，91 位設計師）
   - 每位都有 profile：story、context、contributions[]、tags[]、language、country、life、influence、timeline[{year,text}]、links[{id,text}]、method（資料整理說明）。
   - 新增 profile.career[{years, role, org}]：職涯經歷，例如 Raf Simons → Jil Sander、Dior、Calvin Klein、Prada。
   - 新增 profile.collabs[{year, partner, note}]：聯名與合作，例如 Virgil Abloh → Nike The Ten、IKEA。
   - portrait 與 works[]：人像與作品圖已下載到 assets/designers/<id>/，欄位含 src（本地路徑）、url（維基共享資源原頁）、artist、license、licenseUrl，頁面會自動顯示授權。沒有合法授權人像的設計師標記 portraitUnavailable:true，頁面會改顯示姓名縮寫。
   - 新增 Charles Frederick Worth 與 Hedi Slimane 兩位。
B. 設計師頁 designers/
   - atlas.js：人物誌直接讀 designers.json，不再呼叫 /api/designer-profile；新增「職涯經歷：待過哪些品牌」與「聯名與合作」兩個區塊。
   - media.js：圖片只讀本地資料，不即時呼叫維基 API。
   - people.js（新檔）：在首頁品牌研究書裡顯示相關設計師卡片。
   - atlas.css：新增 .career 與 .collabs 樣式。
C. 新頁面 care/index.html：洗滌保養
   - 看懂洗標：28 個 ISO 3758 洗標符號（水洗、漂白、乾燥、熨燙、專業清洗），點選後右側組合成洗衣說明。
   - 依材質保養：16 種材質與單品（棉、麻、羊毛、羊絨、絲、丹寧、聚酯、尼龍、嫘縈、壓克力、羽絨、防水外套、針織、西裝、皮革、麂皮），可搜尋與分類。
   - 去漬速查：12 種污漬步驟與禁忌；洗衣步驟、洗衣機行程、晾曬、熨燙溫度、收納；8 題測驗。
   - 影片區塊：若 assets/care/care-intro.mp4 存在會自動顯示，否則隱藏。
D. 首頁 index.html
   - 導覽列新增「設計師」(designers/) 與「洗滌保養」(care/)。
   - 手機版導覽列改成單行、可左右滑動（<style id="ux-fixes">）。
   - 轉場縮短：warp／landing 由 240vh 改為 150vh，cinema-passage 由 290svh 改為 190svh。
   - 修正錯誤：時光機區塊裡的 function render() 依 JavaScript 的區塊函式規則覆蓋了品牌研究頁的全域 render()，導致品牌完整頁卡在「正在翻閱…」。已改名為 tmRender()。這個錯誤在 chatgpt.site 版很可能也存在。
   - 修正網址被重設到網域根目錄的問題（replaceState 改用 location.pathname 與 ./#…）。
   - 服裝小辭典：額外讀取 data/glossary.json（57 個詞條）；在 github.io 查不到時顯示相近詞與維基連結，在 chatgpt.site 查不到時仍走 /api/glossary。
   - 時光機人物照片改讀 designers.json，不再即時查維基百科。
   - 品牌研究：在 github.io 上，有對應設計師的品牌會用人物誌內容；在 chatgpt.site 仍走 /api/search。

━━━━━━━━━━━━━━━━━━
三、請你做的事
━━━━━━━━━━━━━━━━━━
1. 從 GitHub repo 取得最新檔案，覆蓋到這個網站（路徑保持不變）：
   index.html、designers.json、designers/（整個資料夾）、care/index.html、data/glossary.json、assets/designers/（整個資料夾，約 16MB），以及三支 Grok 影片：assets/care/care-intro.mp4、assets/time-machine/warp.mp4、assets/designers-universe/universe-intro.mp4。
   不需要：tools/、.github/、docs/、README.md。
2. 影片已經在 repo 裡並接好，不需要另外寫程式：
   - 洗滌保養頁：assets/care/care-intro.mp4（晾曬收納段落，有播放控制）。
   - 首頁時光機區塊開頭：assets/time-machine/warp.mp4（.tm-video，捲到畫面內自動靜音播放，離開即暫停）。
   - 設計師頁標題下方：assets/designers-universe/universe-intro.mp4。
   三支都標註「AI 生成示意影片（Grok）」；使用者開啟「減少動態」時不自動播放、改顯示播放控制。
3. 不要改寫 Claude 寫好的內容與程式；只有下面的檢查失敗時才修正，並說明改了哪裡。

━━━━━━━━━━━━━━━━━━
四、完成後逐項檢查並回報
━━━━━━━━━━━━━━━━━━
1. 首頁導覽列有「設計師」「洗滌保養」，點了能打開。
2. /designers/#designer/raf-simons 看得到人物誌、職涯經歷、聯名與合作、作品圖。
3. /care/ 點洗標符號，右側出現說明；材質搜尋「羊毛」有結果；污漬可切換；測驗可作答。
4. 首頁小辭典查「斜裁」有解釋；查不到的詞仍會呼叫 /api/glossary。
5. 首頁搜尋 Nike 仍使用 /api/search，研究書能正常打開，完整頁不會卡在「正在翻閱…」。
6. 手機寬度（390px）導覽列是單行、可左右滑。
7. 三支影片都能播放：/care/ 晾曬段落、首頁時光機區塊開頭、/designers/ 標題下方。
8. Console 沒有新的紅色錯誤。
請回報每一項是「通過」或「失敗＋錯誤訊息」。
```

---

## Grok 影片提示詞（貼到 grok.com 的 Imagine）

建議設定：影片、16:9、6–8 秒。生成後下載，交給 GPT 時一併附上。

**1. 洗滌保養開場 → 存成 `assets/care/care-intro.mp4`**

```text
Calm editorial close-up in soft natural daylight. A hand turns a cream knit sweater inside out and reads the small fabric care label, then gently lays the sweater flat on a white towel to dry. Muted palette of cream, oatmeal and deep forest green, slow gentle camera push-in, shallow depth of field, minimal and quiet, no text, no logos, no faces.
```

**2. 時光機轉場 → 存成 `assets/time-machine/warp.mp4`（可選）**

```text
A vintage dressmaker's mannequin in a dark studio. Streaks of warm light rush past like time travel as the garment on the mannequin transforms through eras: an 1850s crinoline gown, a 1920s drop-waist dress, a 1947 cinched-waist full skirt, and a 1980s sculptural black asymmetrical piece. Cinematic, deep navy and warm gold, smooth continuous motion, no text, no logos, no real people.
```

**3. 設計師宇宙（可選，之後可用在設計師頁開場）**

```text
Floating cloth-bound books drift slowly in a starry deep-space scene around a ringed planet, each book softly glowing as the camera glides between them. Editorial, calm, dark navy with warm brass light, no text, no logos.
```

注意：提示詞刻意避免真實人物、品牌標誌與特定設計師的作品，影片只作氛圍示意；網站上會標註「AI 生成示意影片」。
