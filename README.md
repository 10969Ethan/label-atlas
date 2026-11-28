# LABEL ATLAS

品牌故事、服裝歷史與設計探索。原本以 ChatGPT 製作於 chatgpt.site，已搬到 GitHub Pages。

- 網站：https://10969ethan.github.io/label-atlas/
- 時光機：https://10969ethan.github.io/label-atlas/#time-machine
- 設計師宇宙書庫：https://10969ethan.github.io/label-atlas/designers/

推送到 `main` 後，GitHub Actions 會自動部署（約 20 秒）。

## 結構
- `index.html`：主站（品牌書庫、星區、服裝歷史、3D 時光機）
- `designers/`：設計師宇宙書庫
- `designers.json`：設計師資料
- `assets/`：品牌標誌與圖片
- `time-machine/index.html`：時光機獨立預覽版（輪廓示意圖，無外部圖片）

## 靜態版（GitHub Pages）
GitHub Pages 沒有伺服器，所以這個版本所有資料都存在 repo 裡，不呼叫任何 API：
- **設計師人物誌**：91 位設計師的完整人物誌都在 `designers.json` 的 `profile` 欄位（原始稿在 `tools/profiles/*.json`，改完執行 `python3 tools/merge_profiles.py` 合併）。
- **人像與作品圖**：存在 `assets/designers/<id>/`，來自維基共享資源，附作者與授權。由 GitHub Actions「Fetch designer media」（`tools/fetch_media.py`）下載；新增設計師後到 Actions 手動執行它即可補圖。不合適的圖片記在 `rejectedPortraits`／`rejectedWorks`，之後不會再被抓回來。
- **服裝小辭典**：首頁內建 12 條 + `data/glossary.json` 的詞條，查不到時提供相近詞與維基百科連結。
- **品牌研究書**：有對應設計師的品牌（如 COMME des GARÇONS、Yohji Yamamoto、Maison Margiela）會顯示站內人物誌內容；其他品牌需要 chatgpt.site 版的線上搜尋。
- **時光機人物照片**：改讀 `designers.json`，不再即時查維基百科。
- 收藏與筆記存在瀏覽器 localStorage；登入、線上翻譯在靜態版停用。

同一份 `index.html` 也能放回 chatgpt.site：程式只在網址是 `github.io` 時切換成靜態模式，在 chatgpt.site 上仍會使用原本的 API。

## 新增服裝歷史節點（給 GPT / Claude 修改時參考）
「穿越服裝史」的畫面（時間軸導覽、全部一覽、放大檢視）會自動讀取資料，新增內容時只要在 `index.html` 的資料陣列加一筆，不用改版面程式：
- 全球精選／歐洲／美洲：`fashionHistory`、`regionalArchive.europe`、`regionalArchive.america`
- 日本：`japaneseHistory`；亞洲其他：`regionalArchive.asia`
- 每筆欄位：`year`、`era`、`category`、`title`（用「：」分隔短標與副標）、`en`、`intro`、`detail`、`piece`、`url`、`source`，有圖片再加 `image`、`imageTitle`、`imageDate`、`credit`、`imageSource`
- 年代分組（1800 年以前、19 世紀…）依 `year` 開頭的數字自動判斷
- 版面樣式集中在 `<style id="archive-v2">`
