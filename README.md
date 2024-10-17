# osulazer replay export
osu!lazer 使用[另一種](https://osu.ppy.sh/wiki/en/Client/Release_stream/Lazer/File_storage)檔案儲存方式，基於hash跟資料庫來做連結，所有資料包含地圖﹑回播等等都是以hash做儲存，所以不能像以前換電腦轉移你要轉的檔案，lazer只能全要或全不要。

目前沒有批量導出replay的功能，如果想刪除lazer但保留在lazer的遊玩紀錄，就要一個個手動導出，但其實導出就只是把hash變成osr檔案而已，所以只要找到對應關係，就可以直接在檔案中操作。

lazer使用realm資料庫，他沒有python(哭哭)所以這邊用nodejs，首先請安裝node，然後安裝需要的套件，記得先```git clone```。
```
npm install
```
到lazer資料夾中，把你的```client.realm```複製到osu_realm目錄下，之後執行index.js
```
node index.js
```
會生成一個```osrhash.csv```，裡面就是lazer中score的資料了。


接下來去lazer的檔案系統中把檔案撈出來重命名即可，lazer就可以刪掉拉。  
打開```get_replay.py```填入lazer的files路徑，並執行
```
osu_files_path = 'XXXXX'
```
最後會輸出到```export_replay```資料夾中。

## 注意
這份對照表只包含lazer中的遊玩紀錄，具體來說是 mode!=CL ，所以stable導入的資料不包含在其中(stable的replay放在osu/Data/r裡面)。