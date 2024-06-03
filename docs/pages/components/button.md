---
meta:
  title: Button
  description: Buttons represent actions that are available to the user.
layout: component
---

```html:preview
<sl-button>Button</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => <SlButton>Button</SlButton>;
```

### Variants

Use the `variant` attribute to set the button's variant.

```html:preview
<sl-button variant="primary">Primary</sl-button>
<sl-button variant="success">Success</sl-button>
<sl-button variant="warning">Warning</sl-button>
<sl-button variant="danger">Danger</sl-button>
<sl-button variant="default">Default</sl-button>
<sl-button variant="neutral">Neutral</sl-button>
<sl-button variant="light">Light</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton variant="primary">Primary</SlButton>
    <SlButton variant="success">Success</SlButton>
    <SlButton variant="warning">Warning</SlButton>
    <SlButton variant="danger">Danger</SlButton>
    <SlButton variant="default">Default</SlButton>
    <SlButton variant="neutral">Neutral</SlButton>
    <SlButton variant="light">Light</SlButton>
  </>
);
```

### Fluid

Use the `fluid` attribute to set the button's width to fill its container.

```html:preview
  <sl-button fluid>Fluid button</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton fluid>fluid button</SlButton>
  </>
);
```

### Block

Use the `block` attribute to set the button's width to fill its container.

```html:preview
  <sl-button block >Block button</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton block>Block button</SlButton>
  </>
);
```

### Sizes

Use the `size` attribute to change a button's size.

```html:preview
<sl-button size="x-small">X-Small</sl-button>
<sl-button size="small">Small</sl-button>
<sl-button size="medium">Medium</sl-button>
<sl-button size="large">Large</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton size="x-small">Small</SlButton>
    <SlButton size="small">Small</SlButton>
    <SlButton size="medium">Medium</SlButton>
    <SlButton size="large">Large</SlButton>
  </>
);
```

### Outline Buttons

Use the `outline` attribute to draw outlined buttons with transparent backgrounds.

```html:preview
<sl-button variant="primary" outline>Primary</sl-button>
<sl-button variant="success" outline>Success</sl-button>
<sl-button variant="warning" outline>Warning</sl-button>
<sl-button variant="danger" outline>Danger</sl-button>
<sl-button variant="default" outline>Default</sl-button>
<sl-button variant="neutral" outline>Neutral</sl-button>
<sl-button variant="light" outline>Light</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton variant="primary" outline>
      Primary
    </SlButton>
    <SlButton variant="success" outline>
      Success
    </SlButton>
    <SlButton variant="warning" outline>
      Warning
    </SlButton>
    <SlButton variant="danger" outline>
      Danger
    </SlButton>
     <SlButton variant="default" outline>
      Default
    </SlButton>
    <SlButton variant="neutral" outline>
      Neutral
    </SlButton>
    <SlButton variant="light" outline>
      Light
    </SlButton>
  </>
);
```

### Pill Buttons

Use the `pill` attribute to give buttons rounded edges.

```html:preview
<sl-button size="x-small" pill>x-small</sl-button>
<sl-button size="small" pill>Small</sl-button>
<sl-button size="medium" pill>Medium</sl-button>
<sl-button size="large" pill>Large</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
  <SlButton size="small" pill>
      x-small
    </SlButton>
    <SlButton size="small" pill>
      Small
    </SlButton>
    <SlButton size="medium" pill>
      Medium
    </SlButton>
    <SlButton size="large" pill>
      Large
    </SlButton>
  </>
);
```

### Circle Buttons

Use the `circle` attribute to create circular icon buttons. When this attribute is set, the button expects a single `<sl-icon>` in the default slot.

