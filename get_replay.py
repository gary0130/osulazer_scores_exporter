import os
import sys
import csv
import pathlib

osu_files_path = 'D:/game/osul/files'

if not os.path.exists('osrhash.csv'):
    print('hash csv not found')
    print('run "node index.js" first')
    sys.exit()

if not os.path.exists('export_replay'):
    os.makedirs('export_replay')
    print('create export_replay folder')

#open csv file
with open('osrhash.csv', 'r') as f:
    reader = csv.reader(f)
    hash_list = list(reader)
    print(len(hash_list),'osr files')

#將hash對應到osu檔案模式
for i in hash_list:
    i[0]=f"{i[0][0]}/{i[0][:2]}/{i[0]}"

base_path = pathlib.Path(osu_files_path)

#檢查hash對應的檔案，並嘗試複製到指定目錄
for i in hash_list:
    try:
        osr_path = base_path / i[0]
        if osr_path.exists():
            print('found:',osr_path)
            os.system(f'copy "{osr_path}" "export_replay/{i[1]}"')
        else:
            print('not found:',osr_path)
    except:
        print('error:',osr_path)
        continue

