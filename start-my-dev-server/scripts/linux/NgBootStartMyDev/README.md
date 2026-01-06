# NgBootStartMyDev (Linux Edition)

NgBootStartMyDev is a lightweight, script-driven solution to instantly launch your Fullstack (Angular + Spring Boot) projects **without opening an IDE**.

This Linux edition provides a simple Bash-based startup experience optimized for **Java**, **Maven**, and **Node.js** environments.

---

## 🚀 Features

- Launches Backend (Spring Boot) and Frontend (Angular) in separate new terminal windows
- Waits for Backend port to be ready before launching Frontend
- Automatically handles Git branch checkout for both repos

---

## ⚙️ Requirements

- **Java** & **Maven**
- **Node.js** & **npm**
- **Git**
- **Terminal Emulator** (gnome-terminal, konsole, or xterm supported)
- **netcat** (nc) command for port checking

---

## 🛠️ Configuration

Before running, open `NgBootStartMyDev.sh` and set the following variables:

```bash
backendPath="/path/to/backend"
frontendPath="/path/to/frontend"
backendPort="8080"
frontendPort="4200"
javaPath="/usr/lib/jvm/java-17-openjdk-amd64" # Optional
springProfile="dev"
gitBranch="development"
```

---

## ▶️ How to Run

1.  Extract the zip file.
2.  Open a terminal in the folder.
3.  Make the scripts executable:
    ```bash
    chmod +x *.sh
    ```
4.  Run the launch script:
    ```bash
    ./launch.sh
    ```
    Or run the main script directly:
    ```bash
    ./NgBootStartMyDev.sh
    ```
