import { classMap } from 'lit/directives/class-map.js';
import { defaultValue } from '../../internal/default-value.js';
import { eventOptions, property, query, state } from 'lit/decorators.js';
import { FormControlController } from '../../internal/form.js';
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { LocalizeController } from '../../utilities/localize.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './range.styles.js';
import type { CSSResultGroup } from 'lit';
import type { ShoelaceFormControl } from '../../internal/shoelace-element.js';

/**
 * @summary Ranges allow the user to select a single value within a given range using a slider, or a range of values using dual handles.
 * @documentation https://shoelace.style/components/range
 * @status stable
 * @since 2.0
 *
 * @slot label - The range's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The range's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input - The internal `<input>` element.
 * @csspart input-min - The minimum value input element (dual mode only).
 * @csspart input-max - The maximum value input element (dual mode only).
 * @csspart tooltip - The range's tooltip.
 * @csspart tooltip-min - The minimum value tooltip (dual mode only).
 * @csspart tooltip-max - The maximum value tooltip (dual mode only).
 * @csspart inputs - The wrapper for numeric input fields (dual mode only).
 *
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --tooltip-offset - The vertical distance the tooltip is offset from the track.
 * @cssproperty --track-color-active - The color of the portion of the track that represents the current value.
 * @cssproperty --track-color-inactive - The of the portion of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 * @cssproperty --track-active-offset - The point of origin of the active track.
 */
export default class SlRange extends ShoelaceElement implements ShoelaceFormControl {
  static styles: CSSResultGroup = [componentStyles, formControlStyles, styles];

  private readonly formControlController = new FormControlController(this, {
    assumeInteractionOn: ['sl-input'],
    value: (control: SlRange) => {
      // Return the value in the correct format for form submission
      if (control.isDualMode() && Array.isArray(control.value)) {
        return JSON.stringify(control.value);
      }
      return control.value;
    }
  });
  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');
  private readonly localize = new LocalizeController(this);
  private resizeObserver: ResizeObserver;

  @query('.range__control') input: HTMLInputElement;
  @query('.range__control--min') inputMin: HTMLInputElement;
  @query('.range__control--max') inputMax: HTMLInputElement;
  @query('.range__tooltip') output: HTMLOutputElement | null;
  @query('.range__tooltip--min') outputMin: HTMLOutputElement | null;
  @query('.range__tooltip--max') outputMax: HTMLOutputElement | null;

  @state() private hasFocus = false;
  @state() private hasTooltip = false;
  @state() private hasTooltipMin = false;
  @state() private hasTooltipMax = false;
  @property() title = ''; // make reactive to pass through

  /** The name of the range, submitted as a name/value pair with form data. */
  @property() name = '';

  /** The current value of the range, submitted as a name/value pair with form data. In dual mode, this should be an array [min, max]. */
  @property({ type: Object }) value: number | [number, number] = 0;

  /** Enables dual-handle mode for selecting a range of values. When true and value is an array, displays two handles. */
  @property({ type: Boolean }) range = false;

  /** Shows numeric input fields in dual-handle mode for direct value entry. */
  @property({ type: Boolean, attribute: 'show-inputs' }) showInputs = false;

  /** The color of the handles and active track. Accepts any valid CSS color value. */
  @property() color = '';

  /** The range's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The range's help text. If you need to display HTML, use the help-text slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** Disables the range. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The minimum acceptable value of the range. */
  @property({ type: Number }) min = 0;

  /** The maximum acceptable value of the range. */
  @property({ type: Number }) max = 100;

  /** The interval at which the range will increase and decrease. */
  @property({ type: Number }) step = 1;

  /** The preferred placement of the range's tooltip. */
  @property() tooltip: 'top' | 'bottom' | 'none' = 'top';

  /**
   * A function used to format the tooltip's value. The range's value is passed as the first and only argument. The
   * function should return a string to display in the tooltip.
   */
  @property({ attribute: false }) tooltipFormatter: (value: number) => string = (value: number) => value.toString();

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue: number | [number, number] = 0;