```html:preview
<sl-button size="x-small" circle>
  <sl-icon name="gear" label="Settings"></sl-icon>
</sl-button>

<sl-button size="small" circle>
  <sl-icon name="gear" label="Settings"></sl-icon>
</sl-button>

<sl-button size="medium" circle>
  <sl-icon name="gear" label="Settings"></sl-icon>
</sl-button>

<sl-button size="large" circle>
  <sl-icon name="gear" label="Settings"></sl-icon>
</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <>
  <SlButton size="x-small" circle>
      <SlIcon name="gear" />
    </SlButton>
    <SlButton size="small" circle>
      <SlIcon name="gear" />
    </SlButton>
    <SlButton size="medium" circle>
      <SlIcon name="gear" />
    </SlButton>
    <SlButton size="large" circle>
      <SlIcon name="gear" />
    </SlButton>
  </>
);
```

### Square Buttons

Use the `square` attribute to create squared icon buttons. When this attribute is set, the button expects a single `<sl-icon>` in the default slot.

```html:preview
<sl-button size="x-small" square>
  <sl-icon name="cv-chat-native-stroke" label="Settings"></sl-icon>
</sl-button>

<sl-button size="small" square>
  <sl-icon name="cv-chat-native-stroke" label="Settings"></sl-icon>
</sl-button>

<sl-button size="medium" square>
  <sl-icon name="cv-chat-native-stroke" label="Settings"></sl-icon>
</sl-button>

<sl-button size="large" square>
  <sl-icon name="cv-chat-native-stroke" label="Settings"></sl-icon>
</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <>
  <SlButton size="x-small" square>
      <SlIcon name="gear" />
    </SlButton>
    <SlButton size="small" square>
      <SlIcon name="gear" />
    </SlButton>
    <SlButton size="medium" square>
      <SlIcon name="gear" />
    </SlButton>
    <SlButton size="large" square>
      <SlIcon name="gear" />
    </SlButton>
  </>
);
```

### Text Buttons

Use the `text` variant to create text buttons that share the same size as regular buttons but don't have backgrounds or borders.

```html:preview
<sl-button variant="text" size="x-small">Text</sl-button>
<sl-button variant="text" size="small">Text</sl-button>
<sl-button variant="text" size="medium">Text</sl-button>
<sl-button variant="text" size="large">Text</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton variant="text" size="small">
      Text
    </SlButton>
    <SlButton variant="text" size="medium">
      Text
    </SlButton>
    <SlButton variant="text" size="large">
      Text
    </SlButton>
  </>
);
```

### Link Buttons

It's often helpful to have a button that works like a link. This is possible by setting the `href` attribute, which will make the component render an `<a>` under the hood. This gives you all the default link behavior the browser provides (e.g. [[CMD/CTRL/SHIFT]] + [[CLICK]]) and exposes the `target` and `download` attributes.

```html:preview
<sl-button href="https://example.com/">Link</sl-button>
<sl-button href="https://example.com/" target="_blank">New Window</sl-button>
<sl-button href="/assets/images/wordmark.svg" download="shoelace.svg">Download</sl-button>
<sl-button href="https://example.com/" disabled>Disabled</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton href="https://example.com/">Link</SlButton>
    <SlButton href="https://example.com/" target="_blank">
      New Window
    </SlButton>
    <SlButton href="/assets/images/wordmark.svg" download="shoelace.svg">
      Download
    </SlButton>
    <SlButton href="https://example.com/" disabled>
      Disabled
    </SlButton>
  </>
);
```

