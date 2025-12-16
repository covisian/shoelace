---
meta:
  title: Range
  description: Ranges allow the user to select a single value within a given range using a slider.
layout: component
---

```html:preview
<sl-range></sl-range>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => <SlRange />;
```

:::tip
This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Labels

Use the `label` attribute to give the range an accessible label. For labels that contain HTML, use the `label` slot instead.

```html:preview
<sl-range label="Volume" min="0" max="100"></sl-range>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => <SlRange label="Volume" min={0} max={100} />;
```

### Help Text

Add descriptive help text to a range with the `help-text` attribute. For help texts that contain HTML, use the `help-text` slot instead.

```html:preview
<sl-range label="Volume" help-text="Controls the volume of the current song." min="0" max="100"></sl-range>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => <SlRange label="Volume" help-text="Controls the volume of the current song." min={0} max={100} />;
```

### Min, Max, and Step

Use the `min` and `max` attributes to set the range's minimum and maximum values, respectively. The `step` attribute determines the value's interval when increasing and decreasing.

```html:preview
<sl-range min="0" max="10" step="1"></sl-range>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => <SlRange min={0} max={10} step={1} />;
```

### Disabled

Use the `disabled` attribute to disable a slider.

```html:preview
<sl-range disabled></sl-range>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => <SlRange disabled />;
```

### Tooltip Placement

By default, the tooltip is shown on top. Set `tooltip` to `bottom` to show it below the slider.

```html:preview
<sl-range tooltip="bottom"></sl-range>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => <SlRange tooltip="bottom" />;
```

### Disable the Tooltip

To disable the tooltip, set `tooltip` to `none`.

```html:preview
<sl-range tooltip="none"></sl-range>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => <SlRange tooltip="none" />;
```

### Custom Track Colors

You can customize the active and inactive portions of the track using the `--track-color-active` and `--track-color-inactive` custom properties.

```html:preview
<sl-range
  style="
  --track-color-active: var(--sl-color-primary-600);
  --track-color-inactive: var(--sl-color-primary-100);
"
></sl-range>
```

{% raw %}

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => (
  <SlRange
    style={{
      '--track-color-active': 'var(--sl-color-primary-600)',
      '--track-color-inactive': 'var(--sl-color-primary-200)'
    }}
  />
);
```

{% endraw %}

### Custom Track Offset

You can customize the initial offset of the active track using the `--track-active-offset` custom property.

```html:preview
<sl-range
  min="-100"
  max="100"
  style="
  --track-color-active: var(--sl-color-primary-600);
  --track-color-inactive: var(--sl-color-primary-100);
  --track-active-offset: 50%;
"
></sl-range>
```

{% raw %}

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => (
  <SlRange
    min={-100}
    max={100}
    style={{
      '--track-color-active': 'var(--sl-color-primary-600)',
      '--track-color-inactive': 'var(--sl-color-primary-200)',
      '--track-active-offset': '50%'
    }}
  />
);
```

{% endraw %}

### Custom Color

Use the `color` attribute to change the color of the handles and active track. This accepts any valid CSS color value.

```html:preview
<sl-range label="Red" color="#e74c3c" value="30"></sl-range>
<br />
<sl-range label="Green" color="#27ae60" value="50"></sl-range>
<br />
<sl-range label="Purple" color="#9b59b6" value="70"></sl-range>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => (
  <>
    <SlRange label="Red" color="#e74c3c" value={30} />
    <br />
    <SlRange label="Green" color="#27ae60" value={50} />
    <br />
    <SlRange label="Purple" color="#9b59b6" value={70} />
  </>
);
```

### Custom Tooltip Formatter

You can change the tooltip's content by setting the `tooltipFormatter` property to a function that accepts the range's value as an argument.

```html:preview
<sl-range min="0" max="100" step="1" class="range-with-custom-formatter"></sl-range>

<script>
  const range = document.querySelector('.range-with-custom-formatter');
  range.tooltipFormatter = value => `Total - ${value}%`;
</script>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => <SlRange min={0} max={100} step={1} tooltipFormatter={value => `Total - ${value}%`} />;
```

## Dual-Handle Range

