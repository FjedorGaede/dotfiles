#!/usr/bin/env bash

switch_to() {
    if [[ -z $TMUX ]]; then
        tmux attach-session -t $1
    else
        tmux switch-client -t $1
    fi
}

get_session_names() {
    tmux ls | awk '{print $1}' | cut -d: -f1
}

selected_session=$(get_session_names | fzf --tmux)

if [[ -z $selected_session ]]; then
    exit 0
fi

switch_to $selected_session
