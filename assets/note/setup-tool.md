# Huong Dan Nhanh Cho Nguoi Moi (Chua Co GH CLI)

Updated: 2026-02-11

## 1) Muc tieu
Tai lieu nay dung cho nguoi chi nhan file `EmBeby-Mieow-DEV.exe` va muon dung ngay Copilot CLI.

## 2) Ban can gi truoc khi dung
- Windows 10/11.
- Tai khoan GitHub co quyen dung Copilot.
- Internet on dinh.

## 3) Cai GitHub CLI (`gh`)
1. Mo link chinh thuc: https://cli.github.com/
2. Tai ban cai dat Windows va cai xong.
3. Mo PowerShell moi, chay:
```powershell
gh --version
```
Neu hien version la ok.

## 4) Dang nhap GitHub tren may
Chay:
```powershell
gh auth login
```
Chon:
- `GitHub.com`
- `HTTPS`
- `Login with a web browser`

Kiem tra lai:
```powershell
gh auth status
```

## 5) Kiem tra lenh Copilot CLI
Chay:
```powershell
gh copilot --help
```
Neu bao khong co lenh `copilot`, cai them extension:
```powershell
gh extension install github/gh-copilot
```
Sau do kiem tra lai:
```powershell
gh copilot --help
```

## 6) Neu mo EXE bi bao thieu .NET runtime
Launcher hien tai build theo kieu `self-contained false`, nen may nguoi dung can runtime phu hop.

Mo link chinh thuc:
- https://dotnet.microsoft.com/en-us/download/dotnet

Sau khi cai runtime, mo lai launcher.

## 7) Chay launcher lan dau
1. Mo `EmBeby-Mieow-DEV.exe`.
2. Man hinh `Setup Data Folder` se hien ra.
3. Chon noi luu data (settings/logs/chat transcripts).

Rule bat buoc:
- Duong dan phai co `ChatCLI`.
- Neu ban nhap `D:\`, tool se tu them thanh `D:\ChatCLI`.

## 8) Chon repo va dung tool
1. O `Project folder` bam `Browse` va chon thu muc code.
2. Dung cac nut:
- `Open Copilot CLI`
- `Run /create feature`
- `Run /fix bug`
- `Run /refactor code`
- `Change Data...` (doi lai noi luu data)

## 9) Luu y ve tai khoan va request
Tool dung tai khoan dang login tren may do.

Kiem tra account dang dung:
```powershell
gh auth status
```

Neu thay account khong dung, logout va login lai:
```powershell
gh auth logout -h github.com
gh auth login
```

## 10) Noi luu log chat
Log chat duoc luu tai:
`<DataRootPath>\chat-logs\`

Ten file dang:
`copilot-yyyyMMdd-HHmmss.txt`

## 11) Loi thuong gap va cach xu ly

### A) Bao "gh was not found"
- Cai lai GitHub CLI tu https://cli.github.com/
- Mo lai terminal moi roi kiem tra `gh --version`.

### B) Bao "prompt file not found"
- Ban dang chon sai `Project folder`.
- Repo can co `.github/prompts/...` de dung 3 nut quick prompt.

### C) Khong tao duoc data folder
- Bam `Change Data...`.
- Thu path don gian: `D:\ChatCLI\EmBeby-Mieow-DEV\data`.

### D) Tool mo nhung khong chat duoc
- Kiem tra `gh auth status`.
- Kiem tra quyen Copilot tren account GitHub cua ban.

## 12) Goi y text ngan de up bio
Ban co the dang kem ghi chu nay:

```text
Setup nhanh:
1) Cai GitHub CLI: https://cli.github.com/
2) Dang nhap: gh auth login
3) Chay file EmBeby-Mieow-DEV.exe
4) Chon data folder (tool tu them ChatCLI neu thieu)
5) Chon repo va bam Open Copilot CLI
```