  /** Gets the validity state object */
  get validity() {
    if (this.isDualMode()) {
      // In dual mode, both inputs must be valid
      return this.inputMin?.validity || this.inputMax?.validity;
    }
    return this.input?.validity;
  }

  /** Gets the validation message */
  get validationMessage() {
    if (this.isDualMode()) {
      return this.inputMin?.validationMessage || this.inputMax?.validationMessage || '';
    }
    return this.input?.validationMessage || '';
  }

  /** Returns true if the component is in dual-handle mode */
  private isDualMode(): boolean {
    return this.range && Array.isArray(this.value) && this.value.length === 2;
  }

  /** Gets the minimum value in dual mode or the single value in single mode */
  private getMinValue(): number {
    if (Array.isArray(this.value)) {
      return this.value[0];
    }
    return typeof this.value === 'number' ? this.value : 0;
  }

  /** Gets the maximum value in dual mode or the single value in single mode */
  private getMaxValue(): number {
    if (Array.isArray(this.value)) {
      return this.value[1];
    }
    return typeof this.value === 'number' ? this.value : 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.syncRange());

    // Normalize value based on mode
    if (this.isDualMode()) {
      const minVal = Math.max(this.getMinValue(), this.min);
      const maxVal = Math.min(this.getMaxValue(), this.max);
      this.value = [minVal, maxVal];
    } else {
      const val = typeof this.value === 'number' ? this.value : 0;
      if (val < this.min) {
        this.value = this.min;
      }
      if (val > this.max) {
        this.value = this.max;
      }
    }

