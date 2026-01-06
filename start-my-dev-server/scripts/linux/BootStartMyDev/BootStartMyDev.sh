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
javaPath="{{JAVA_PATH}}"
springProfile="{{SPRING_PROFILE}}"
gitBranch="{{GIT_BRANCH}}"

# === SET JAVA ENVIRONMENT ===
if [ -n "$javaPath" ]; then
    export JAVA_HOME="$javaPath"
    export PATH="$javaPath/bin:$PATH"
fi

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

open_terminal() {
    local cmd="cd \"$backendPath\"; mvn $mvnArgs"
    if command -v gnome-terminal &> /dev/null; then
        gnome-terminal -- bash -c "$cmd; exec bash"
    elif command -v konsole &> /dev/null; then
        konsole -e bash -c "$cmd; exec bash" &
    elif command -v xterm &> /dev/null; then
        xterm -e bash -c "$cmd; exec bash" &
    else
        echo "No suitable terminal emulator found. Running in this terminal."
        mvn $mvnArgs
    fi
}

open_terminal
