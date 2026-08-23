---
layout: ../layouts/MarkdownLayout.astro
title: Chart.js
---

# Basics of Chart.js

## What is Chart.js?

[Chart.js](https://www.chartjs.org/) is a JavaScript library for creating charts in web pages.

It supports common chart types such as:

- Line charts
- Bar charts
- Pie charts
- Doughnut charts
- Radar charts
- Polar area charts
- Scatter plots
- Bubble charts

Chart.js renders charts using the HTML `<canvas>` element.

## Installation

### CDN

The simplest way is to include Chart.js from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

### npm

For a Node.js project:

```bash
pnpm add chart.js
```

Then import it:

```js
import Chart from "chart.js/auto";
```

## Basic Chart

Create a canvas:

```html
<canvas id="myChart"></canvas>
```

Then create the chart:

```js
const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",

  data: {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Votes",
        data: [12, 19, 7],
      },
    ],
  },
});
```

## Chart Structure

A Chart.js chart generally looks like this:

```js
new Chart(element, {
  type: "line",

  data: {
    labels: [],
    datasets: [],
  },

  options: {},
});
```

### `type`

Specifies the chart type:

```js
type: "line";
```

Other examples:

```js
type: "bar";
type: "pie";
type: "doughnut";
type: "scatter";
```

## Labels

Labels usually represent the X axis:

```js
labels: ["Monday", "Tuesday", "Wednesday"];
```

The data points correspond to those labels:

```js
data: [10, 20, 15];
```

So:

```text
Monday    → 10
Tuesday   → 20
Wednesday → 15
```

## Datasets

A chart can contain multiple datasets:

```js
datasets: [
  {
    label: "Users",
    data: [10, 20, 30],
  },
  {
    label: "Visitors",
    data: [20, 25, 35],
  },
];
```

Each dataset represents a series of data.

## Line Chart

```js
new Chart(ctx, {
  type: "line",

  data: {
    labels: ["Jan", "Feb", "Mar", "Apr"],

    datasets: [
      {
        label: "Sales",
        data: [10, 25, 18, 40],
      },
    ],
  },
});
```

## Bar Chart

```js
new Chart(ctx, {
  type: "bar",

  data: {
    labels: ["A", "B", "C", "D"],

    datasets: [
      {
        label: "Score",
        data: [12, 19, 7, 15],
      },
    ],
  },
});
```

## Pie Chart

```js
new Chart(ctx, {
  type: "pie",

  data: {
    labels: ["Red", "Blue", "Green"],

    datasets: [
      {
        data: [30, 50, 20],
      },
    ],
  },
});
```

## Options

Chart behavior and appearance can be controlled with `options`:

```js
new Chart(ctx, {
  type: "line",

  data: {
    labels: ["A", "B", "C"],
    datasets: [
      {
        label: "Data",
        data: [10, 20, 15],
      },
    ],
  },

  options: {
    responsive: true,
  },
});
```

## Scales

Axes can be configured through `scales`:

```js
options: {
  scales: {
    x: {
      title: {
        display: true,
        text: "Time"
      }
    },

    y: {
      title: {
        display: true,
        text: "Value"
      }
    }
  }
}
```

You can also control the range:

```js
y: {
  min: 0,
  max: 100
}
```

## Updating a Chart

Keep a reference to the chart:

```js
const chart = new Chart(ctx, {
  type: "line",

  data: {
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [10, 20, 30],
      },
    ],
  },
});
```

Change the data:

```js
chart.data.datasets[0].data = [20, 40, 10];
```

Then update:

```js
chart.update();
```

## Destroying a Chart

A chart can be removed:

```js
chart.destroy();
```

This is useful when replacing a chart or reusing a `<canvas>` element.

## Time-Series Data

For dates and times, Chart.js can use a time scale.

Example data:

```js
data: [
  { x: "2026-08-20", y: 10 },
  { x: "2026-08-21", y: 25 },
  { x: "2026-08-22", y: 18 },
];
```

Configure the X axis:

```js
options: {
  scales: {
    x: {
      type: "time";
    }
  }
}
```

Time-based charts require an appropriate date adapter.

## Tooltips

Tooltips appear when the user interacts with data points.

They can be configured:

```js
options: {
  plugins: {
    tooltip: {
      enabled: true;
    }
  }
}
```

## Legends

The legend can be configured through `plugins.legend`:

```js
options: {
  plugins: {
    legend: {
      display: true;
    }
  }
}
```

Hide it:

```js
legend: {
  display: false;
}
```

## Responsive Charts

Chart.js charts are responsive by default.

```js
options: {
  responsive: true;
}
```

A common HTML setup is:

```html
<div>
  <canvas id="chart"></canvas>
</div>
```

The parent container can control the chart's size.

## Multiple Axes

A dataset can use a particular axis:

```js
datasets: [
  {
    label: "Temperature",
    data: [20, 25, 30],
    yAxisID: "temperature",
  },

  {
    label: "Rainfall",
    data: [5, 10, 3],
    yAxisID: "rainfall",
  },
];
```

Then define the axes:

```js
options: {
  scales: {
    temperature: {
      position: "left"
    },

    rainfall: {
      position: "right"
    }
  }
}
```

## Common Workflow

A typical Chart.js workflow is:

```text
1. Create <canvas>
2. Get the canvas element
3. Prepare labels/data
4. Create Chart
5. Configure options
6. Update when data changes
7. Destroy when no longer needed
```

## Minimal Example

Complete example using the CDN:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Chart.js</title>
  </head>

  <body>
    <canvas id="chart"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <script>
      const ctx = document.getElementById("chart");

      new Chart(ctx, {
        type: "line",

        data: {
          labels: ["Jan", "Feb", "Mar", "Apr"],

          datasets: [
            {
              label: "Sales",
              data: [10, 25, 18, 40],
            },
          ],
        },
      });
    </script>
  </body>
</html>
```

## Important Concepts

| Concept     | Purpose                                     |
| ----------- | ------------------------------------------- |
| `Chart`     | Creates a chart                             |
| `type`      | Selects the chart type                      |
| `data`      | Contains chart data                         |
| `labels`    | Labels for categories                       |
| `datasets`  | Data series                                 |
| `options`   | Configures behavior and appearance          |
| `scales`    | Configures axes                             |
| `plugins`   | Configures plugins such as legends/tooltips |
| `update()`  | Refreshes a chart                           |
| `destroy()` | Removes a chart                             |

## Useful Next Topics

- Time-series charts
- Date/time axes
- Chart.js plugins
- Custom tooltips
- Custom legends
- Animations
- Responsive sizing
- Multiple datasets
- Dynamic data
- Real-time charts
- Decimation for large datasets
- Custom scales
