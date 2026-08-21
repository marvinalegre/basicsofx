---
layout: ../layouts/MarkdownLayout.astro
title: Linux
---

# Basics of Linux

## 1. What is Linux?

Linux is an **operating system kernel**.

A complete Linux operating system usually consists of:

- Linux kernel
- Shell
- System utilities
- Package manager
- Libraries
- Applications

Examples of Linux distributions:

- Debian
- Ubuntu
- Fedora
- Arch Linux
- Alpine Linux

---

## 2. Terminal

The terminal lets you interact with Linux using commands.

```bash
pwd
```

Shows your current directory.

```bash
ls
```

Lists files.

```bash
cd /path/to/directory
```

Changes directory.

```bash
clear
```

Clears the terminal.

---

## 3. Files and Directories

Create a directory:

```bash
mkdir projects
```

Create a file:

```bash
touch hello.txt
```

Copy:

```bash
cp hello.txt backup.txt
```

Move or rename:

```bash
mv hello.txt hello.md
```

Delete:

```bash
rm hello.md
```

Delete a directory:

```bash
rm -r projects
```

---

## 4. Important Directories

Linux has a single filesystem tree starting at `/`.

```text
/
├── bin      → essential commands
├── boot     → boot files
├── dev      → devices
├── etc      → configuration
├── home     → user directories
├── lib      → libraries
├── media    → removable media
├── mnt      → temporary mounts
├── opt      → optional software
├── proc     → process/kernel information
├── root     → root user's home
├── run      → runtime data
├── sbin     → system commands
├── tmp      → temporary files
├── usr      → user applications/files
└── var      → changing data
```

Your home directory is usually:

```bash
/home/username
```

Shortcut:

```bash
~
```

---

## 5. Absolute vs Relative Paths

Absolute path:

```bash
/home/marvin/projects
```

Relative path:

```bash
projects
```

Current directory:

```bash
.
```

Parent directory:

```bash
..
```

Home directory:

```bash
~
```

---

## 6. Reading Files

Print a file:

```bash
cat file.txt
```

Read interactively:

```bash
less file.txt
```

First lines:

```bash
head file.txt
```

Last lines:

```bash
tail file.txt
```

Follow a changing file:

```bash
tail -f app.log
```

---

## 7. Searching

Find files:

```bash
find . -name "*.txt"
```

Search text:

```bash
grep "hello" file.txt
```

Recursive search:

```bash
grep -r "hello" .
```

---

## 8. Permissions

Check permissions:

```bash
ls -l
```

Example:

```text
-rwxr-xr--
```

Permissions are divided into:

```text
owner   group   others
rwx     r-x     r--
```

Meaning:

```text
r = read
w = write
x = execute
```

Change permissions:

```bash
chmod +x script.sh
```

---

## 9. Users

Show current user:

```bash
whoami
```

Show user information:

```bash
id
```

Run a command as root:

```bash
sudo command
```

Root has unrestricted system access.

---

## 10. Processes

List processes:

```bash
ps
```

More detailed:

```bash
ps aux
```

Interactive process viewer:

```bash
top
```

Terminate a process:

```bash
kill PID
```

Force termination:

```bash
kill -9 PID
```

---

## 11. Environment Variables

View a variable:

```bash
echo $PATH
```

Set a variable:

```bash
export NAME="value"
```

List environment variables:

```bash
env
```

`PATH` tells the shell where to look for executable programs.

---

## 12. Pipes

Commands can pass output to other commands.

```bash
ls | grep ".txt"
```

Example:

```bash
ps aux | grep nginx
```

The `|` operator sends the output of one command to another.

---

## 13. Redirection

Write output to a file:

```bash
echo hello > file.txt
```

Append:

```bash
echo world >> file.txt
```

Redirect errors:

```bash
command 2> error.log
```

Redirect everything:

```bash
command > output.log 2>&1
```

---

## 14. Shell

The shell interprets commands.

Common shells:

- Bash
- Zsh
- Fish

Check your shell:

```bash
echo $SHELL
```

Example:

```bash
ls -la
```

The shell:

1. Reads the command
2. Parses it
3. Finds the program
4. Starts the program
5. Displays its output

---

## 15. Package Managers

Package managers install software.

Debian/Ubuntu:

```bash
sudo apt update
sudo apt install curl
```

Fedora:

```bash
sudo dnf install curl
```

Arch:

```bash
sudo pacman -S curl
```

---

## 16. Networking

Show network interfaces:

```bash
ip addr
```

Show routes:

```bash
ip route
```

Test connectivity:

```bash
ping example.com
```

Make HTTP requests:

```bash
curl https://example.com
```

Show listening ports:

```bash
ss -tulpn
```

---

## 17. Disk Usage

Show filesystem usage:

```bash
df -h
```

Show directory size:

```bash
du -sh directory
```

Find large files:

```bash
du -ah . | sort -h
```

---

## 18. Archives

Create a tar archive:

```bash
tar -cf archive.tar directory/
```

Extract:

```bash
tar -xf archive.tar
```

Create compressed archive:

```bash
tar -czf archive.tar.gz directory/
```

Extract:

```bash
tar -xzf archive.tar.gz
```

---

## 19. Services

Modern Linux systems commonly use `systemd`.

Check a service:

```bash
systemctl status nginx
```

Start:

```bash
sudo systemctl start nginx
```

Stop:

```bash
sudo systemctl stop nginx
```

Enable at boot:

```bash
sudo systemctl enable nginx
```

Restart:

```bash
sudo systemctl restart nginx
```

---

## 20. Logs

View system logs:

```bash
journalctl
```

Follow logs:

```bash
journalctl -f
```

Logs for a service:

```bash
journalctl -u nginx
```

---

## 21. Useful Commands

| Command      | Purpose               |
| ------------ | --------------------- |
| `pwd`        | Current directory     |
| `ls`         | List files            |
| `cd`         | Change directory      |
| `mkdir`      | Create directory      |
| `touch`      | Create file           |
| `cp`         | Copy                  |
| `mv`         | Move/rename           |
| `rm`         | Delete                |
| `cat`        | Print file            |
| `less`       | Read file             |
| `grep`       | Search text           |
| `find`       | Find files            |
| `chmod`      | Change permissions    |
| `sudo`       | Run as root           |
| `ps`         | List processes        |
| `kill`       | Kill process          |
| `ip`         | Network configuration |
| `curl`       | HTTP client           |
| `df`         | Disk usage            |
| `du`         | Directory usage       |
| `systemctl`  | Manage services       |
| `journalctl` | Read systemd logs     |

---

## 22. The Linux Mental Model

Think of Linux as:

```text
Hardware
   ↓
Linux kernel
   ↓
System calls
   ↓
Programs / services
   ↓
Shell
   ↓
You
```

The kernel manages:

- CPU
- Memory
- Processes
- Filesystems
- Devices
- Networking
- Security

The shell is simply a program that lets you interact with the system.

---

## 23. Good Commands to Learn First

```bash
pwd
ls
cd
mkdir
touch
cp
mv
rm
cat
less
grep
find
chmod
sudo
ps
kill
df
du
curl
systemctl
journalctl
```

Master these first. Everything else builds on them.
