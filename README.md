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

## 靜態版限制
chatgpt.site 版有伺服器端 API，GitHub Pages 沒有，以下功能改為本機或停用：
- 帳號登入與雲端收藏（`/api/me`、`/api/library`）→ 收藏與筆記存在瀏覽器 localStorage
- 未收錄品牌的線上搜尋（`/api/search`）、翻譯（`/api/translate`）、名詞查詢（`/api/glossary`）、人物檔案（`/api/designer-profile`）
- 匯出時缺少 `designers/universe.js`、`designers/people.js`（書庫自動改用列表模式）
