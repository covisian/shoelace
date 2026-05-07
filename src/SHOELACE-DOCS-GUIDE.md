# Shoelace Component Documentation Guide

This guide explains how to create documentation for Shoelace components that integrates with the SmileCX showcase.

## Overview

The SmileCX showcase uses `.docs.json` files to generate interactive component documentation. This allows developers to browse components, see live examples, and copy code snippets.

## File Structure

Documentation files live in `packages/core/design-system/docs/shoelace/` with the naming pattern: `{component-tag}.docs.json`

Example: `sl-button.docs.json`, `sl-icon.docs.json`

## JSON Schema

```json
{
  "tag": "sl-button",
  "type": "shoelace",
  "filePath": "@covisian/shoelace",
  "category": "Forms",
  "description": "Brief component description",
  "status": "stable",
  "props": [...],
  "events": [...],
  "slots": [...],
  "cssParts": [...],
  "examples": [...],
  "related": ["sl-icon-button"],
  "notes": "Additional notes or caveats"
}
```

## Schema Properties

### Required Fields

- **`tag`** (string): Component tag name (e.g., `"sl-button"`)
- **`type`** (string): Always `"shoelace"` for Shoelace components
- **`filePath`** (string): Always `"@covisian/shoelace"` for fork components
- **`category`** (string): Component category (e.g., `"Forms"`, `"Graphics"`, `"Navigation"`)
- **`description`** (string): Brief description of the component
- **`status`** (string): `"stable"`, `"experimental"`, `"deprecated"`

### Optional Fields

- **`props`** (array): Component properties/attributes
- **`events`** (array): Component events
- **`slots`** (array): Component slots
- **`cssParts`** (array): CSS Shadow Parts for styling
- **`examples`** (array): Live code examples (most important!)
- **`related`** (array): Related component tags
- **`notes`** (string): Additional information
- **`dependencies`** (array): Component dependencies

## Props Format

```json
{
  "name": "variant",
  "type": "'default' | 'primary' | 'success'",
  "description": "The button's theme variant",
  "defaultValue": "'default'",
  "required": false,
  "values": ["default", "primary", "success"]
}
```

## Events Format

```json
{
  "name": "sl-blur",
  "description": "Emitted when the button loses focus",
  "detail": "void",
  "bubbles": true,
  "cancelable": false
}
```

## Slots Format

```json
{
  "name": "prefix",
  "description": "A presentational prefix icon or similar element"
}
```

## CSS Parts Format

```json
{
  "name": "base",
  "description": "The component's base wrapper"
}
```

## Examples Format (Most Important)

Examples are rendered as live, interactive previews in the showcase.

```json
{
  "title": "Basic Button",
  "description": "Default button with no special styling",
  "code": "<sl-button>Click me</sl-button>",
  "language": "html"
}
```

### Example Best Practices

1. **Keep examples simple** - One concept per example
2. **Use inline styles** - Avoid external CSS classes
3. **Self-contained** - Each example should work independently
4. **Progressive complexity** - Start simple, increase complexity
5. **Interactive** - Show the component in action when possible
6. **Use Covisian icons** - When including icons in examples, always use icons with the `cv-` prefix (e.g., `cv-plus`, `cv-chat-native-stroke`). Avoid using generic Bootstrap icons in component examples.

### Example with Script

For dynamic examples (like icon galleries), you can include JavaScript:

```json
{
  "title": "Interactive Example",
  "description": "Example with dynamic behavior",
  "code": "<div id=\"example-root\"></div>\n\n<script>\n  const root = document.getElementById('example-root');\n  // Your JavaScript here\n</script>",
  "language": "html"
}
```

**Note:** Scripts are automatically executed by the showcase after rendering.

## Converting from Shoelace Fork Examples

### Step 1: Locate Fork Examples

In the Shoelace fork repository, component examples are typically in:

- `/src/components/{component-name}/{component-name}.mdx`
- Or in separate example files

### Step 2: Extract HTML Examples

Look for HTML code blocks in the MDX files:

````mdx
## Basic Usage

```html
<sl-button>Click me</sl-button>
```

## Variants

```html
<sl-button variant="primary">Primary</sl-button> <sl-button variant="success">Success</sl-button>
```
````

### Step 3: Convert to JSON Format

Transform each example:

```json
{
  "title": "Basic Usage",
  "description": "Simple button with default styling",
  "code": "<sl-button>Click me</sl-button>",
  "language": "html"
},
{
  "title": "Variants",
  "description": "Different button variants",
  "code": "<sl-button variant=\"primary\">Primary</sl-button>\n<sl-button variant=\"success\">Success</sl-button>",
  "language": "html"
}
```

**Important:** When converting examples, replace any generic Bootstrap icons (e.g., `name="gear"`, `name="star"`) with Covisian custom icons using the `cv-` prefix (e.g., `name="cv-settings"`, `name="cv-star"`).

### Step 4: Extract Props from TypeScript

From the component's TypeScript file, extract props:

```typescript
// From fork: src/components/button/button.ts
@property() variant: 'default' | 'primary' | 'success' = 'default';
@property({ type: Boolean }) disabled = false;
```

Convert to JSON:

```json
{
  "name": "variant",
  "type": "'default' | 'primary' | 'success'",
  "description": "The button's theme variant",
  "defaultValue": "'default'",
  "required": false,
  "values": ["default", "primary", "success"]
},
{
  "name": "disabled",
  "type": "boolean",
  "description": "Disables the button",
  "defaultValue": "false",
  "required": false
}
```

### Step 5: Extract Events

From the component's TypeScript:

```typescript
@event('sl-blur') slBlur: EventEmitter<void>;
```

