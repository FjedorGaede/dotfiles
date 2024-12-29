if [[ $(pgrep -fc spotify-launcher) -gt 0 ]]; then
  hyprctl dispatch togglespecialworkspace spotify
else
  spotify-launcher --skip-update &
fi
