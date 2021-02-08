#!/bin/sh 

tmux new-session -d
tmux split-window -h
tmux select-pane -t 0

dir=$PWD

tmux send-keys -t 0 "cd $dir/server && npm run start" Enter
tmux send-keys -t 1 "cd $dir/client && npm run start" Enter

tmux -2 attach-session -d 

