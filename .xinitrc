#Wacom

# Note: get the ids by using "xsetwacom list devices"
# Stylus
xsetwacom --set 18 Button 2 "pan"
xsetwacom --set 18 Button 3 "key alt left"
xsetwacom --set 18 "PanScrollThreshold" 100

xsetwacom --set 18 "Mode" "Relative"
# Tablet


### KEYMAPS ###

setxkbmap -option "ctrl:nocaps"
xcape -e 'Caps_Lock=Escape'
