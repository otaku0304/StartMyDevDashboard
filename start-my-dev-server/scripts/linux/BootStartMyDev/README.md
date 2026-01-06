# BootStartMyDev (Linux Edition)

BootStartMyDev is a lightweight, script-driven solution to instantly launch your Spring Boot projects **without opening an IDE or editor** like IntelliJ or VS Code.

This Linux edition provides a simple Bash-based startup experience optimized for **Java**, **Maven** environments.

---

## 🚀 Features

- Launches backend (Spring Boot + Maven) in a new terminal window
- No need to open code editors or terminals manually
- Automatically handles Git branch checkout

---

## ⚙️ Requirements

- **Java** (set your `JAVA_HOME` path inside the script or env)
- **Maven**
- **Git**
- **Terminal Emulator** (gnome-terminal, konsole, or xterm supported)

---

## 🛠️ Configuration

Before running, open `BootStartMyDev.sh` and set the following variables if you didn't generate it with the specific values:

```bash
backendPath="/path/to/your/backend"
backendPort="8080"
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
    ./BootStartMyDev.sh
    ```
