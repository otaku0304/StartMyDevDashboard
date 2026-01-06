# NgStartMyDev (Linux Edition)

NgStartMyDev is a lightweight, script-driven solution to instantly launch your Angular projects **without opening an IDE**.

This Linux edition provides a simple Bash-based startup experience optimized for **Node.js**, **Angular** environments.

---

## 🚀 Features

- Launches frontend (npm install & npm start) in a new terminal window
- Automatically handles Git branch checkout

---

## ⚙️ Requirements

- **Node.js** & **npm**
- **Angular CLI**
- **Git**
- **Terminal Emulator** (gnome-terminal, konsole, or xterm supported)

---

## 🛠️ Configuration

Before running, open `NgStartMyDev.sh` and set the following variables:

```bash
frontendPath="/path/to/your/angular-frontend"
frontendPort="4200"
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
    ./NgStartMyDev.sh
    ```
