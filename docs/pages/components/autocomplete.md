---
meta:
  title: Autocomplete
  description: Autocompletes displays suggestions as you type.
layout: component
---

```html:preview

<sl-autocomplete class="language-autocomplete" label="test" placeholder="Choose an option" clearable multiSelect>
</sl-autocomplete>
</sl-autocomplete>

<script>
  const autocomplete = document.querySelector('.language-autocomplete');

  autocomplete.options = [

    { value: 'english', label: 'English' },
    { value: 'mandarin', label: 'Mandarin' },
    { value: 'hindi', label: 'Hindi' },
    // { value: 'spanish', label: 'Spanish' },
    // { value: 'french', label: 'French' },
    // { value: 'german', label: 'German' },
    // { value: 'italian', label: 'Italian' },
    // { value: 'japanese', label: 'Japanese' },
    // { value: 'korean', label: 'Korean' },
    // { value: 'russian', label: 'Russian' },
    // { value: 'portuguese', label: 'Portuguese' },
    // { value: 'arabic', label: 'Arabic' }

  ];

  autocomplete.addEventListener('sl-select', event => {
    console.log(event.target.value);
  });
</script>
```
