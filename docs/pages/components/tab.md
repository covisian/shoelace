---
meta:
  title: Tab
  description: Tabs are used inside tab groups to represent and activate tab panels.
layout: component
---

```html:preview
<sl-tab>Tab</sl-tab>
<sl-tab active>Active</sl-tab>
<sl-tab closable>Closable</sl-tab>
<sl-tab disabled>Disabled</sl-tab>
<sl-tab variant='wizard'>
  <span slot="step">nº</span>
  <span slot='label'>wizard</span>
</sl-tab>

```

```jsx:react
import SlTab from '@shoelace-style/shoelace/dist/react/tab';

const App = () => (
  <>
    <SlTab>Tab</SlTab>
    <SlTab active>Active</SlTab>
    <SlTab closable>Closable</SlTab>
    <SlTab disabled>Disabled</SlTab>
    <SlTab variant='wizard'>
      <span slot="step">nº</span>
      <span slot='label'>wizard</span>
    </SlTab>
  </>
);
```

:::tip
Additional demonstrations can be found in the [tab group examples](/components/tab-group).
:::
