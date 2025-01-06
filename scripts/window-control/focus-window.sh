#!/bin/bash

function focus_window() {
  wmctrl -ilx | grep $1 | awk '{print $1}' | head -n 1 | xargs -I {} wmctrl -ia {}
}

