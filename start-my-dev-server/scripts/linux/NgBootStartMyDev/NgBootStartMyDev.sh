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
frontendPath="{{FRONTEND_PATH}}"
backendPort="{{BACKEND_PORT}}"
frontendPort="{{FRONTEND_PORT}}"
javaPath="{{JAVA_PATH}}"
springProfile="{{SPRING_PROFILE}}"
gitBranch="{{GIT_BRANCH}}"

# === SET JAVA ENVIRONMENT ===
if [ -n "$javaPath" ]; then
    export JAVA_HOME="$javaPath"
    export PATH="$javaPath/bin:$PATH"
fi

# Function to open terminal
open_terminal() {
    local title="$1"
    local cmd="$2"
    
    if command -v gnome-terminal &> /dev/null; then
        gnome-terminal --title="$title" -- bash -c "$cmd; exec bash"
    elif command -v konsole &> /dev/null; then
        konsole --p tabtitle="$title" -e bash -c "$cmd; exec bash" &
    elif command -v xterm &> /dev/null; then
        xterm -T "$title" -e bash -c "$cmd; exec bash" &
    else
        echo "No suitable terminal emulator found for $title. Running in background."
        eval "$cmd" &
    fi
}

# === CHECKOUT BACKEND CODE ===
echo -e "\n\033[32mPreparing Backend...\033[0m"
if [ ! -d "$backendPath" ]; then
    echo -e "\033[31mError: Backend path not found: $backendPath\033[0m"
    exit 1
fi
cd "$backendPath"

echo -e "\033[32mChecking out '$gitBranch' branch...\033[0m"
git checkout "$gitBranch"
echo -e "\033[32mPulling latest changes from origin/$gitBranch...\033[0m"
git pull origin "$gitBranch"

# === PREPARE MAVEN COMMAND ARGUMENTS ===
if [ -z "$springProfile" ]; then
    mvnArgs="spring-boot:run"
else
    mvnArgs="spring-boot:run -Dspring-boot.run.arguments='--spring.profiles.active=$springProfile'"
fi

# === START BACKEND IN NEW TERMINAL ===
echo -e "\033[33mLaunching Backend in a new terminal...\033[0m"
open_terminal "StartMyDev Backend" "cd \"$backendPath\"; mvn $mvnArgs"

# === WAIT FOR BACKEND TO BE READY ===
echo -e "\nWaiting for Backend to start on port $backendPort..."
timeout=60
start_time=$(date +%s)
end_time=$((start_time + timeout))
backend_ready=false

while [ $(date +%s) -lt $end_time ]; do
    if nc -z localhost $backendPort 2>/dev/null; then
        echo -e "\033[32mBackend is up and running!\033[0m"
        backend_ready=true
        break
    fi
    sleep 0.5
done

if [ "$backend_ready" = true ]; then
    # === PREPARE FRONTEND ===
    echo -e "\033[36mPreparing Frontend...\033[0m"
    if [ ! -d "$frontendPath" ]; then
        echo -e "\033[31mError: Frontend path not found: $frontendPath\033[0m"
        exit 1
    fi
    cd "$frontendPath"
    
    echo -e "\033[32mChecking out '$gitBranch' branch...\033[0m"
    git checkout "$gitBranch"
    echo -e "\033[32mPulling latest changes from origin/$gitBranch...\033[0m"
    git pull origin "$gitBranch"

    # === LAUNCH FRONTEND ===
    echo -e "\033[36mLaunching Frontend in a new terminal...\033[0m"
    open_terminal "StartMyDev Frontend" "cd \"$frontendPath\"; npm install && npm start"
else
    echo -e "\033[31mBackend did not start on port $backendPort within 60 seconds.\033[0m"
    read -p "Press ENTER to close"
    exit 1
fi
