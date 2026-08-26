---
layout: ../layouts/MarkdownLayout.astro
title: Markdown
---

# Basics of Markdown

Markdown is a lightweight markup language for formatting plain text.

## 1. Headings

Use `#` characters:

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

Result:

# Heading 1

## Heading 2

### Heading 3

---

## 2. Paragraphs

Separate paragraphs with a blank line.

```markdown
This is the first paragraph.

This is the second paragraph.
```

---

## 3. Bold

Use `**` or `__`:

```markdown
**bold text**
**bold text**
```

Result:

**bold text**

---

## 4. Italic

Use `*` or `_`:

```markdown
_italic text_
_italic text_
```

Result:

_italic text_

---

## 5. Bold and Italic

```markdown
_**bold and italic**_
_**bold and italic**_
```

Result:

_**bold and italic**_

---

## 6. Strikethrough

Use `~~`:

```markdown
~~deleted text~~
```

Result:

~~deleted text~~

---

## 7. Links

```markdown
[OpenAI](https://openai.com)
```

Result:

[OpenAI](https://openai.com)

---

## 8. Images

```markdown
![Alt text](image.png)
```

The text inside `[]` describes the image.

---

## 9. Unordered Lists

Use `-`, `*`, or `+`:

```markdown
- Apple
- Banana
- Orange
```

Result:

- Apple
- Banana
- Orange

---

## 10. Ordered Lists

Use numbers:

```markdown
1. First
2. Second
3. Third
```

Result:

1. First
2. Second
3. Third

The numbers do not have to be manually maintained:

```markdown
1. First
1. Second
1. Third
```

---

## 11. Nested Lists

Indent nested items:

```markdown
- Fruit
  - Apple
  - Banana
- Vegetables
  - Carrot
  - Potato
```

---

## 12. Checkboxes

```markdown
- [ ] Todo
- [x] Completed
```

Result:

- [ ] Todo
- [x] Completed

---

## 13. Inline Code

Use backticks:

```markdown
Run `npm install` to install dependencies.
```

Result:

Run `npm install` to install dependencies.

---

## 14. Code Blocks

Use triple backticks:

````markdown
```js
const name = "Marvin";
console.log(name);
```
````
