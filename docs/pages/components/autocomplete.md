---
meta:
  title: Autocomplete
  description: Autocompletes displays suggestions as you type.
layout: component
---

```html:preview
<sl-autocomplete  class="language-autocomplete">
  <sl-input slot="trigger" class="language-input" size='medium' label='Autofilter' placeholder='Choose an option'>
  </sl-input>
  <sl-menu-item value="english">English</sl-menu-item>
  <sl-menu-item value="mandarin">Mandarin</sl-menu-item>
  <sl-menu-item value="hindi">Hindi</sl-menu-item>
  <sl-menu-item value="spanish">Spanish</sl-menu-item>
  <sl-menu-item value="french">French</sl-menu-item>
</sl-autocomplete>

<script>
  const autocomplete = document.querySelector('.language-autocomplete');
  const input = document.querySelector('.language-input');

  autocomplete.addEventListener('sl-select', event => {
    input.value = event.detail.item.textContent;
    console.log(input.value)
  });
</script>
```

```jsx:react
export class Component implements ComponentInterface {
  @State() selectedValue: string = '';

  private autocompleteRef!: HTMLElement;

  private options = [
    { value: 'english', label: 'English' },
    { value: 'mandarin', label: 'Mandarin' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
  ];

  private handleLanguageChange = () => {
    this.autocompleteRef.addEventListener('sl-select', (event: CustomEvent) => {
      this.selectedValue = event.detail.item.value;
    });
  };

  render(): any {
    return (
      <Host>
        <sl-autocomplete ref={(el: HTMLElement) => (this.autocompleteRef = el)}>
          <sl-input
            on-sl-change={() => this.handleLanguageChange()}
            slot="trigger"
            size="medium"
            label="Autofilter"
            placeholder="Choose an option"
            value={this.selectedValue}
          ></sl-input>
          {this.options.map(option => (
            <sl-menu-item value={option.value}>{option.label}</sl-menu-item>
          ))}
        </sl-autocomplete>
      </Host>
    );
  }
}

```

## Examples

### Async

```html:preview
<sl-autocomplete class="async-autocomplete">
  <sl-input slot="trigger" class="async-input" label='Async autofilter'></sl-input>
</sl-autocomplete>

<script>
  const autocomplete = document.querySelector('.async-autocomplete');
  const input = document.querySelector('.async-input');

  input.addEventListener('sl-input', event => {
    autocomplete.loading = true;

    setTimeout(() => {
      const menuItemTags = ['English', 'Mandarin', 'Spanish',"French", "Italian", "German", "Arabic",
  "Portuguese", "Russian", "Japanese", "Korean", "Hindi", "Turkish", "Vietnamese",
  "Greek", "Dutch", "Swedish", "Norwegian", "Danish", "Finnish", "Hebrew",
  "Polish", "Czech", "Hungarian", "Thai", "Bengali", "Persian", "Swahili",
  "Zulu", "Xhosa", "Malay", "Filipino", "Tamil", "Urdu", "Punjabi", "Gujarati",
  "Telugu", "Marathi", "Sinhala", "Burmese", "Lao", "Khmer", "Serbian", "Croatian",
  "Slovak", "Slovenian", "Romanian", "Bulgarian", "Albanian", "Icelandic" ]
        .filter(option => new RegExp(event.target.value, 'ig').test(option))
        .map(option => `<sl-menu-item value="${option}">${option}</sl-menu-item>`)
        .join('');

      autocomplete.querySelectorAll('sl-menu-item').forEach(el => el.remove());
      autocomplete.insertAdjacentHTML('beforeend', menuItemTags);
      autocomplete.loading = false;
    }, 1000);
  });

  autocomplete.addEventListener('sl-select', event => {
    input.value = event.detail.item.textContent;
  });
</script>
```

```jsx react
// WIP...
```

### Loading State

```html:preview
<sl-autocomplete class="loading-autocomplete">
  <sl-input slot="trigger" class="loading-input" label="Loading state"></sl-input>

  <div slot="loading-text" style="margin: 1rem;">
    <sl-skeleton effect="pulse"></sl-skeleton>
    <sl-skeleton effect="pulse"></sl-skeleton>
    <sl-skeleton effect="pulse"></sl-skeleton>
  </div>
</sl-autocomplete>

<script>
  const autocomplete = document.querySelector('.loading-autocomplete');
  const input = document.querySelector('.loading-input');

  let loadingTimeout;

  input.addEventListener('sl-input', event => {
    const value = event.target.value.trim();

    if (value && !input.querySelector('sl-spinner')) {
      const spinner = document.createElement('sl-spinner');
      spinner.slot = 'suffix';
      input.appendChild(spinner);
    }
    if (value) {
      autocomplete.loading = true;

      clearTimeout(loadingTimeout);

      loadingTimeout = setTimeout(() => {
        const options = ['English', 'Mandarin', 'Spanish']
        .filter(option => new RegExp(event.target.value, 'ig').test(option))
        .map(option => `<sl-menu-item value="${option}">${option}</sl-menu-item>`)
        .join('');

        autocomplete.querySelectorAll('sl-menu-item').forEach(el => el.remove());
        autocomplete.insertAdjacentHTML('beforeend', options);

        autocomplete.loading = false;
        const spinner = input.querySelector('sl-spinner');
        if (spinner) spinner.remove();
      }, 1000);
    } else {
      const spinner = input.querySelector('sl-spinner');
      if (spinner) spinner.remove();
    }
  });

  autocomplete.addEventListener('sl-select', event => {
    input.value = event.detail.item.textContent;

    const spinner = input.querySelector('sl-spinner');
    if (spinner) spinner.remove();
  });
</script>

<style>
  sl-autocomplete sl-skeleton:not(:first-child) {
    margin-top: 1rem;
  }
</style>
```

### Empty State

```html:preview
<sl-autocomplete >
  <sl-input slot="trigger" label='Empty state'></sl-input>

  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>

  <div slot="empty-text" style="text-align: center; margin: var(--sl-spacing-small); color: var(--sl-color-neutral-500);">
    We could not find any matches. Please try again.
  </div>
</sl-autocomplete>
```
