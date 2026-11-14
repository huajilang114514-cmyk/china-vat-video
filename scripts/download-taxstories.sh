#!/bin/bash
set -e
cd /f/deepseek/vat-video
export HTTPS_PROXY=http://127.0.0.1:7890 HTTP_PROXY=http://127.0.0.1:7890 GH_CONFIG_DIR='F:/deepseek/vat-video/.ghconfig' LOCALAPPDATA='F:/deepseek/vat-video/.ghcache'
GH=/f/deepseek/vat-video/tools/gh/bin/gh.exe
REPO=huajilang114514-cmyk/china-vat-video
TOKEN=$("$GH" auth token)
mkdir -p out/taxstory-cloud out/deliverables/taxstory
download() {
  local id=$1 run=$2
  local dir=out/taxstory-cloud/$id
  rm -rf "$dir"; mkdir -p "$dir"
  local url=$("$GH" api "repos/$REPO/actions/runs/$run/artifacts" --jq '.artifacts[0].archive_download_url')
  curl -sL --proxy http://127.0.0.1:7890 -H "Authorization: token $TOKEN" "$url" -o "$dir/a.zip"
  tar -xf "$dir/a.zip" -C "$dir"
  echo "downloaded $id $(du -h "$dir/video.mp4" 2>/dev/null | cut -f1)"
}
download yanye 43581676994
download fangchan 43581683864
download qishui 43581690357
download chechuan 43581698068
download chengzhen 43581704503
download ziyuan 43581712130
download gengdi 43581718811
download huanjing 43581725379
download tudi 43581731978
download chegou 43581738859
download chengjian 43581745845
download chuanbo 43581752570
