# 省點數版：給 Codex 的短指令

把下面這段貼給 Codex。它只需要找到網站根目錄、執行一個指令，不用讀任何程式碼。

```text
請在這個專案的網站根目錄（放 index.html 的那一層）執行下面這行，然後重新部署。不要讀或修改任何檔案內容，不要改 /api 程式，完成後只回報指令最後一行輸出。

curl -fsSL https://raw.githubusercontent.com/10969Ethan/label-atlas/main/tools/sync-to-chatgpt-site.sh | bash -s -- .
```

如果 Codex 說它的環境不能連外網，就改請它：「從 https://github.com/10969Ethan/label-atlas 下載 main 分支的 zip，把 index.html、designers.json，以及 designers、care、data、assets/designers、assets/care、assets/time-machine、assets/designers-universe 這些資料夾覆蓋到網站根目錄，不要讀內容，完成後重新部署。」

完整的修改說明在 `docs/HANDOFF-FOR-GPT.md`，只有在同步後出問題、需要 Codex 除錯時才需要貼。
