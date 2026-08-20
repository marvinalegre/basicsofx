---
layout: ../layouts/MarkdownLayout.astro
title: systemd
---

# Basics of systemd

## What is systemd?

systemd is the init system and service manager used by most modern Linux distributions (Ubuntu, Fedora, Debian, RHEL/CentOS, Arch, etc.). It's the first process (PID 1) that starts at boot and manages all other processes, services, and system state.

## Core Concepts

### Units

Everything in systemd is a **unit** — a resource that systemd knows how to manage. Common unit types:

| Type    | Extension  | Purpose                          |
| ------- | ---------- | -------------------------------- |
| Service | `.service` | Manages a daemon/process         |
| Socket  | `.socket`  | Network/IPC socket activation    |
| Timer   | `.timer`   | Scheduled tasks (like cron)      |
| Mount   | `.mount`   | Filesystem mount points          |
| Target  | `.target`  | Groups of units (like runlevels) |
| Path    | `.path`    | Path-based activation            |

Unit files live in:

- `/etc/systemd/system/` — local/custom overrides (highest priority)
- `/run/systemd/system/` — runtime units
- `/lib/systemd/system/` or `/usr/lib/systemd/system/` — package-installed defaults

## Essential Commands

### Managing services

```bash
systemctl start nginx          # Start a service
systemctl stop nginx           # Stop a service
systemctl restart nginx        # Restart a service
systemctl reload nginx         # Reload config without restart
systemctl status nginx         # Check status
systemctl enable nginx         # Start automatically at boot
systemctl disable nginx        # Don't start at boot
systemctl enable --now nginx   # Enable + start in one command
```

### Checking system state

```bash
systemctl list-units                  # List active units
systemctl list-units --type=service   # List active services
systemctl list-unit-files             # List all installed units + enabled state
systemctl is-active nginx             # Just check if running
systemctl is-enabled nginx            # Just check if enabled at boot
systemctl daemon-reload               # Reload unit files after editing
```

### Logs (journald)

```bash
journalctl -u nginx           # Logs for a specific unit
journalctl -u nginx -f        # Follow logs live (like tail -f)
journalctl -b                 # Logs since last boot
journalctl -p err             # Only error-level logs
journalctl --since "1 hour ago"
```

### Power/session control

```bash
systemctl reboot
systemctl poweroff
systemctl suspend
```

## Anatomy of a Service Unit File

```ini
[Unit]
Description=My Custom App
After=network.target

[Service]
ExecStart=/usr/bin/myapp --config /etc/myapp.conf
Restart=on-failure
User=myuser

[Install]
WantedBy=multi-user.target
```

- **`[Unit]`** — metadata and dependency ordering (`After=`, `Requires=`, `Wants=`)
- **`[Service]`** — how to run it (`ExecStart`, `Type`, `Restart`, `User`)
- **`[Install]`** — how it hooks into boot targets when enabled

Custom unit files go in `/etc/systemd/system/myapp.service`, then:

```bash
systemctl daemon-reload
systemctl enable --now myapp
```

## Targets (replace old "runlevels")

| Target              | Roughly equivalent to    |
| ------------------- | ------------------------ |
| `poweroff.target`   | Runlevel 0               |
| `rescue.target`     | Runlevel 1 (single-user) |
| `multi-user.target` | Runlevel 3 (no GUI)      |
| `graphical.target`  | Runlevel 5 (GUI)         |
| `reboot.target`     | Runlevel 6               |

Check/set default target:

```bash
systemctl get-default
systemctl set-default multi-user.target
```

## Timers (cron alternative)

A `.timer` unit pairs with a `.service` unit of the same name:

```ini
# mybackup.timer
[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

```bash
systemctl enable --now mybackup.timer
systemctl list-timers
```

## Quick Troubleshooting Flow

1. `systemctl status <service>` — see if it's running and recent log lines
2. `journalctl -u <service> -e` — jump to end of that unit's logs
3. `systemctl cat <service>` — view the actual unit file being used
4. `systemctl daemon-reload` — after any manual edit to a unit file
