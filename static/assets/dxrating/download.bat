@echo off
setlocal enabledelayedexpansion

set "base_url=https://raw.githubusercontent.com/clansty/nyac.at/refs/heads/main/src/assets/dxrating/UI_CMN_DXRating_"

for /l %%i in (1,1,11) do (
    set "num=0%%i"
    set "num=!num:~-2!"
    echo Downloading !num!...
    curl -O "%base_url%!num!.avif"
    :: 如果curl不可用，可以尝试使用bitsadmin：
    :: bitsadmin /transfer download_!num! /download /priority normal "%base_url%!num!.avif" "UI_CMN_DXRating_!num!.avif"
)

echo Download complete.
pause