:::tip
When a `target` is set, the link will receive `rel="noreferrer noopener"` for [security reasons](https://mathiasbynens.github.io/rel-noopener/).
:::

### Setting a Custom Width

As expected, buttons can be given a custom width by passing inline styles to the component (or using a class). This is useful for making buttons span the full width of their container on smaller screens.

```html:preview
<sl-button  size="small" style="width: 100%; margin-bottom: 1rem;">Small</sl-button>
<sl-button  size="medium" style="width: 100%; margin-bottom: 1rem;">Medium</sl-button>
<sl-button  size="large" style="width: 100%;">Large</sl-button>
```

{% raw %}

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton size="small" style={{ width: '100%', marginBottom: '1rem' }}>
      Small
    </SlButton>
    <SlButton size="medium" style={{ width: '100%', marginBottom: '1rem' }}>
      Medium
    </SlButton>
    <SlButton size="large" style={{ width: '100%' }}>
      Large
    </SlButton>
  </>
);
```

{% endraw %}

### Block

Alternatively use the `block` attribute to set the button's width to fill its container.

```html:preview
  <sl-button block size='medium'>
    Block button
  </sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton block>Block button</SlButton>
  </>
);
```

### Prefix and Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html:preview

<sl-button size="x-small">
  <sl-icon slot="prefix" name="gear"></sl-icon>
  Settings
</sl-button>

<sl-button size="x-small">
  <sl-icon slot="suffix" name="gear"></sl-icon>
  Refresh
</sl-button>

<sl-button size="x-small">
  <sl-icon slot="prefix" name="gear"></sl-icon>
  <sl-icon slot="suffix" name="gear"></sl-icon>
  Open
</sl-button>

<br /><br />

<sl-button size="small">
  <sl-icon slot="prefix" name="gear"></sl-icon>
  Settings
</sl-button>

<sl-button size="small">
  <sl-icon slot="suffix" name="gear"></sl-icon>
  Refresh
</sl-button>

<sl-button size="small">
  <sl-icon slot="prefix" name="gear"></sl-icon>
  <sl-icon slot="suffix" name="gear"></sl-icon>
  Open
</sl-button>

<br /><br />

<sl-button>
  <sl-icon slot="prefix" name="gear"></sl-icon>
  Settings
</sl-button>

<sl-button>
  <sl-icon slot="suffix" name="gear"></sl-icon>
  Refresh
</sl-button>

<sl-button>
  <sl-icon slot="prefix" name="gear"></sl-icon>
  <sl-icon slot="suffix" name="gear"></sl-icon>
  Open
</sl-button>

<br /><br />

<sl-button size="large">
  <sl-icon slot="prefix" name="gear"></sl-icon>
  Settings
</sl-button>

<sl-button size="large">
  <sl-icon slot="suffix" name="gear"></sl-icon>
  Refresh
</sl-button>

<sl-button size="large">
  <sl-icon slot="prefix" name="gear"></sl-icon>
  <sl-icon slot="suffix" name="gear"></sl-icon>
  Open
</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <>
  <SlButton size="x-small">
      <SlIcon slot="prefix" name="gear"></SlIcon>
      Settings
    </SlButton>

    <SlButton size="x-small">
      <SlIcon slot="suffix" name="gear"></SlIcon>
      Refresh
    </SlButton>

    <SlButton size="x-small">
      <SlIcon slot="prefix" name="gear"></SlIcon>
      <SlIcon slot="suffix" name="gear"></SlIcon>
      Open
    </SlButton>

    <br />
    <br />

    <SlButton size="small">
      <SlIcon slot="prefix" name="gear"></SlIcon>
      Settings
    </SlButton>

    <SlButton size="small">
      <SlIcon slot="suffix" name="gear"></SlIcon>
      Refresh
    </SlButton>

    <SlButton size="small">
      <SlIcon slot="prefix" name="gear"></SlIcon>
      <SlIcon slot="suffix" name="gear"></SlIcon>
      Open
    </SlButton>

    <br />
    <br />

    <SlButton>
      <SlIcon slot="prefix" name="gear"></SlIcon>
      Settings
    </SlButton>

    <SlButton>
      <SlIcon slot="suffix" name="gear"></SlIcon>
      Refresh
    </SlButton>

    <SlButton>
      <SlIcon slot="prefix" name="gear"></SlIcon>
      <SlIcon slot="suffix" name="gear"></SlIcon>
      Open
    </SlButton>

    <br />
    <br />

    <SlButton size="large">
      <SlIcon slot="prefix" name="gear"></SlIcon>
      Settings
    </SlButton>

    <SlButton size="large">
      <SlIcon slot="suffix" name="gear"></SlIcon>
      Refresh
    </SlButton>

    <SlButton size="large">
      <SlIcon slot="prefix" name="gear"></SlIcon>
      <SlIcon slot="suffix" name="gear"></SlIcon>
      Open
    </SlButton>
  </>
);
```

