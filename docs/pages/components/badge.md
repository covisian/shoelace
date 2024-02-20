---
meta:
  title: Badge
  description: Badges are used to draw attention and display statuses or counts.
layout: component
---

```html:preview
<sl-badge>Badge</sl-badge>
```

```jsx:react
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';

const App = () => <SlBadge>Badge</SlBadge>;
```

## Examples

### Variants

Set the `variant` attribute to change the badge's variant.

```html:preview
<sl-badge variant="primary">Primary</sl-badge>
<sl-badge variant="success">Success</sl-badge>
<sl-badge variant="warning">Warning</sl-badge>
<sl-badge variant="danger">Danger</sl-badge>
<sl-badge variant="neutral">Neutral</sl-badge>
<sl-badge variant="neutral-0">Neutral-0</sl-badge>
<sl-badge variant="neutral-1000">Neutral-1000</sl-badge>
```

```jsx:react
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';

const App = () => (
  <>
    <SlBadge variant="primary">Primary</SlBadge>
    <SlBadge variant="success">Success</SlBadge>
    <SlBadge variant="warning">Warning</SlBadge>
    <SlBadge variant="danger">Danger</SlBadge>
    <SlBadge variant="neutral">Neutral</SlBadge>
    <SlBadge variant="neutral-0">Neutral-0</SlBadge>
    <SlBadge variant="neutral-1000">Neutral-1000</SlBadge>
  </>
);
```

### Pill Badges

Use the `pill` attribute to give badges rounded edges.

```html:preview
<sl-badge variant="primary" pill>Primary</sl-badge>
<sl-badge variant="success" pill>Success</sl-badge>
<sl-badge variant="warning" pill>Warning</sl-badge>
<sl-badge variant="danger" pill>Danger</sl-badge>
<sl-badge variant="neutral" pill>Neutral</sl-badge>
<sl-badge variant="neutral-0" pill>Neutral-0</sl-badge>
<sl-badge variant="neutral-1000" pill>Neutral-1000</sl-badge>
```

```jsx:react
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';

const App = () => (
  <>
    <SlBadge variant="primary" pill>
      Primary
    </SlBadge>
    <SlBadge variant="success" pill>
      Success
    </SlBadge>
    <SlBadge variant="warning" pill>
      Warning
    </SlBadge>
    <SlBadge variant="danger" pill>
      Danger
    </SlBadge>
    <SlBadge variant="neutral" pill>
      Neutral
    </SlBadge>
     <SlBadge variant="neutral-0" pill>
      Danger
    </SlBadge>
     <SlBadge variant="neutral-1000" pill>
      Danger
    </SlBadge>
  </>
);
```


### Pulsating Badges

Use the `pulse` attribute to draw attention to the badge with a subtle animation.

```html:preview
<div class="badge-pulse">
  <sl-badge variant="primary" pill pulse>1</sl-badge>
  <sl-badge variant="success" pill pulse>1</sl-badge>
  <sl-badge variant="warning" pill pulse>1</sl-badge>
  <sl-badge variant="danger" pill pulse>1</sl-badge>
  <sl-badge variant="neutral" pill pulse>1</sl-badge>
<sl-badge variant="neutral-0" pill pulse>1</sl-badge>
<sl-badge variant="neutral-1000" pill pulse>1</sl-badge>
</div>

<style>
  .badge-pulse sl-badge:not(:last-of-type) {
    margin-right: 1rem;
  }
</style>
```

```jsx:react
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';

const css = `
  .badge-pulse sl-badge:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

const App = () => (
  <>
    <div className="badge-pulse">
      <SlBadge variant="primary" pill pulse>
        1
      </SlBadge>
      <SlBadge variant="success" pill pulse>
        1
      </SlBadge>
      <SlBadge variant="warning" pill pulse>
        1
      </SlBadge>
      <SlBadge variant="danger" pill pulse>
        1
      </SlBadge>
      <SlBadge variant="neutral" pill pulse>
        1
      </SlBadge>
      <SlBadge variant="neutral-0" pill pulse>
        1
      </SlBadge>
      <SlBadge variant="neutral-1000" pill pulse>
        1
      </SlBadge>
    </div>

    <style>{css}</style>
  </>
);
```

### Soft Badges

Use the `soft` attribute to give badges softer colors.

```html:preview
<sl-badge variant="primary" soft>Primary soft</sl-badge>
<sl-badge variant="success" soft>Success soft</sl-badge>
<sl-badge variant="warning" soft>Warning soft</sl-badge>
<sl-badge variant="danger" soft>Danger soft</sl-badge>
<sl-badge variant="neutral" soft>Neutral soft</sl-badge>
<sl-badge variant="neutral-0" soft>Neutral-0 soft</sl-badge>
<sl-badge variant="neutral-1000" soft>Neutral-1000 soft</sl-badge>
```

```jsx:react
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';

