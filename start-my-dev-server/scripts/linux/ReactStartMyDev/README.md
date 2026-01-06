# ReactStartMyDev (Linux Edition)

ReactStartMyDev is a lightweight, script-driven solution to instantly launch your React projects **without opening an IDE**.

This Linux edition provides a simple Bash-based startup experience optimized for **Node.js**, **React** environments.

---

## 🚀 Features

- Launches frontend (npm install & npm start) in a new terminal window
- Automatically handles Git branch checkout

---

## ⚙️ Requirements

- **Node.js** & **npm**
- **Git**
- **Terminal Emulator** (gnome-terminal, konsole, or xterm supported)

---

## 🛠️ Configuration

Before running, open `ReactStartMyDev.sh` and set the following variables:

```bash
frontendPath="/path/to/your/react-frontend"
frontendPort="3000"
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
    ./ReactStartMyDev.sh
    ```
