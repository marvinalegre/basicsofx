---
layout: ../layouts/MarkdownLayout.astro
title: Browser APIs
---

# Basics of Browser APIs

Browser APIs are interfaces provided by the browser that JavaScript can
use to interact with the page, browser, network, device, and rendering
system.

A useful mental model:

```text
JavaScript
    │
    ▼
Browser APIs
    │
    ├── DOM
    ├── Events
    ├── Fetch / Network
    ├── Storage
    ├── URL / History
    ├── Rendering / Animation
    ├── Observers
    ├── Media / Files
    └── Device APIs
```

## 1. JavaScript vs Browser APIs

JavaScript itself provides things such as:

```js
Array;
Map;
Set;
Promise;
Date;
JSON;
```

The browser provides additional APIs:

```js
document;
window;
fetch();
localStorage;
navigator;
WebSocket;
requestAnimationFrame();
```

So:

```text
JavaScript = language/runtime
Browser APIs = capabilities provided by the browser
```

---

# 2. DOM API

The DOM (Document Object Model) represents the HTML document as objects.

```js
const button = document.querySelector("button");

button.textContent = "Click me";

button.addEventListener("click", () => {
  console.log("clicked");
});
```

Common DOM APIs:

```js
document.querySelector();
document.querySelectorAll();
document.createElement();
element.append();
element.remove();
element.classList;
element.style;
element.textContent;
element.getAttribute();
element.setAttribute();
```

---

# 3. Events

Events allow JavaScript to react to things happening in the browser.

## Common events

### Mouse

```text
click
dblclick
mousedown
mouseup
mousemove
mouseenter
mouseleave
mouseover
mouseout
contextmenu
```

### Pointer

Pointer events work across mouse, touch, and pen.

```text
pointerdown
pointerup
pointermove
pointerenter
pointerleave
pointerover
pointerout
pointercancel
```

### Keyboard

```text
keydown
keyup
```

Example:

```js
document.addEventListener("keydown", (event) => {
  console.log(event.key);
});
```

`keypress` is deprecated.

### Forms

```text
input
change
submit
reset
focus
blur
focusin
focusout
invalid
```

Example:

```js
input.addEventListener("input", () => {
  console.log(input.value);
});
```

### Page lifecycle

```text
DOMContentLoaded
load
beforeunload
pagehide
pageshow
visibilitychange
```

Example:

```js
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready");
});
```

Important distinction:

```text
DOMContentLoaded
    → HTML has been parsed and DOM is ready

load
    → page resources have finished loading
```

Neither means that every internal rendering step has completed.

---

# 4. Fetch API

The Fetch API makes HTTP requests.

```js
const response = await fetch("/api/users");
const users = await response.json();

console.log(users);
```

POST:

```js
await fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Marvin",
  }),
});
```

Useful methods:

```js
fetch();
response.json();
response.text();
response.blob();
response.arrayBuffer();
```

---

# 5. Web Storage

## localStorage

Stores small amounts of string data that persist across browser
sessions.

```js
localStorage.setItem("theme", "dark");

const theme = localStorage.getItem("theme");

localStorage.removeItem("theme");
```

Clear everything:

```js
localStorage.clear();
```

## sessionStorage

Similar to `localStorage`, but associated with the current page session.

```js
sessionStorage.setItem("step", "2");
```

For larger or structured client-side data, consider IndexedDB instead.

---

# 6. URL API

The URL API makes it easier to parse and manipulate URLs.

```js
const url = new URL("https://example.com/products?page=2");

console.log(url.hostname);
console.log(url.pathname);
console.log(url.searchParams.get("page"));
```

Manipulating query parameters:

```js
url.searchParams.set("page", "3");

console.log(url.href);
```

---

# 7. History API

The History API lets JavaScript manipulate browser navigation history.

```js
history.pushState({}, "", "/about");
```

Replace the current history entry:

```js
history.replaceState({}, "", "/about");
```

Listen for back/forward navigation:

```js
window.addEventListener("popstate", () => {
  console.log("navigation occurred");
});
```

This is important for client-side routers and SPAs.

---

# 8. Rendering and Animation APIs

These APIs interact closely with the browser's rendering pipeline.

A simplified rendering pipeline is:

```text
DOM + CSS
    ↓
Style calculation
    ↓
Layout
    ↓
Paint
    ↓
Composite
    ↓
Screen
```

## requestAnimationFrame()

Schedules a callback before the browser renders the next frame.

```js
function animate() {
  element.style.transform = "translateX(100px)";
}

requestAnimationFrame(animate);
```

For continuous animation:

```js
let x = 0;

function animate() {
  x += 1;

  element.style.transform = `translateX(${x}px)`;

  if (x < 500) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
```

Use it for visual updates instead of trying to synchronize animation
with `setInterval()`.

