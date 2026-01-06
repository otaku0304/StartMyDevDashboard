#!/bin/bash

# StartMyDev Brand Display
clear
brandName="StartMyDev"

echo -e "\033[36m======================================\033[0m"
echo -e "\033[33m         WELCOME TO $brandName         \033[0m"
echo -e "\033[36m======================================\033[0m"
echo
echo -e "\033[32mEmpowering your journey with speed and innovation!\033[0m"
echo
echo -e "\033[35mVisit us at: https://github.com/otaku0304/StartMyDev\033[0m"
echo
echo -e "\033[36m--------------------------------------\033[0m"

# === CONFIG ===
frontendPath="{{FRONTEND_PATH}}"
frontendPort="{{FRONTEND_PORT}}"
gitBranch="{{GIT_BRANCH}}"

# === GIT BRANCH CHECKOUT ===
echo -e "\n\033[32mPreparing Frontend...\033[0m"
if [ ! -d "$frontendPath" ]; then
    echo -e "\033[31mError: Frontend path not found: $frontendPath\033[0m"
    exit 1
fi
cd "$frontendPath"

echo -e "\033[32mChecking out '$gitBranch' branch...\033[0m"
git checkout "$gitBranch"
echo -e "\033[32mPulling latest changes from origin/$gitBranch...\033[0m"
git pull origin "$gitBranch"

# === START FRONTEND ===
echo -e "\033[36mLaunching Frontend (npm install && npm start)...\033[0m"

open_terminal() {
    local cmd="cd \"$frontendPath\"; npm install && npm start"
    
    if command -v gnome-terminal &> /dev/null; then
        gnome-terminal -- bash -c "$cmd; exec bash"
    elif command -v konsole &> /dev/null; then
        konsole -e bash -c "$cmd; exec bash" &
    elif command -v xterm &> /dev/null; then
        xterm -e bash -c "$cmd; exec bash" &
    else
        echo "No suitable terminal emulator found. Running in this terminal."
        eval "$cmd"
    fi
}

open_terminal
