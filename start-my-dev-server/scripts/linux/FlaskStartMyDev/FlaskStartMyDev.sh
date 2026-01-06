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
backendPath="{{BACKEND_PATH}}"
backendPort="{{BACKEND_PORT}}"
pythonPath="{{PYTHON_PATH}}"

# === CHECKOUT BACKEND CODE ===
echo -e "\n\033[32mPreparing Backend...\033[0m"
if [ ! -d "$backendPath" ]; then
    echo -e "\033[31mError: Backend path not found: $backendPath\033[0m"
    exit 1
fi
cd "$backendPath"

# === START FLASK BACKEND ===
echo -e "\033[36mLaunching Flask Backend...\033[0m"

open_terminal() {
    # Check for venv activation script
    local activate_script=""
    if [ -f ".venv/bin/activate" ]; then
        activate_script="source .venv/bin/activate"
    elif [ -f "venv/bin/activate" ]; then
        activate_script="source venv/bin/activate"
    elif [ -f "bin/activate" ]; then
        activate_script="source bin/activate"
    fi

    local cmd="cd \"$backendPath\""
    if [ -n "$activate_script" ]; then
        cmd="$cmd; $activate_script"
    fi
    cmd="$cmd; export FLASK_APP=app.py; flask run"

    if command -v gnome-terminal &> /dev/null; then
        gnome-terminal -- bash -c "$cmd; exec bash"
    elif command -v konsole &> /dev/null; then
        konsole -e bash -c "$cmd; exec bash" &
    elif command -v xterm &> /dev/null; then
        xterm -e bash -c "$cmd; exec bash" &
    else
        echo "No suitable terminal emulator found. Running in this terminal."
        if [ -n "$activate_script" ]; then
            $activate_script
        fi
        export FLASK_APP=app.py
        flask run
    fi
}

open_terminal

# === WAIT FOR PORT ===
echo -e "\nWaiting for Flask backend to start on port $backendPort..."
timeout=60
start_time=$(date +%s)
end_time=$((start_time + timeout))

while [ $(date +%s) -lt $end_time ]; do
    if nc -z localhost $backendPort 2>/dev/null; then
        echo -e "\033[32mFlask Backend is up and running!\033[0m"
        exit 0
    fi
    sleep 0.5
done

echo -e "\033[31mFlask Backend did not start within 60 seconds.\033[0m"
read -p "Press ENTER to close"
exit 1
