---
layout: ../layouts/MarkdownLayout.astro
title: Temporal Javascript
---

# Basics of Temporal Javascript

## What is Temporal?

Temporal is a modern JavaScript API for working with dates, times, time zones, and durations.

It addresses many problems with the older `Date` API.

```js
const today = Temporal.Now.plainDateISO();

console.log(today);
```

## Why Temporal?

The old `Date` API has several problems:

- Mutable objects
- Confusing time-zone handling
- Awkward date arithmetic
- No separate date-only or time-only types
- Zero-based months in some APIs

Temporal provides separate types for different concepts.

## Main Temporal Types

### `Temporal.PlainDate`

A calendar date without a time or time zone.

```js
const date = Temporal.PlainDate.from("2026-08-26");

console.log(date.year); // 2026
console.log(date.month); // 8
console.log(date.day); // 26
```

Useful for:

- Birthdays
- Holidays
- Due dates
- Calendar dates

### `Temporal.PlainDateTime`

A date and time without a time zone.

```js
const dateTime = Temporal.PlainDateTime.from("2026-08-26T14:30");

console.log(dateTime); // PlainDateTime [Temporal.PlainDateTime] {}
```

### `Temporal.ZonedDateTime`

A date and time associated with a time zone.

```js
const zdt = Temporal.ZonedDateTime.from("2026-08-26T14:30+08:00[Asia/Manila]");

console.log(zdt); // ZonedDateTime [Temporal.ZonedDateTime] {}
```

Use this when the time zone matters.

### `Temporal.Instant`

Represents an exact moment on the timeline.

```js
const instant = Temporal.Now.instant();

console.log(instant); // Instant [Temporal.Instant] {}
```

Good for:

- Database timestamps
- Logs
- Events
- Comparing exact moments

### `Temporal.Duration`

Represents an amount of time.

```js
const duration = Temporal.Duration.from({
  hours: 2,
  minutes: 30,
});

console.log(duration); // Duration [Temporal.Duration] {}
```

## Getting the Current Date and Time

### Current date

```js
const date = Temporal.Now.plainDateISO();
```

### Current time

```js
const time = Temporal.Now.plainTimeISO();
```

### Current date and time

```js
const dateTime = Temporal.Now.plainDateTimeISO();
```

### Current instant

```js
const instant = Temporal.Now.instant();
```

## Date Arithmetic

Temporal makes date arithmetic explicit.

```js
const date = Temporal.PlainDate.from("2026-08-26");

const tomorrow = date.add({
  days: 1,
});

console.log(tomorrow);
```

Subracting:

```js
const yesterday = date.subtract({
  days: 1,
});
```

Other examples:

```js
date.add({ weeks: 2 });
date.add({ months: 3 });
date.add({ years: 1 });
```

## Comparing Dates

Use `Temporal.PlainDate.compare()`.

```js
const a = Temporal.PlainDate.from("2026-08-26");
const b = Temporal.PlainDate.from("2026-09-01");

console.log(Temporal.PlainDate.compare(a, b));
```

Results:

```
-1 → a comes before b
 0 → a equals b
 1 → a comes after b
```

## Finding the Difference

Use `until()`.

```js
const start = Temporal.PlainDate.from("2026-08-26");

const end = Temporal.PlainDate.from("2026-09-01");

const difference = start.until(end);

console.log(difference);
```

You can specify the unit:

```js
const difference = start.until(end, {
  largestUnit: "days",
});
```

## Parsing

Temporal can parse ISO date/time strings.

```js
const date = Temporal.PlainDate.from("2026-08-26");

const time = Temporal.PlainTime.from("14:30");

const dateTime = Temporal.PlainDateTime.from("2026-08-26T14:30");
```

Prefer ISO 8601 for data interchange.

## Time Zones

Temporal uses IANA time-zone identifiers.

```js
const manila = Temporal.Now.zonedDateTimeISO("Asia/Manila");

console.log(manila);
```

Convert the same instant to another time zone:

```js
const tokyo = manila.withTimeZone("Asia/Tokyo");

console.log(manila);
console.log(tokyo);
```

The instant is the same; only the local representation changes.

## Converting Between Types

For example:

```js
const dateTime = Temporal.PlainDateTime.from("2026-08-26T14:30");

const date = dateTime.toPlainDate();
const time = dateTime.toPlainTime();
```

## Formatting

Temporal provides ISO-style string representations.

```js
const date = Temporal.PlainDate.from("2026-08-26");

console.log(date.toString()); // 2026-08-26
```

For human-readable formatting, use `Intl.DateTimeFormat`.

```js
const formatted = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
}).format(date);

console.log(formatted); // August 26, 2026
```

## Immutability

Temporal objects are immutable.
Methods return new objects instead of modifying the original.

```js
const date = Temporal.PlainDate.from("2026-08-26");

const tomorrow = date.add({
  days: 1,
});

console.log(date);
// 2026-08-26

console.log(tomorrow);
// 2026-08-27
```

## Useful Patterns

### Add one day

```js
date.add({ days: 1 });
```

### Add one month

```js
data.add({ month: 1 });
```

### Start a month

```js
date.with({ day: 1 });
```

### Last day of a month

```js
date.with({
  day: date.daysInMonth,
});
```

### Current year

```js
Temporal.Now.plainDateISO().year;
```

## Temporal vs `Date`

Old:

```js
const date = new Date();
```

Temporal:

```js
const instant = Temporal.Now.instant();
```

`Date` represents an instant but has historically been used for many different concepts.

Temporal gives you types that describe what the value actually means:

```
PlainDate
    ↓
calendar date

PlainTime
    ↓
time of day

PlainDateTime
    ↓
date + time

ZonedDateTime
    ↓
date + time + time zone

Instant
    ↓
exact moment

Duration
    ↓
amount of time
```

## Rule of Thumb

Choose the type based on what the value means:

```
"August 26, 2026"
        ↓
PlainDate

"14:30"
        ↓
PlainTime

"August 26 at 14:30"
        ↓
PlainDateTime

"August 26 at 14:30 in Manila"
        ↓
ZonedDateTime

"An exact timestamp"
        ↓
Instant

"Two hours and thirty minutes"
        ↓
Duration
```

The core idea:

> **Represent dates and times according to what they actually mean.**