### Caret

Use the `caret` attribute to add a dropdown indicator when a button will trigger a dropdown, menu, or popover.

```html:preview
<sl-button size="x-small" caret>x-small</sl-button>
<sl-button size="small" caret>Small</sl-button>
<sl-button size="medium" caret>Medium</sl-button>
<sl-button size="large" caret>Large</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
   <SlButton size="x-small" caret>
      x-small
    </SlButton>
    <SlButton size="small" caret>
      Small
    </SlButton>
    <SlButton size="medium" caret>
      Medium
    </SlButton>
    <SlButton size="large" caret>
      Large
    </SlButton>
  </>
);
```

### Loading

Use the `loading` attribute to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around.

```html:preview
<sl-button variant="primary" loading>Label</sl-button>
<sl-button variant="success" loading>Label</sl-button>
<sl-button variant="warning" loading>Label</sl-button>
<sl-button variant="danger" loading>Label</sl-button>
<sl-button variant="default" loading>Label</sl-button>
<sl-button variant="neutral" loading>Label</sl-button>
<sl-button variant="light" loading>Label</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton variant="primary" loading>
      Label
    </SlButton>
    <SlButton variant="success" loading>
      Label
    </SlButton>
    <SlButton variant="warning" loading>
      Label
    </SlButton>
    <SlButton variant="danger" loading>
      Label
    </SlButton>
    <SlButton variant="default" loading>
      Label
    </SlButton>
    <SlButton variant="neutral" loading>
      Label
    </SlButton>
     <SlButton variant="light" loading>
      Label
    </SlButton>
  </>
);
```

### Disabled

Use the `disabled` attribute to disable a button.

```html:preview
<sl-button variant="primary" disabled>Primary</sl-button>
<sl-button variant="success" disabled>Success</sl-button>
<sl-button variant="warning" disabled>Warning</sl-button>
<sl-button variant="danger" disabled>Danger</sl-button>
<sl-button variant="default" disabled>Default</sl-button>
<sl-button variant="neutral" disabled>Neutral</sl-button>
<sl-button variant="light" disabled>Light</sl-button>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton variant="primary" disabled>
      Primary
    </SlButton>

    <SlButton variant="success" disabled>
      Success
    </SlButton>


    <SlButton variant="warning" disabled>
      Warning
    </SlButton>

    <SlButton variant="danger" disabled>
      Danger
    </SlButton>

    <SlButton variant="default" disabled>
      Default
    </SlButton>

    <SlButton variant="neutral" disabled>
      Neutral
    </SlButton>

    <SlButton variant="light" disabled>
      Light
    </SlButton>
  </>
);
```

### Styling Buttons

This example demonstrates how to style buttons using a custom class. This is the recommended approach if you need to add additional variations. To customize an existing variation, modify the selector to target the button's `variant` attribute instead of a class (e.g. `sl-button[variant="primary"]`).

```html:preview
<sl-button class="pink">Pink Button</sl-button>

<style>
  sl-button.pink::part(base) {
    /* Set design tokens for height and border width */
    --sl-input-height-medium: 48px;
    --sl-input-border-width: 4px;

    border-radius: 0;
    background-color: #ff1493;
    border-top-color: #ff7ac1;
    border-left-color: #ff7ac1;
    border-bottom-color: #ad005c;
    border-right-color: #ad005c;
    color: white;
    font-size: 1.125rem;
    box-shadow: 0 2px 10px #0002;
    transition: var(--sl-transition-medium) transform ease, var(--sl-transition-medium) border ease;
  }

  sl-button.pink::part(base):hover {
    transform: scale(1.05) rotate(-1deg);
  }

  sl-button.pink::part(base):active {
    border-top-color: #ad005c;
    border-right-color: #ff7ac1;
    border-bottom-color: #ff7ac1;
    border-left-color: #ad005c;
    transform: scale(1.05) rotate(-1deg) translateY(2px);
  }

  sl-button.pink::part(base):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
</style>
```
