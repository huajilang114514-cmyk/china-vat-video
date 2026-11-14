#!/bin/bash
cd /f/deepseek/vat-video
for id in chechuan chengzhen ziyuan gengdi huanjing tudi chegou chengjian chuanbo; do
  if [ -f public/tax-assets/$id.jpg ]; then
    npx remotion ffmpeg -hide_banner -loglevel error -i public/tax-assets/$id.jpg -vf "scale='min(1600,iw)':-2" public/tax-assets/$id-s.jpg -y && mv public/tax-assets/$id-s.jpg public/tax-assets/$id.jpg
  fi
done
ls -lh public/tax-assets | tail -14