Use the `range` attribute to enable dual-handle mode, which allows selecting a range of values with two handles. In this mode, the `value` property should be an array with two numbers `[min, max]`.

```html:preview
<sl-range label="Select a price range" min="0" max="1000" step="10" range></sl-range>

<script>
  const range = document.querySelector('sl-range[range]');
  range.value = [200, 800];

  range.addEventListener('sl-input', () => {
    console.log('Range:', range.value);
  });
</script>
```

```jsx:react
import { useState } from 'react';
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => {
  const [value, setValue] = useState([200, 800]);

  return (
    <SlRange
      label="Select a price range"
      min={0}
      max={1000}
      step={10}
      range
      value={value}
      onSlInput={e => setValue(e.target.value)}
    />
  );
};
```

### Dual Range with Numeric Inputs

Use the `show-inputs` attribute along with `range` to display numeric input fields for direct value entry.

```html:preview
<sl-range
  label="Budget range"
  min="0"
  max="10000"
  step="100"
  range
  show-inputs
></sl-range>

<script>
  const range = document.querySelector('sl-range[show-inputs]');
  range.value = [2000, 7000];
</script>
```

```jsx:react
import { useState } from 'react';
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => {
  const [value, setValue] = useState([2000, 7000]);

  return (
    <SlRange
      label="Budget range"
      min={0}
      max={10000}
      step={100}
      range
      showInputs
      value={value}
      onSlInput={e => setValue(e.target.value)}
    />
  );
};
```

### Dual Range with Custom Formatter

You can customize the tooltip formatter for dual-handle ranges as well.

```html:preview
<sl-range
  label="Temperature range (°C)"
  min="-20"
  max="50"
  step="1"
  range
  class="range-temperature"
></sl-range>

<script>
  const range = document.querySelector('.range-temperature');
  range.value = [10, 30];
  range.tooltipFormatter = value => `${value}°C`;
</script>
```

```jsx:react
import { useState } from 'react';
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => {
  const [value, setValue] = useState([10, 30]);

  return (
    <SlRange
      label="Temperature range (°C)"
      min={-20}
      max={50}
      step={1}
      range
      value={value}
      onSlInput={e => setValue(e.target.value)}
      tooltipFormatter={value => `${value}°C`}
    />
  );
};
```

### Dual Range with Custom Color

The `color` attribute works with dual-handle ranges too.

```html:preview
<sl-range
  label="Price range"
  min="0"
  max="1000"
  step="10"
  range
  show-inputs
  color="#e67e22"
></sl-range>

<script>
  const range = document.querySelector('sl-range[color="#e67e22"]');
  range.value = [200, 700];
</script>
```

```jsx:react
import { useState } from 'react';
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => {
  const [value, setValue] = useState([200, 700]);

  return (
    <SlRange
      label="Price range"
      min={0}
      max={1000}
      step={10}
      range
      showInputs
      color="#e67e22"
      value={value}
      onSlInput={e => setValue(e.target.value)}
    />
  );
};
```

### Dual Range in Forms

When used in a form with the `range` attribute, the value is submitted as a JSON array string.

```html:preview
<form class="range-form">
  <sl-range
    name="price-range"
    label="Price range"
    min="0"
    max="1000"
    step="50"
    range
    show-inputs
  ></sl-range>
  <br />
  <sl-button type="submit" variant="primary">Submit</sl-button>
</form>

<script>
  const form = document.querySelector('.range-form');
  const range = form.querySelector('sl-range');
  range.value = [100, 500];

  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const priceRange = formData.get('price-range');
    alert(`Selected range: ${priceRange}`);
  });
</script>
```

```jsx:react
import { useState } from 'react';
import SlRange from '@shoelace-style/shoelace/dist/react/range';
import SlButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => {
  const [value, setValue] = useState([100, 500]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const priceRange = formData.get('price-range');
    alert(`Selected range: ${priceRange}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SlRange
        name="price-range"
        label="Price range"
        min={0}
        max={1000}
        step={50}
        range
        showInputs
        value={value}
        onSlInput={e => setValue(e.target.value)}
      />
      <br />
      <SlButton type="submit" variant="primary">Submit</SlButton>
    </form>
  );
};
```