Convert to JSON:

```json
{
  "name": "sl-blur",
  "description": "Emitted when the button loses focus",
  "detail": "void"
}
```

## Automation Script (Optional)

You can create a Node.js script to automate conversion:

````javascript
// scripts/convert-shoelace-docs.mjs
import { readFileSync, writeFileSync } from 'fs';

function extractExamplesFromMDX(mdxContent) {
  const examples = [];
  const codeBlockRegex = /## (.+?)\n\n```html\n([\s\S]+?)\n```/g;

  let match;
  while ((match = codeBlockRegex.exec(mdxContent)) !== null) {
    examples.push({
      title: match[1].trim(),
      description: '',
      code: match[2].trim(),
      language: 'html'
    });
  }

  return examples;
}

// Usage:
// const mdx = readFileSync('path/to/fork/component.mdx', 'utf-8');
// const examples = extractExamplesFromMDX(mdx);
````

## Testing Your Documentation

1. **Generate the manifest:**

   ```bash
   pnpm run docs:generate
   ```

2. **Start the showcase:**

   ```bash
   pnpm run dev:docs
   ```

3. **Open in browser:**
   - Navigate to http://localhost:3338/docs/docs.html
   - Select your component from the sidebar
   - Verify all examples render correctly

## Common Issues

### Scripts Not Executing

If inline scripts don't run, ensure:

- The script is inside the `code` field
- No syntax errors in JavaScript
- DOM elements are created before script runs

### Styling Issues

If examples look broken:

- Use Shoelace design tokens (CSS variables)
- Avoid external CSS classes
- Use inline styles when needed
- Test in showcase, not just in JSON

### Icon Not Displaying

For Shoelace icons:

- Ensure icon name is correct
- **Always use `cv-` prefix for Covisian custom icons** in component examples
- Do not use generic Bootstrap icons (without `cv-` prefix) in examples
- Icons load from CDN: https://smart-cdn.app.covisian.com

## Example: Complete Button Documentation

```json
{
  "tag": "sl-button",
  "type": "shoelace",
  "filePath": "@covisian/shoelace",
  "category": "Forms",
  "description": "Buttons represent actions available to the user.",
  "status": "stable",
  "props": [
    {
      "name": "variant",
      "type": "'default' | 'primary' | 'success' | 'danger'",
      "description": "The button's theme variant",
      "defaultValue": "'default'",
      "required": false,
      "values": ["default", "primary", "success", "danger"]
    },
    {
      "name": "size",
      "type": "'small' | 'medium' | 'large'",
      "description": "The button's size",
      "defaultValue": "'medium'",
      "required": false,
      "values": ["small", "medium", "large"]
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables the button",
      "defaultValue": "false",
      "required": false
    }
  ],
  "events": [
    {
      "name": "sl-blur",
      "description": "Emitted when the button loses focus",
      "detail": "void"
    },
    {
      "name": "sl-focus",
      "description": "Emitted when the button gains focus",
      "detail": "void"
    }
  ],
  "slots": [
    {
      "name": "prefix",
      "description": "Content to display before the button label"
    },
    {
      "name": "",
      "description": "The button's label"
    },
    {
      "name": "suffix",
      "description": "Content to display after the button label"
    }
  ],
  "cssParts": [
    {
      "name": "base",
      "description": "The component's base wrapper"
    },
    {
      "name": "label",
      "description": "The button's label"
    }
  ],
  "examples": [
    {
      "title": "Basic Button",
      "description": "Default button with no special styling",
      "code": "<sl-button>Click me</sl-button>",
      "language": "html"
    },
    {
      "title": "Button Variants",
      "description": "Buttons are available in different variants",
      "code": "<sl-button variant=\"default\">Default</sl-button>\n<sl-button variant=\"primary\">Primary</sl-button>\n<sl-button variant=\"success\">Success</sl-button>\n<sl-button variant=\"danger\">Danger</sl-button>",
      "language": "html"
    },
    {
      "title": "Button Sizes",
      "description": "Buttons come in three sizes",
      "code": "<sl-button size=\"small\">Small</sl-button>\n<sl-button size=\"medium\">Medium</sl-button>\n<sl-button size=\"large\">Large</sl-button>",
      "language": "html"
    },
    {
      "title": "Disabled State",
      "description": "Use the disabled attribute to disable a button",
      "code": "<sl-button disabled>Disabled</sl-button>",
      "language": "html"
    }
  ],
  "related": ["sl-icon-button", "sl-button-group"],
  "notes": "This is the Covisian customized version of Shoelace button."
}
```

## Checklist

Before committing your documentation:

- [ ] Component tag is correct
- [ ] All props are documented with types and defaults
- [ ] Events include detail type
- [ ] Examples are self-contained and render correctly
- [ ] Examples progress from simple to complex
- [ ] CSS parts are documented (if component uses Shadow DOM)
- [ ] Related components are listed
- [ ] Tested in showcase (http://localhost:3338/docs/docs.html)
- [ ] No console errors in browser
- [ ] Examples are aligned with Shoelace fork examples

## References

- **Shoelace Fork Repository:** Check your internal fork URL
- **Schema Definition:** `packages/core/design-system/schemas/component-docs.schema.json`
- **Existing Examples:** `packages/core/design-system/docs/shoelace/`
- **Showcase URL:** http://localhost:3338/docs/docs.html (dev mode)

## Questions?

For questions or issues:

1. Check existing `.docs.json` files for reference
2. Run `pnpm run docs:generate` to validate JSON
3. Test in showcase to verify rendering
4. Review this guide for common patterns

---

**Last Updated:** 2025-03-17