    this.updateComplete.then(() => {
      this.syncRange();
      if (this.isDualMode()) {
        if (this.inputMin) this.resizeObserver.observe(this.inputMin);
        if (this.inputMax) this.resizeObserver.observe(this.inputMax);
      } else {
        if (this.input) this.resizeObserver.observe(this.input);
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.isDualMode()) {
      this.resizeObserver?.unobserve(this.inputMin);
      this.resizeObserver?.unobserve(this.inputMax);
    } else {
      this.resizeObserver?.unobserve(this.input);
    }
  }

  private handleChange() {
    this.emit('sl-change');
  }

  private handleInput() {
    if (this.isDualMode()) {
      // This shouldn't be called in dual mode, but handle it anyway
      return;
    }
    this.value = parseFloat(this.input.value);
    this.emit('sl-input');
    this.syncRange();
  }

  private handleInputMin() {
    if (!this.isDualMode()) return;
    const minVal = parseFloat(this.inputMin.value);
    const maxVal = this.getMaxValue();
    this.value = [Math.min(minVal, maxVal), maxVal];
    this.emit('sl-input');
    this.syncRange();
  }

  private handleInputMax() {
    if (!this.isDualMode()) return;
    const minVal = this.getMinValue();
    const maxVal = parseFloat(this.inputMax.value);
    this.value = [minVal, Math.max(minVal, maxVal)];
    this.emit('sl-input');
    this.syncRange();
  }

  private handleBlur() {
    this.hasFocus = false;
    this.hasTooltip = false;
    this.hasTooltipMin = false;
    this.hasTooltipMax = false;
    this.emit('sl-blur');
  }

  private handleFocus() {
    this.hasFocus = true;
    this.hasTooltip = true;
    this.emit('sl-focus');
  }

  private handleFocusMin() {
    this.hasFocus = true;
    this.hasTooltipMin = true;
    this.emit('sl-focus');
  }

  private handleFocusMax() {
    this.hasFocus = true;
    this.hasTooltipMax = true;
    this.emit('sl-focus');
  }

  @eventOptions({ passive: true })
  private handleThumbDragStart() {
    this.hasTooltip = true;
  }

  @eventOptions({ passive: true })
  private handleThumbDragStartMin() {
    this.hasTooltipMin = true;
  }

  @eventOptions({ passive: true })
  private handleThumbDragStartMax() {
    this.hasTooltipMax = true;
  }

  private handleThumbDragEnd() {
    this.hasTooltip = false;
  }

  private handleThumbDragEndMin() {
    this.hasTooltipMin = false;
  }

  private handleThumbDragEndMax() {
    this.hasTooltipMax = false;
  }

  private handleNumericInputMin(e: Event) {
    const input = e.target as HTMLInputElement;
    const minVal = parseFloat(input.value);
    const maxVal = this.getMaxValue();
    if (!isNaN(minVal)) {
      this.value = [Math.min(Math.max(minVal, this.min), maxVal), maxVal];
      this.emit('sl-input');
      this.syncRange();
    }
  }

  private handleNumericInputMax(e: Event) {
    const input = e.target as HTMLInputElement;
    const maxVal = parseFloat(input.value);
    const minVal = this.getMinValue();
    if (!isNaN(maxVal)) {
      this.value = [minVal, Math.max(Math.min(maxVal, this.max), minVal)];
      this.emit('sl-input');
      this.syncRange();
    }
  }

  private syncProgress(percent: number) {
    if (this.input) {
      this.input.style.setProperty('--percent', `${percent * 100}%`);
    }
  }

  private syncProgressDual(minPercent: number, maxPercent: number) {
    if (this.inputMin) {
      this.inputMin.style.setProperty('--percent-min', `${minPercent * 100}%`);
      this.inputMin.style.setProperty('--percent-max', `${maxPercent * 100}%`);
    }
    if (this.inputMax) {
      this.inputMax.style.setProperty('--percent-min', `${minPercent * 100}%`);
      this.inputMax.style.setProperty('--percent-max', `${maxPercent * 100}%`);
    }
  }

  private syncTooltip(percent: number) {
    if (this.output !== null && this.input) {
      const inputWidth = this.input.offsetWidth;
      const tooltipWidth = this.output.offsetWidth;
      const thumbSize = getComputedStyle(this.input).getPropertyValue('--thumb-size');
      const isRtl = this.localize.dir() === 'rtl';
      const percentAsWidth = inputWidth * percent;

      // The calculations are used to "guess" where the thumb is located. Since we're using the native range control
      // under the hood, we don't have access to the thumb's true coordinates. These measurements can be a pixel or two
      // off depending on the size of the control, thumb, and tooltip dimensions.
      if (isRtl) {
        const x = `${inputWidth - percentAsWidth}px + ${percent} * ${thumbSize}`;
        this.output.style.translate = `calc((${x} - ${tooltipWidth / 2}px - ${thumbSize} / 2))`;
      } else {
        const x = `${percentAsWidth}px - ${percent} * ${thumbSize}`;
        this.output.style.translate = `calc(${x} - ${tooltipWidth / 2}px + ${thumbSize} / 2)`;
      }
    }
  }

  private syncTooltipDual(minPercent: number, maxPercent: number) {
    const inputWidth = this.inputMin?.offsetWidth || 0;
    const thumbSize = getComputedStyle(this.inputMin || document.documentElement).getPropertyValue('--thumb-size');
    const isRtl = this.localize.dir() === 'rtl';

    if (this.outputMin !== null) {
      const tooltipWidth = this.outputMin.offsetWidth;
      const percentAsWidth = inputWidth * minPercent;

      if (isRtl) {
        const x = `${inputWidth - percentAsWidth}px + ${minPercent} * ${thumbSize}`;
        this.outputMin.style.translate = `calc((${x} - ${tooltipWidth / 2}px - ${thumbSize} / 2))`;
      } else {
        const x = `${percentAsWidth}px - ${minPercent} * ${thumbSize}`;
        this.outputMin.style.translate = `calc(${x} - ${tooltipWidth / 2}px + ${thumbSize} / 2)`;
      }
    }

    if (this.outputMax !== null) {
      const tooltipWidth = this.outputMax.offsetWidth;
      const percentAsWidth = inputWidth * maxPercent;

      if (isRtl) {
        const x = `${inputWidth - percentAsWidth}px + ${maxPercent} * ${thumbSize}`;
        this.outputMax.style.translate = `calc((${x} - ${tooltipWidth / 2}px - ${thumbSize} / 2))`;
      } else {
        const x = `${percentAsWidth}px - ${maxPercent} * ${thumbSize}`;
        this.outputMax.style.translate = `calc(${x} - ${tooltipWidth / 2}px + ${thumbSize} / 2)`;
      }
    }
  }

  @watch('value', { waitUntilFirstUpdate: true })
  handleValueChange() {
    this.formControlController.updateValidity();

    if (this.isDualMode()) {
      // The value may have constraints, so we set the native control's value and sync it back to ensure it adheres to
      // min, max, and step properly
      const minVal = this.getMinValue();
      const maxVal = this.getMaxValue();

      if (this.inputMin) {
        this.inputMin.value = minVal.toString();
      }
      if (this.inputMax) {
        this.inputMax.value = maxVal.toString();
      }

      // Parse back to ensure constraints
      const parsedMin = this.inputMin ? parseFloat(this.inputMin.value) : minVal;
      const parsedMax = this.inputMax ? parseFloat(this.inputMax.value) : maxVal;
      this.value = [parsedMin, parsedMax];
    } else {
      const val = typeof this.value === 'number' ? this.value : 0;
      if (this.input) {
        this.input.value = val.toString();
        this.value = parseFloat(this.input.value);
      }
    }

    this.syncRange();
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid
    this.formControlController.setValidity(this.disabled);
  }

  @watch(['hasTooltip', 'hasTooltipMin', 'hasTooltipMax'], { waitUntilFirstUpdate: true })
  syncRange() {
    if (this.isDualMode()) {
      const minVal = this.getMinValue();
      const maxVal = this.getMaxValue();
      const minPercent = Math.max(0, (minVal - this.min) / (this.max - this.min));
      const maxPercent = Math.max(0, (maxVal - this.min) / (this.max - this.min));

      this.syncProgressDual(minPercent, maxPercent);

      if (this.tooltip !== 'none') {
        if (this.hasTooltipMin || this.hasTooltipMax) {
          // Ensure updates are drawn before we sync the tooltip
          this.updateComplete.then(() => this.syncTooltipDual(minPercent, maxPercent));
        }
      }
    } else {
      const val = typeof this.value === 'number' ? this.value : 0;
      const percent = Math.max(0, (val - this.min) / (this.max - this.min));

      this.syncProgress(percent);

      if (this.tooltip !== 'none' && this.hasTooltip) {
        // Ensure updates are drawn before we sync the tooltip
        this.updateComplete.then(() => this.syncTooltip(percent));
      }
    }
  }

  private handleInvalid(event: Event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }

  /** Sets focus on the range. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the range. */
  blur() {
    this.input.blur();
  }

  /** Increments the value of the range by the value of the step attribute. In dual mode, increments the max value. */
  stepUp() {
    if (this.isDualMode() && this.inputMax) {
      this.inputMax.stepUp();
      const minVal = this.getMinValue();
      const maxVal = Number(this.inputMax.value);
      if (!Array.isArray(this.value) || this.value[1] !== maxVal) {
        this.value = [minVal, maxVal];
      }
    } else if (this.input) {
      this.input.stepUp();
      if (this.value !== Number(this.input.value)) {
        this.value = Number(this.input.value);
      }
    }
  }

  /** Decrements the value of the range by the value of the step attribute. In dual mode, decrements the min value. */
  stepDown() {
    if (this.isDualMode() && this.inputMin) {
      this.inputMin.stepDown();
      const minVal = Number(this.inputMin.value);
      const maxVal = this.getMaxValue();
      if (!Array.isArray(this.value) || this.value[0] !== minVal) {
        this.value = [minVal, maxVal];
      }
    } else if (this.input) {
      this.input.stepDown();
      if (this.value !== Number(this.input.value)) {
        this.value = Number(this.input.value);
      }
    }
  }

  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    if (this.isDualMode()) {
      const minValid = this.inputMin?.checkValidity() ?? true;
      const maxValid = this.inputMax?.checkValidity() ?? true;
      return minValid && maxValid;
    }
    return this.input?.checkValidity() ?? true;
  }