## cancelAnimationFrame()

Cancel a scheduled frame:

```js
const id = requestAnimationFrame(animate);

cancelAnimationFrame(id);
```

---

# 9. Web Animations API

`Element.animate()` allows JavaScript to create and control animations.

```js
const animation = element.animate(
  [{ transform: "translateX(0)" }, { transform: "translateX(100px)" }],
  {
    duration: 1000,
    fill: "forwards",
  },
);
```

Control the animation:

```js
animation.play();
animation.pause();
animation.reverse();
animation.cancel();
```

This is different from manually changing styles every frame with
`requestAnimationFrame()`.

---

# 10. CSS-related APIs

## getComputedStyle()

Read the browser's computed CSS values.

```js
const styles = getComputedStyle(element);

console.log(styles.width);
console.log(styles.color);
console.log(styles.display);
```

## classList

Manipulate CSS classes:

```js
element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active");
```

## matchMedia()

Test CSS media-query conditions from JavaScript.

```js
const mobile = window.matchMedia("(max-width: 768px)");

console.log(mobile.matches);
```

Listen for changes:

```js
mobile.addEventListener("change", (event) => {
  console.log(event.matches);
});
```

---

# 11. IntersectionObserver

Detect when an element enters or leaves a viewport or another scroll
container.

```js
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      console.log("Element is visible");
    }
  }
});

observer.observe(element);
```

Common uses:

- Lazy loading
- Infinite scrolling
- Reveal animations
- Visibility tracking

Instead of constantly doing:

```js
window.addEventListener("scroll", ...)
```

you can often use `IntersectionObserver`.

---

# 12. ResizeObserver

Detect changes to an element's size.

```js
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log(entry.contentRect.width);
    console.log(entry.contentRect.height);
  }
});

observer.observe(element);
```

Useful for components that need to react to their own dimensions.

---

# 13. requestIdleCallback()

Schedules low-priority work when the browser has idle time.

```js
requestIdleCallback(() => {
  console.log("low-priority work");
});
```

Do not use it for animation.

Think:

```text
requestAnimationFrame()
    → "I need to update something visually"

requestIdleCallback()
    → "I have non-urgent work"
```

---

# 14. Canvas API

Canvas provides a drawing surface.

HTML:

```html
<canvas id="canvas"></canvas>
```

JavaScript:

```js
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

ctx.fillRect(10, 10, 100, 100);
```

Common uses:

- Games
- Drawing
- Charts
- Image processing
- Visual effects

---

# 15. WebSocket API

WebSockets provide a persistent two-way connection between the browser
and server.

```js
const socket = new WebSocket("wss://example.com");

socket.addEventListener("open", () => {
  socket.send("Hello");
});

socket.addEventListener("message", (event) => {
  console.log(event.data);
});
```

Useful for:

- Chat
- Multiplayer games
- Live dashboards
- Real-time applications

---

# 16. File API

Access files selected by the user.

```html
<input type="file" id="file" />
```

```js
const input = document.querySelector("#file");

input.addEventListener("change", () => {
  const file = input.files[0];

  console.log(file.name);
  console.log(file.size);
  console.log(file.type);
});
```

Browsers restrict file access for security reasons.

---

# 17. Clipboard API

Read and write clipboard data.

```js
await navigator.clipboard.writeText("Hello");
```

Read:

```js
const text = await navigator.clipboard.readText();

console.log(text);
```

Clipboard operations have security and permission requirements.

---

# 18. Geolocation API

Request the user's geographic position.

```js
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
});
```

The browser asks the user for permission.

---

# 19. Media Devices API

Access devices such as cameras and microphones.

```js
const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
});
```

Common uses:

- Video calls
- Camera apps
- Audio recording
- Screen/video processing

Permissions are required.

---

# 20. Notifications API

Display system notifications.

```js
await Notification.requestPermission();

if (Notification.permission === "granted") {
  new Notification("Hello");
}
```

The user must grant permission.

---

# 21. Web Workers

Run JavaScript in a separate worker context.

Main thread:

```js
const worker = new Worker("worker.js");

worker.postMessage(10);

worker.addEventListener("message", (event) => {
  console.log(event.data);
});
```

Worker:

```js
self.addEventListener("message", (event) => {
  self.postMessage(event.data * 2);
});
```

Useful for CPU-heavy work that should not block the main thread.

---

# 22. Service Workers

Service workers run independently of a page and can intercept network
requests.

Register one:

```js
navigator.serviceWorker.register("/sw.js");
```

Common uses:

- Offline applications
- Resource caching
- Progressive Web Apps
- Push notifications

---

# 23. IndexedDB

IndexedDB is a browser database for larger structured data.

Basic example:

```js
const request = indexedDB.open("MyDatabase", 1);

request.onsuccess = () => {
  const db = request.result;
  console.log(db);
};
```

