# 給 ChatGPT／Codex 的同步 prompt

把下面整段貼給 chatgpt.site 版 LABEL ATLAS 所在的 Codex 對話，讓它把 GitHub 上的新功能套用到 chatgpt.site。程式碼已經在 GitHub 寫好、測試過，Codex 只需要搬檔案和檢查，不需要重新設計。

---

```text
請把 GitHub 公開 repo https://github.com/10969Ethan/label-atlas（main 分支）的最新內容同步到這個 chatgpt.site 網站，保留這個網站原本的伺服器 API。

【背景】
GitHub 版是同一個網站的靜態版。前端程式已經做成「雙模式」：只有網址結尾是 github.io 時才改用靜態資料；在 chatgpt.site 上仍會呼叫原本的 /api/search、/api/glossary、/api/translate、/api/me、/api/library、/api/designer-profile。所以前端檔案可以直接覆蓋，不要改動任何 /api 路由與伺服器程式。

【要同步的檔案】（全部從 repo 根目錄複製，路徑保持不變）
1. index.html（首頁：導覽列新增「設計師」「洗滌保養」、縮短轉場動畫、手機版導覽列單行可滑動、修正 render() 被時光機覆蓋的錯誤、辭典讀 data/glossary.json）
2. designers.json（91 位設計師：人物誌 profile、職涯經歷 profile.career、聯名合作 profile.collabs、本地人像與作品圖路徑）
3. designers/ 整個資料夾（index.html、atlas.js、atlas.css、media.js、people.js）
4. care/index.html（新頁面：洗標解讀、材質保養、去漬速查、洗衣步驟、晾曬熨燙收納、測驗）
5. data/glossary.json（服裝小辭典 57 個新詞條）
6. assets/designers/ 整個資料夾（設計師人像與作品圖，約 16MB）
7. assets/care/（如果存在：洗滌保養影片）
不需要同步：tools/、.github/、docs/、README.md。

【注意事項】
- 不要修改檔案內容，除非下面的檢查失敗。
- designers/media.js 與 designers/atlas.js 是靜態版：人物誌與圖片直接讀 designers.json，不再呼叫 /api/designer-profile，這是刻意的，因為資料已經完整。
- 圖片授權資訊（作者、授權、來源連結）都在 designers.json 裡，頁面會自動顯示，請保留。

【完成後請逐項檢查並回報】
1. 首頁導覽列看得到「設計師」與「洗滌保養」，點擊可以打開 /designers/ 與 /care/。
2. /designers/#designer/rei-kawakubo 打開後，看得到人物誌、「職涯經歷：待過哪些品牌」、「聯名與合作」與作品圖。
3. /care/ 點選洗標符號，右側會出現洗衣說明；材質搜尋輸入「羊毛」有結果；污漬清單可切換；測驗可作答。
4. 首頁服裝小辭典查「斜裁」有解釋；查不到的詞仍會呼叫原本的 /api/glossary。
5. 首頁搜尋品牌（例如 Nike）仍走原本的 /api/search 線上研究功能。
6. 打開瀏覽器 Console 沒有新的紅色錯誤。
如果任何一項失敗，告訴我是哪一項、錯誤訊息是什麼，先不要自行大改。
```

---

## 之後新增內容時

- 新增設計師人物誌：寫在 `tools/profiles/*.json`，執行 `python3 tools/merge_profiles.py`。
- 新增職涯與聯名：編輯 `tools/careers.py` 後執行它。
- 補圖片：到 GitHub Actions 手動執行「Fetch designer media」。
- 改完推到 GitHub 後，再把上面的 prompt 貼給 Codex 同步一次即可。

## 影片（Grok）

洗滌保養頁會自動偵測 `assets/care/care-intro.mp4`，檔案存在就顯示影片區塊。建議用 Grok Imagine（xAI）生成，16:9、5–8 秒、720p，生成後放進 `assets/care/` 推上 GitHub。可用的提示詞：

1. **care-intro.mp4（洗滌保養頁開場）**
   `Calm editorial close-up in soft daylight: a hand turns a garment inside out and reads the small care label, then a cream wool sweater is laid flat on a white towel to dry. Muted palette of cream, oatmeal and deep forest green, slow gentle camera push-in, minimal, no text, no logos.`
2. **time-travel.mp4（時光機轉場，可選）**
   `A vintage dressmaker's mannequin in a dark studio; light streaks rush past as the garment on it morphs through eras — 1850s crinoline gown, 1920s drop-waist dress, 1947 cinched-waist full skirt, 1980s sculptural black asymmetrical piece. Cinematic, dark navy and warm gold, no text, no real people, no logos.`

提示詞避免真實人物、品牌標誌與受版權保護的設計；影片僅作氛圍示意，頁面上會標註「AI 生成示意影片」。
