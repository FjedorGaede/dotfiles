if [[ $(pgrep -fc telegram-desktop) -gt 0 ]]; then
  hyprctl dispatch togglespecialworkspace telegram
else
  telegram-desktop &
fi