Compared with Web Storage:

```text
localStorage
    → simple
    → strings
    → small amounts of data

IndexedDB
    → more complex
    → structured data
    → larger amounts of data
    → asynchronous
```

---

# 24. Performance APIs

The Performance APIs allow you to measure browser operations and page
performance.

```js
console.log(performance.now());
```

Measure a section:

```js
const start = performance.now();

doSomething();

const end = performance.now();

console.log(end - start);
```

Performance entries:

```js
const entries = performance.getEntries();

console.log(entries);
```

A `PerformanceObserver` can observe certain performance entries:

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.startTime);
  }
});

observer.observe({
  type: "paint",
  buffered: true,
});
```

---

# 25. Browser Request → Rendering Flow

A simplified page-load flow:

```text
User navigates
      ↓
Parse URL
      ↓
Cache checks
      ↓
DNS
      ↓
Network connection
      ↓
TLS handshake
      ↓
HTTP request
      ↓
Server
      ↓
HTTP response
      ↓
HTML parsing
      ↓
Discover subresources
      ↓
Download CSS / JS / images / fonts
      ↓
Build DOM
      ↓
Build CSSOM
      ↓
Style calculation
      ↓
Layout
      ↓
Paint
      ↓
Composite
      ↓
Screen
```

Not every phase has a JavaScript event.

For example:

```text
DNS          → no general JS event
TCP/TLS      → no general JS event
HTML parse   → DOMContentLoaded signals readiness
CSSOM        → no general event
Layout       → no general event
Paint        → performance APIs can expose some milestones
Composite    → no general event
```

---

# 26. Events vs Browser APIs

An important distinction:

Events tell you that **something happened**.

```js
element.addEventListener("click", handler);
```

Other browser APIs let you **schedule, observe, or perform work**.

```js
requestAnimationFrame();
IntersectionObserver;
ResizeObserver;
matchMedia();
fetch();
```

For example:

```text
User scrolls
    ↓
scroll event
```

But if the goal is:

```text
"Tell me when this element becomes visible"
```

use:

```js
IntersectionObserver;
```

Similarly:

```text
"Tell me when this element changes size"
    ↓
ResizeObserver

"Tell me when the browser is ready for the next frame"
    ↓
requestAnimationFrame()

"Tell me whether this media query matches"
    ↓
matchMedia()
```

---

# 27. Common Browser Events

A practical list:

```text
Mouse / Pointer
----------------
click
dblclick
mousedown
mouseup
mousemove
pointerdown
pointerup
pointermove

Keyboard
----------------
keydown
keyup

Forms
----------------
input
change
submit
reset
focus
blur
focusin
focusout
invalid

Page
----------------
DOMContentLoaded
load
beforeunload
pagehide
pageshow
visibilitychange

Scrolling / Viewport
----------------
scroll
wheel
resize

Clipboard
----------------
copy
cut
paste

Drag and Drop
----------------
dragstart
drag
dragend
dragenter
dragover
dragleave
drop

Media
----------------
play
pause
ended
timeupdate
loadedmetadata
canplay
waiting
error

CSS Animation
----------------
animationstart
animationiteration
animationend
animationcancel

CSS Transition
----------------
transitionrun
transitionstart
transitionend
transitioncancel

Network
----------------
online
offline
```

---

# 28. What to Learn First

For normal frontend development, prioritize these:

## Essential

```text
DOM
Events
Fetch
localStorage
URL
History
```

## Rendering / UI

```text
requestAnimationFrame()
Element.animate()
IntersectionObserver
ResizeObserver
matchMedia()
getComputedStyle()
```

## Browser data

```text
IndexedDB
Clipboard API
File API
```

## Advanced

```text
Web Workers
Service Workers
WebSocket
Media Devices
Canvas
Notifications
```

---

# 29. Mental Model

The most useful overall model is:

```text
                    Browser
                       │
        ┌──────────────┼──────────────┐
        │              │              │
       DOM          Network        Rendering
        │              │              │
     Events          Fetch       requestAnimationFrame
     Forms           WebSocket   Element.animate
     CSS classes     URL         IntersectionObserver
        │              │          ResizeObserver
        │              │              │
        └──────────────┼──────────────┘
                       │
                   JavaScript
```

JavaScript is not directly "the browser."

JavaScript uses browser-provided APIs to interact with the browser.

```text
JavaScript
    ↓
Browser API
    ↓
Browser subsystem
    ↓
Result / event / rendering
```

For example:

```text
JavaScript
    ↓
fetch()
    ↓
Network
    ↓
HTTP response
    ↓
JavaScript
```

Or:

```text
JavaScript
    ↓
requestAnimationFrame()
    ↓
Browser rendering cycle
    ↓
Layout / Paint / Composite
    ↓
Screen
```
