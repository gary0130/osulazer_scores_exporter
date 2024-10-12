const Realm = require("realm");

// 開啟指定的 Realm 檔案並處理 Score 表中的資料
realm_database="osu_realm/client.realm"
function processScores() {
  Realm.open({ path: realm_database })
    .then((realm) => {
      // 列出所有的表
      // const schemaNames = realm.schema.map((schema) => schema.name);
      // console.log("Realm 中的表：", schemaNames);

      // 查詢 Score 表中的所有記錄
      const scores = realm.objects("Score");

      // 在這裡處理 Score 表中的資料
      handleScores(scores);
      // 記得在完成後關閉 Realm
      realm.close();
      // 強制結束程式
      process.exit(0);
    })
    .catch((error) => {
      console.error("開啟 Realm 檔案時發生錯誤：", error);
      process.exit(1);
    });
}

function get_replay_name(data){
  //aaaaaa playing Mrs. GREEN APPLE - Inferno (TV Size) (Himekawa) [AsaBen_s Insane] (2024-08-20_02-36).osr
  const user=data["User"]["Username"];
  const artist=data["BeatmapInfo"]["Metadata"]["Artist"];
  const title=data["BeatmapInfo"]["Metadata"]["Title"];
  const author=data["BeatmapInfo"]["Metadata"]["Author"]["Username"];
  const difficulty=data["BeatmapInfo"]["DifficultyName"];
  const playdate=new Date(data["Date"]).toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '-');
  var result=user+" playing "+artist+" - "+title+" ("+author+")"+"["+difficulty+"]("+playdate+").osr";
  //替代所有特殊字元
  black_chr=["\\","/","\"","*","?","<",">","|",":","'",","];
  for (var i=0;i<black_chr.length;i++){
    result=result.replaceAll(black_chr[i],"_");
  }
  return result;
}

function handleScores(scores) {
  //計算有幾筆資料
  console.log("Score 表中的記錄數：", scores.length);
  if (scores.length === 0) {
    console.log("Score 表中沒有任何記錄。");
    return;
  }
  //console.log("Score 表中的第一筆記錄：", scores[0]);
  let result = '';
  var count=0;
  scores.forEach(data => {
    //跳過CL
    if (data["Mods"].includes("CL")) return;
    const hash = data["Hash"];
    const name = get_replay_name(data);
    result += `${hash},${name}\n`;
    count++;
  });
  console.log("篩選後數量：", count);
  //寫入檔案
  const fs = require('fs');
  fs.writeFileSync('osrhash.csv', result);
  
  //console.log(result);

}
//開始
processScores();