const App = () => (
  <>
    <SlBadge variant="primary" soft>
      Primary soft
    </SlBadge>
    <SlBadge variant="success" soft>
      Success soft
    </SlBadge>
    <SlBadge variant="warning" soft>
      Warning soft
    </SlBadge>
    <SlBadge variant="danger" soft>
      Danger soft
    </SlBadge>
    <SlBadge variant="neutral" soft>
      Neutral soft
    </SlBadge>
    <SlBadge variant="neutral-0" soft>
      Neutral soft
    </SlBadge>
    <SlBadge variant="neutral-1000" soft>
      Neutral soft
    </SlBadge> 
  </>
);
```

### Prefix and Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

Some text.

```html:preview
<sl-badge variant='primary'>
     <sl-icon slot='prefix' name='cv-bell-stroke'></sl-icon>
      prefix and suffix icons
    <sl-icon slot='suffix' name='cv-bell-stroke'></sl-icon>
  </sl-badge>
   <sl-badge variant='primary'>
     <sl-icon slot='prefix' name='cv-bell-stroke'></sl-icon>
      prefix icon
  </sl-badge>
     <sl-badge variant='primary'>
       <sl-icon slot='suffix' name='cv-bell-stroke'></sl-icon>
       suffix icon
     </sl-badge>
```

```jsx:react
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <SlBadge variant="primary" pill>
    <SlIcon slot='prefix' name='cv-bell-stroke'></SlIcon>
       both icons
    <SlIcon slot='suffix' name='cv-bell-stroke'></SlIcon>
  </SlBadge>
  <SlBadge variant="primary" pill>
    <SlIcon slot='prefix' name='cv-bell-stroke'></SlIcon>
      prefix icon
  </SlBadge>
  <SlBadge variant="primary" pill>
      suffix icon
    <SlIcon slot='suffix' name='cv-bell-stroke'></SlIcon>
  </SlBadge>
);
```

### With Buttons

One of the most common use cases for badges is attaching them to buttons. To make this easier, badges will be automatically positioned at the top-right when they're a child of a button.

```html:preview
<sl-button>
  Requests
  <sl-badge pill>30</sl-badge>
</sl-button>

<sl-button style="margin-inline-start: 1rem;">
  Warnings
  <sl-badge variant="warning" pill>8</sl-badge>
</sl-button>

<sl-button style="margin-inline-start: 1rem;">
  Errors
  <sl-badge variant="danger" pill>6</sl-badge>
</sl-button>
```

{% raw %}

```jsx:react
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton>
      Requests
      <SlBadge pill>30</SlBadge>
    </SlButton>

    <SlButton style={{ marginInlineStart: '1rem' }}>
      Warnings
      <SlBadge variant="warning" pill>
        8
      </SlBadge>
    </SlButton>

    <SlButton style={{ marginInlineStart: '1rem' }}>
      Errors
      <SlBadge variant="danger" pill>
        6
      </SlBadge>
    </SlButton>
  </>
);
```

{% endraw %}

### With Menu Items

When including badges in menu items, use the `suffix` slot to make sure they're aligned correctly.

```html:preview
<sl-menu style="max-width: 240px;">
  <sl-menu-label>Messages</sl-menu-label>
  <sl-menu-item>Comments <sl-badge slot="suffix" variant="neutral" pill>4</sl-badge></sl-menu-item>
  <sl-menu-item>Replies <sl-badge slot="suffix" variant="neutral" pill>12</sl-badge></sl-menu-item>
</sl-menu>
```

{% raw %}

```jsx:react
import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlMenu from '@shoelace-style/shoelace/dist/react/menu';
import SlMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';
import SlMenuLabel from '@shoelace-style/shoelace/dist/react/menu-label';

const App = () => (
  <SlMenu
    style={{
      maxWidth: '240px',
      border: 'solid 1px var(--sl-panel-border-color)',
      borderRadius: 'var(--sl-border-radius-medium)'
    }}
  >
    <SlMenuLabel>Messages</SlMenuLabel>
    <SlMenuItem>
      Comments
      <SlBadge slot="suffix" variant="neutral" pill>
        4
      </SlBadge>
    </SlMenuItem>
    <SlMenuItem>
      Replies
      <SlBadge slot="suffix" variant="neutral" pill>
        12
      </SlBadge>
    </SlMenuItem>
  </SlMenu>
);
```

{% endraw %}
