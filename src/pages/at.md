---
layout: ../layouts/MarkdownLayout.astro
title: at
---

# Basics of `at`

`at` runs a command **once at a specified time**.

Unlike `cron`, it is for **one-time jobs**.

## 1. Basic syntax

```bash
at TIME
```

Then type the command:

```bash
at 15:30
echo "hello"
```

Press **Ctrl+D** to submit.

---

## 2. Examples

### Run in 5 minutes

```bash
at now + 5 minutes
```

```bash
echo "done"
```

### Run in 1 hour

```bash
at now + 1 hour
```

### Run at a specific time

```bash
at 18:00
```

```bash
notify-send "Time!"
```

### Run tomorrow

```bash
at 09:00 tomorrow
```

---

## 3. One-line commands

Use `at` with a pipe:

```bash
echo 'notify-send "Done!"' | at 18:00
```

Or:

```bash
echo 'shutdown -h now' | at 23:00
```

---

## 4. List scheduled jobs

```bash
atq
```

Example:

```text
3       Thu Aug 20 18:00:00 2026 a marvin
4       Thu Aug 20 19:30:00 2026 a marvin
```

---

## 5. Delete a job

Get the job ID:

```bash
atq
```

Then:

```bash
atrm 3
```

---

## 6. Useful time formats

```bash
at 15:30
at 3:30 PM
at now + 10 minutes
at now + 2 hours
at now + 1 day
at midnight
at noon
at tomorrow
```

---

## 7. `at` vs `cron`

| Tool   | Purpose            |
| ------ | ------------------ |
| `at`   | Run **once**       |
| `cron` | Run **repeatedly** |

Example:

```bash
at 18:00
```

> Run once at 18:00.

```cron
0 18 * * *
```

> Run every day at 18:00.

---

## 8. Check if `at` is running

On systemd:

```bash
systemctl status atd
```

Start it:

```bash
sudo systemctl enable --now atd
```

---

## 9. Simple alarm

```bash
echo 'notify-send "Alarm!"' | at now + 30 minutes
```

Or play a sound:

```bash
echo 'paplay /path/to/alarm.wav' | at 07:00
```

## Mental model

```text
at
 │
 ├── schedule a command
 │
 ├── atq       → list jobs
 │
 └── atrm ID   → remove job
```

**`at` = one-shot `cron`.**
