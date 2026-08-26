---
layout: ../layouts/MarkdownLayout.astro
title: pass
---

# Basics of `pass`

`pass` is a Unix command that does **nothing successfully**. It is mainly useful as a placeholder in shell scripts.

## Basic usage

```bash
pass
```

Produces no output and exits with status `0`.

## Check the exit status

```bash
pass
echo $?
```

Output:

```text
0
```

This makes `pass` useful when you need a command that intentionally succeeds.

## Why use `pass`?

### Placeholder

```bash
if [ "$condition" ]; then
    pass
else
    echo "condition failed"
fi
```

### Empty loop body

```bash
while read -r line; do
    pass
done < file.txt
```

### No-op in a script

```bash
case "$command" in
    start)
        start_service
        ;;
    stop)
        stop_service
        ;;
    status)
        pass
        ;;
esac
```

## `pass` vs `:`

`:` is the more common shell no-op:

```bash
:
```

For example:

```bash
if command; then
    :
fi
```

`pass` is still useful when you want the intent to be visually obvious:

```bash
if command; then
    pass
fi
```

## Important

`pass` does **not** mean:

- ignore an error
- skip the next command
- pause execution
- continue a loop
- do nothing and return failure

It simply succeeds without producing output.

## Related commands

```bash
true       # succeeds
false      # fails
:          # shell no-op; succeeds
pass       # no-op command; succeeds
```

In shell scripting, `:` or `true` is generally preferred for a no-op. `pass` is mainly useful when readability or an explicitly named placeholder is desired.