  /** Gets the associated form, if one exists. */
  getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    if (this.isDualMode()) {
      const minValid = this.inputMin?.reportValidity() ?? true;
      const maxValid = this.inputMax?.reportValidity() ?? true;
      return minValid && maxValid;
    }
    return this.input?.reportValidity() ?? true;
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message: string) {
    if (this.isDualMode()) {
      this.inputMin?.setCustomValidity(message);
      this.inputMax?.setCustomValidity(message);
    } else {
      this.input?.setCustomValidity(message);
    }
    this.formControlController.updateValidity();
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const isDual = this.isDualMode();

    // Render single mode
    if (!isDual) {
      const val = typeof this.value === 'number' ? this.value : 0;
      // NOTE - always bind value after min/max, otherwise it will be clamped
      return html`
        <div
          part="form-control"
          class=${classMap({
            'form-control': true,
            'form-control--medium': true, // range only has one size
            'form-control--has-label': hasLabel,
            'form-control--has-help-text': hasHelpText
          })}
        >
          <label
            part="form-control-label"
            class="form-control__label"
            for="input"
            aria-hidden=${hasLabel ? 'false' : 'true'}
          >
            <slot name="label">${this.label}</slot>
          </label>

          <div part="form-control-input" class="form-control-input">
            <div
              part="base"
              class=${classMap({
                range: true,
                'range--disabled': this.disabled,
                'range--focused': this.hasFocus,
                'range--rtl': this.localize.dir() === 'rtl',
                'range--tooltip-visible': this.hasTooltip,
                'range--tooltip-top': this.tooltip === 'top',
                'range--tooltip-bottom': this.tooltip === 'bottom'
              })}
              style=${this.color ? `--track-color-active: ${this.color}; --thumb-color: ${this.color};` : ''}
              @mousedown=${this.handleThumbDragStart}
              @mouseup=${this.handleThumbDragEnd}
              @touchstart=${this.handleThumbDragStart}
              @touchend=${this.handleThumbDragEnd}
            >
              <input
                part="input"
                id="input"
                class="range__control"
                title=${this.title /* An empty title prevents browser validation tooltips from appearing on hover */}
                type="range"
                name=${ifDefined(this.name)}
                ?disabled=${this.disabled}
                min=${ifDefined(this.min)}
                max=${ifDefined(this.max)}
                step=${ifDefined(this.step)}
                .value=${live(val.toString())}
                aria-describedby="help-text"
                @change=${this.handleChange}
                @focus=${this.handleFocus}
                @input=${this.handleInput}
                @invalid=${this.handleInvalid}
                @blur=${this.handleBlur}
              />
              ${this.tooltip !== 'none' && !this.disabled
                ? html`
                    <output part="tooltip" class="range__tooltip">
                      ${typeof this.tooltipFormatter === 'function' ? this.tooltipFormatter(val) : val}
                    </output>
                  `
                : ''}
            </div>
          </div>

          <div
            part="form-control-help-text"
            id="help-text"
            class="form-control__help-text"
            aria-hidden=${hasHelpText ? 'false' : 'true'}
          >
            <slot name="help-text">${this.helpText}</slot>
          </div>
        </div>
      `;
    }

    // Render dual mode
    const minVal = this.getMinValue();
    const maxVal = this.getMaxValue();

    return html`
      <div
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--medium': true,
          'form-control--has-label': hasLabel,
          'form-control--has-help-text': hasHelpText
        })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input-min"
          aria-hidden=${hasLabel ? 'false' : 'true'}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${classMap({
              range: true,
              'range--dual': true,
              'range--has-inputs': this.showInputs,
              'range--disabled': this.disabled,
              'range--focused': this.hasFocus,
              'range--rtl': this.localize.dir() === 'rtl',
              'range--tooltip-visible': this.hasTooltipMin || this.hasTooltipMax,
              'range--tooltip-top': this.tooltip === 'top',
              'range--tooltip-bottom': this.tooltip === 'bottom'
            })}
            style=${this.color ? `--track-color-active: ${this.color}; --thumb-color: ${this.color};` : ''}
          >
            ${this.showInputs
              ? html`
                  <input
                    type="number"
                    part="input-number-min"
                    class="range__numeric-input range__numeric-input--min"
                    .value=${live(minVal.toString())}
                    min=${ifDefined(this.min)}
                    max=${ifDefined(this.max)}
                    step=${ifDefined(this.step)}
                    ?disabled=${this.disabled}
                    @input=${this.handleNumericInputMin}
                    aria-label="Minimum value input"
                  />
                `
              : ''}
            <div class="range__wrapper">
              <input
                part="input-min"
                id="input-min"
                class="range__control range__control--min"
                title=${this.title}
                type="range"
                ?disabled=${this.disabled}
                min=${ifDefined(this.min)}
                max=${ifDefined(this.max)}
                step=${ifDefined(this.step)}
                .value=${live(minVal.toString())}
                aria-describedby="help-text"
                aria-label="Minimum value"
                @change=${this.handleChange}
                @focus=${this.handleFocusMin}
                @input=${this.handleInputMin}
                @invalid=${this.handleInvalid}
                @blur=${this.handleBlur}
                @mousedown=${this.handleThumbDragStartMin}
                @mouseup=${this.handleThumbDragEndMin}
                @touchstart=${this.handleThumbDragStartMin}
                @touchend=${this.handleThumbDragEndMin}
              />
              <input
                part="input-max"
                id="input-max"
                class="range__control range__control--max"
                title=${this.title}
                type="range"
                ?disabled=${this.disabled}
                min=${ifDefined(this.min)}
                max=${ifDefined(this.max)}
                step=${ifDefined(this.step)}
                .value=${live(maxVal.toString())}
                aria-describedby="help-text"
                aria-label="Maximum value"
                @change=${this.handleChange}
                @focus=${this.handleFocusMax}
                @input=${this.handleInputMax}
                @invalid=${this.handleInvalid}
                @blur=${this.handleBlur}
                @mousedown=${this.handleThumbDragStartMax}
                @mouseup=${this.handleThumbDragEndMax}
                @touchstart=${this.handleThumbDragStartMax}
                @touchend=${this.handleThumbDragEndMax}
              />
              ${this.tooltip !== 'none' && !this.disabled
                ? html`
                    <output part="tooltip-min" class="range__tooltip range__tooltip--min">
                      ${typeof this.tooltipFormatter === 'function' ? this.tooltipFormatter(minVal) : minVal}
                    </output>
                    <output part="tooltip-max" class="range__tooltip range__tooltip--max">
                      ${typeof this.tooltipFormatter === 'function' ? this.tooltipFormatter(maxVal) : maxVal}
                    </output>
                  `
                : ''}
            </div>
            ${this.showInputs
              ? html`
                  <input
                    type="number"
                    part="input-number-max"
                    class="range__numeric-input range__numeric-input--max"
                    .value=${live(maxVal.toString())}
                    min=${ifDefined(this.min)}
                    max=${ifDefined(this.max)}
                    step=${ifDefined(this.step)}
                    ?disabled=${this.disabled}
                    @input=${this.handleNumericInputMax}
                    aria-label="Maximum value input"
                  />
                `
              : ''}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? 'false' : 'true'}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
}
