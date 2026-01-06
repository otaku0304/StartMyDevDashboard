# FlaskStartMyDev (Linux Edition)

FlaskStartMyDev is a lightweight, script-driven solution to instantly launch your Flask projects **without opening an IDE**.

This Linux edition provides a simple Bash-based startup experience optimized for **Python**, **Flask** environments.

---

## 🚀 Features

- Launches backend (Flask) in a new terminal window
- Supports virtual environments (venv, .venv)
- Automatically handles Git branch checkout

---

## ⚙️ Requirements

- **Python 3**
- **Flask**
- **Git**
- **Terminal Emulator** (gnome-terminal, konsole, or xterm supported)

---

## 🛠️ Configuration

Before running, open `FlaskStartMyDev.sh` and set the following variables:

```bash
backendPath="/path/to/your/flask-backend"
backendPort="5000"
pythonPath="/usr/bin/python3" # Optional
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
    ./FlaskStartMyDev.sh
    ```
