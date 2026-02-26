# Interface: HTMLAttributes\<T\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2785

## Extends

- `AriaAttributes`.`DOMAttributes`\<`T`\>

## Extended by

- [`InputHTMLAttributes`](InputHTMLAttributes.md)
- [`ButtonHTMLAttributes`](ButtonHTMLAttributes.md)

## Type Parameters

### T

`T`

## Properties

### about?

> `optional` **about**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2820

***

### accessKey?

> `optional` **accessKey**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2793

***

### aria-activedescendant?

> `optional` **aria-activedescendant**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2491

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`AriaAttributes.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2493

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`AriaAttributes.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete**: `"none"` \| `"both"` \| `"inline"` \| `"list"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2498

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`AriaAttributes.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2504

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`AriaAttributes.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2509

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`AriaAttributes.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2510

#### Inherited from

`AriaAttributes.aria-busy`

***

### aria-checked?

> `optional` **aria-checked**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2515

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`AriaAttributes.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2520

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`AriaAttributes.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2525

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`AriaAttributes.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2530

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`AriaAttributes.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2535

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`AriaAttributes.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2540

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`AriaAttributes.aria-controls`

***

### aria-current?

> `optional` **aria-current**: `boolean` \| `"true"` \| `"false"` \| `"page"` \| `"step"` \| `"date"` \| `"time"` \| `"location"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2542

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`AriaAttributes.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2547

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`AriaAttributes.aria-describedby`

***

### aria-description?

> `optional` **aria-description**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2552

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`AriaAttributes.aria-description`

***

### aria-details?

> `optional` **aria-details**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2557

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`AriaAttributes.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2562

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`AriaAttributes.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect**: `"link"` \| `"none"` \| `"copy"` \| `"move"` \| `"execute"` \| `"popup"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2567

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`AriaAttributes.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2572

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`AriaAttributes.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2574

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`AriaAttributes.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2579

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`AriaAttributes.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2584

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`AriaAttributes.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup**: `boolean` \| `"true"` \| `"false"` \| `"listbox"` \| `"grid"` \| `"menu"` \| `"dialog"` \| `"tree"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2586

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`AriaAttributes.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2591

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`AriaAttributes.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2596

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`AriaAttributes.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2598

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`AriaAttributes.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2603

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`AriaAttributes.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2608

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`AriaAttributes.aria-labelledby`

***

### aria-level?

> `optional` **aria-level**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2610

Defines the hierarchical level of an element within a structure.

#### Inherited from

`AriaAttributes.aria-level`

***

### aria-live?

> `optional` **aria-live**: `"off"` \| `"assertive"` \| `"polite"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2612

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`AriaAttributes.aria-live`

***

### aria-modal?

> `optional` **aria-modal**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2614

Indicates whether an element is modal when displayed.

#### Inherited from

`AriaAttributes.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2616

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`AriaAttributes.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2618

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`AriaAttributes.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation**: `"horizontal"` \| `"vertical"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2620

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`AriaAttributes.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2626

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`AriaAttributes.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2631

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`AriaAttributes.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2636

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`AriaAttributes.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2641

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`AriaAttributes.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2646

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`AriaAttributes.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant**: `"all"` \| `"text"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2651

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`AriaAttributes.aria-relevant`

***

### aria-required?

> `optional` **aria-required**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2664

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`AriaAttributes.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2666

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`AriaAttributes.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2671

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`AriaAttributes.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2676

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`AriaAttributes.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2681

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`AriaAttributes.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2686

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`AriaAttributes.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2691

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`AriaAttributes.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2696

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`AriaAttributes.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2698

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`AriaAttributes.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2700

Defines the maximum allowed value for a range widget.

#### Inherited from

`AriaAttributes.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2702

Defines the minimum allowed value for a range widget.

#### Inherited from

`AriaAttributes.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2707

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`AriaAttributes.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2709

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`AriaAttributes.aria-valuetext`

***

### autoCapitalize?

> `optional` **autoCapitalize**: `string` & `object` \| `"none"` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2794

***

### autoCorrect?

> `optional` **autoCorrect**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2833

***

### autoFocus?

> `optional` **autoFocus**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2795

***

### autoSave?

> `optional` **autoSave**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2834

***

### children?

> `optional` **children**: [`ReactNode`](../type-aliases/ReactNode.md)

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2267

#### Inherited from

`DOMAttributes.children`

***

### className?

> `optional` **className**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2796

***

### color?

> `optional` **color**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2835

***

### content?

> `optional` **content**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2821

***

### contentEditable?

> `optional` **contentEditable**: `"inherit"` \| `Booleanish` \| `"plaintext-only"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2797

***

### contextMenu?

> `optional` **contextMenu**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2798

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML**: `object`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2268

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`DOMAttributes.dangerouslySetInnerHTML`

***

### datatype?

> `optional` **datatype**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2822

***

### defaultChecked?

> `optional` **defaultChecked**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2787

***

### defaultValue?

> `optional` **defaultValue**: `string` \| `number` \| readonly `string`[]

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2788

***

### dir?

> `optional` **dir**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2799

***

### draggable?

> `optional` **draggable**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2800

***

### enterKeyHint?

> `optional` **enterKeyHint**: `"search"` \| `"next"` \| `"enter"` \| `"done"` \| `"go"` \| `"previous"` \| `"send"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2801

***

### exportparts?

> `optional` **exportparts**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2868

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

***

### hidden?

> `optional` **hidden**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2802

***

### id?

> `optional` **id**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2803

***

### inert?

> `optional` **inert**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2854

#### See

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert)

***

### inlist?

> `optional` **inlist**: `any`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2823

***

### inputMode?

> `optional` **inputMode**: `"search"` \| `"none"` \| `"text"` \| `"tel"` \| `"url"` \| `"email"` \| `"numeric"` \| `"decimal"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2859

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

***

### is?

> `optional` **is**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2864

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

***

### itemID?

> `optional` **itemID**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2839

***

### itemProp?

> `optional` **itemProp**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2836

***

### itemRef?

> `optional` **itemRef**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2840

***

### itemScope?

> `optional` **itemScope**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2837

***

### itemType?

> `optional` **itemType**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2838

***

### lang?

> `optional` **lang**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2804

***

### nonce?

> `optional` **nonce**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2805

***

### onAbort?

> `optional` **onAbort**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2327

#### Inherited from

`DOMAttributes.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2328

#### Inherited from

`DOMAttributes.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd**: `AnimationEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2457

#### Inherited from

`DOMAttributes.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture**: `AnimationEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2458

#### Inherited from

`DOMAttributes.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration**: `AnimationEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2459

#### Inherited from

`DOMAttributes.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture**: `AnimationEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2460

#### Inherited from

`DOMAttributes.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart**: `AnimationEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2455

#### Inherited from

`DOMAttributes.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture**: `AnimationEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2456

#### Inherited from

`DOMAttributes.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2373

#### Inherited from

`DOMAttributes.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2374

#### Inherited from

`DOMAttributes.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput**: `InputEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2299

#### Inherited from

`DOMAttributes.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture**: `InputEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2300

#### Inherited from

`DOMAttributes.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle**: `ToggleEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2464

#### Inherited from

`DOMAttributes.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2293

#### Inherited from

`DOMAttributes.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture**: `FocusEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2294

#### Inherited from

`DOMAttributes.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2329

#### Inherited from

`DOMAttributes.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2330

#### Inherited from

`DOMAttributes.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2331

#### Inherited from

`DOMAttributes.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2332

#### Inherited from

`DOMAttributes.onCanPlayThroughCapture`

***

### onChange?

> `optional` **onChange**: `ChangeEventHandler`\<`T`, `Element`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2297

#### Inherited from

`DOMAttributes.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture**: `ChangeEventHandler`\<`T`, `Element`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2298

#### Inherited from

`DOMAttributes.onChangeCapture`

***

### onClick?

> `optional` **onClick**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2375

#### Inherited from

`DOMAttributes.onClick`

***

### onClickCapture?

> `optional` **onClickCapture**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2376

#### Inherited from

`DOMAttributes.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd**: `CompositionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2283

#### Inherited from

`DOMAttributes.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture**: `CompositionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2284

#### Inherited from

`DOMAttributes.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart**: `CompositionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2285

#### Inherited from

`DOMAttributes.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture**: `CompositionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2286

#### Inherited from

`DOMAttributes.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate**: `CompositionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2287

#### Inherited from

`DOMAttributes.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture**: `CompositionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2288

#### Inherited from

`DOMAttributes.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2377

#### Inherited from

`DOMAttributes.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2378

#### Inherited from

`DOMAttributes.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy**: `ClipboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2275

#### Inherited from

`DOMAttributes.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture**: `ClipboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2276

#### Inherited from

`DOMAttributes.onCopyCapture`

***

### onCut?

> `optional` **onCut**: `ClipboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2277

#### Inherited from

`DOMAttributes.onCut`

***

### onCutCapture?

> `optional` **onCutCapture**: `ClipboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2278

#### Inherited from

`DOMAttributes.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2379

#### Inherited from

`DOMAttributes.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2380

#### Inherited from

`DOMAttributes.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2381

#### Inherited from

`DOMAttributes.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2382

#### Inherited from

`DOMAttributes.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2383

#### Inherited from

`DOMAttributes.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2384

#### Inherited from

`DOMAttributes.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2385

#### Inherited from

`DOMAttributes.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2386

#### Inherited from

`DOMAttributes.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2387

#### Inherited from

`DOMAttributes.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2388

#### Inherited from

`DOMAttributes.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2389

#### Inherited from

`DOMAttributes.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2390

#### Inherited from

`DOMAttributes.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2391

#### Inherited from

`DOMAttributes.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2392

#### Inherited from

`DOMAttributes.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2393

#### Inherited from

`DOMAttributes.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2394

#### Inherited from

`DOMAttributes.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2395

#### Inherited from

`DOMAttributes.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture**: `DragEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2396

#### Inherited from

`DOMAttributes.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2333

#### Inherited from

`DOMAttributes.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2334

#### Inherited from

`DOMAttributes.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2335

#### Inherited from

`DOMAttributes.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2336

#### Inherited from

`DOMAttributes.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2337

#### Inherited from

`DOMAttributes.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2338

#### Inherited from

`DOMAttributes.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2339

#### Inherited from

`DOMAttributes.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2340

#### Inherited from

`DOMAttributes.onEndedCapture`

***

### onError?

> `optional` **onError**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2313

#### Inherited from

`DOMAttributes.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2314

#### Inherited from

`DOMAttributes.onErrorCapture`

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2291

#### Inherited from

`DOMAttributes.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture**: `FocusEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2292

#### Inherited from

`DOMAttributes.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2439

#### Inherited from

`DOMAttributes.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2440

#### Inherited from

`DOMAttributes.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput**: `InputEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2301

#### Inherited from

`DOMAttributes.onInput`

***

### onInputCapture?

> `optional` **onInputCapture**: `InputEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2302

#### Inherited from

`DOMAttributes.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2307

#### Inherited from

`DOMAttributes.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2308

#### Inherited from

`DOMAttributes.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2317

#### Inherited from

`DOMAttributes.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture**: `KeyboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2318

#### Inherited from

`DOMAttributes.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress**: `KeyboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2320

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`DOMAttributes.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture**: `KeyboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2322

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`DOMAttributes.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp**: `KeyboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2323

#### Inherited from

`DOMAttributes.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture**: `KeyboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2324

#### Inherited from

`DOMAttributes.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2311

#### Inherited from

`DOMAttributes.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2312

#### Inherited from

`DOMAttributes.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2341

#### Inherited from

`DOMAttributes.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2342

#### Inherited from

`DOMAttributes.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2343

#### Inherited from

`DOMAttributes.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2344

#### Inherited from

`DOMAttributes.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2345

#### Inherited from

`DOMAttributes.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2346

#### Inherited from

`DOMAttributes.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2441

#### Inherited from

`DOMAttributes.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2442

#### Inherited from

`DOMAttributes.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2397

#### Inherited from

`DOMAttributes.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2398

#### Inherited from

`DOMAttributes.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2399

#### Inherited from

`DOMAttributes.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2400

#### Inherited from

`DOMAttributes.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2401

#### Inherited from

`DOMAttributes.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2402

#### Inherited from

`DOMAttributes.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2403

#### Inherited from

`DOMAttributes.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2404

#### Inherited from

`DOMAttributes.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2405

#### Inherited from

`DOMAttributes.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2406

#### Inherited from

`DOMAttributes.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2407

#### Inherited from

`DOMAttributes.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture**: `MouseEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2408

#### Inherited from

`DOMAttributes.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste**: `ClipboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2279

#### Inherited from

`DOMAttributes.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture**: `ClipboardEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2280

#### Inherited from

`DOMAttributes.onPasteCapture`

***

### onPause?

> `optional` **onPause**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2347

#### Inherited from

`DOMAttributes.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2348

#### Inherited from

`DOMAttributes.onPauseCapture`

***

### onPlay?

> `optional` **onPlay**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2349

#### Inherited from

`DOMAttributes.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2350

#### Inherited from

`DOMAttributes.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2351

#### Inherited from

`DOMAttributes.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2352

#### Inherited from

`DOMAttributes.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2431

#### Inherited from

`DOMAttributes.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2432

#### Inherited from

`DOMAttributes.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2425

#### Inherited from

`DOMAttributes.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2426

#### Inherited from

`DOMAttributes.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2433

#### Inherited from

`DOMAttributes.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2434

#### Inherited from

`DOMAttributes.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2427

#### Inherited from

`DOMAttributes.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2428

#### Inherited from

`DOMAttributes.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2437

#### Inherited from

`DOMAttributes.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2438

#### Inherited from

`DOMAttributes.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2435

#### Inherited from

`DOMAttributes.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2436

#### Inherited from

`DOMAttributes.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2429

#### Inherited from

`DOMAttributes.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture**: `PointerEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2430

#### Inherited from

`DOMAttributes.onPointerUpCapture`

***

### onProgress?

> `optional` **onProgress**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2353

#### Inherited from

`DOMAttributes.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2354

#### Inherited from

`DOMAttributes.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2355

#### Inherited from

`DOMAttributes.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2356

#### Inherited from

`DOMAttributes.onRateChangeCapture`

***

### onReset?

> `optional` **onReset**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2303

#### Inherited from

`DOMAttributes.onReset`

***

### onResetCapture?

> `optional` **onResetCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2304

#### Inherited from

`DOMAttributes.onResetCapture`

***

### onScroll?

> `optional` **onScroll**: `UIEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2445

#### Inherited from

`DOMAttributes.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture**: `UIEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2446

#### Inherited from

`DOMAttributes.onScrollCapture`

***

### onScrollEnd?

> `optional` **onScrollEnd**: `UIEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2447

#### Inherited from

`DOMAttributes.onScrollEnd`

***

### onScrollEndCapture?

> `optional` **onScrollEndCapture**: `UIEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2448

#### Inherited from

`DOMAttributes.onScrollEndCapture`

***

### onSeeked?

> `optional` **onSeeked**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2357

#### Inherited from

`DOMAttributes.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2358

#### Inherited from

`DOMAttributes.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2359

#### Inherited from

`DOMAttributes.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2360

#### Inherited from

`DOMAttributes.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2411

#### Inherited from

`DOMAttributes.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2412

#### Inherited from

`DOMAttributes.onSelectCapture`

***

### onStalled?

> `optional` **onStalled**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2361

#### Inherited from

`DOMAttributes.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2362

#### Inherited from

`DOMAttributes.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit**: `SubmitEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2305

#### Inherited from

`DOMAttributes.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture**: `SubmitEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2306

#### Inherited from

`DOMAttributes.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2363

#### Inherited from

`DOMAttributes.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2364

#### Inherited from

`DOMAttributes.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2365

#### Inherited from

`DOMAttributes.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2366

#### Inherited from

`DOMAttributes.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle**: `ToggleEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2463

#### Inherited from

`DOMAttributes.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel**: `TouchEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2415

#### Inherited from

`DOMAttributes.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture**: `TouchEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2416

#### Inherited from

`DOMAttributes.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd**: `TouchEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2417

#### Inherited from

`DOMAttributes.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture**: `TouchEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2418

#### Inherited from

`DOMAttributes.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove**: `TouchEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2419

#### Inherited from

`DOMAttributes.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture**: `TouchEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2420

#### Inherited from

`DOMAttributes.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart**: `TouchEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2421

#### Inherited from

`DOMAttributes.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture**: `TouchEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2422

#### Inherited from

`DOMAttributes.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel**: `TransitionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2467

#### Inherited from

`DOMAttributes.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture**: `TransitionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2468

#### Inherited from

`DOMAttributes.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd**: `TransitionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2469

#### Inherited from

`DOMAttributes.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture**: `TransitionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2470

#### Inherited from

`DOMAttributes.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun**: `TransitionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2471

#### Inherited from

`DOMAttributes.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture**: `TransitionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2472

#### Inherited from

`DOMAttributes.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart**: `TransitionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2473

#### Inherited from

`DOMAttributes.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture**: `TransitionEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2474

#### Inherited from

`DOMAttributes.onTransitionStartCapture`

***

### onVolumeChange?

> `optional` **onVolumeChange**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2367

#### Inherited from

`DOMAttributes.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2368

#### Inherited from

`DOMAttributes.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2369

#### Inherited from

`DOMAttributes.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture**: `ReactEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2370

#### Inherited from

`DOMAttributes.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2451

#### Inherited from

`DOMAttributes.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture**: `WheelEventHandler`\<`T`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2452

#### Inherited from

`DOMAttributes.onWheelCapture`

***

### part?

> `optional` **part**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2872

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

***

### popover?

> `optional` **popover**: `""` \| `"auto"` \| `"manual"` \| `"hint"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2846

***

### popoverTarget?

> `optional` **popoverTarget**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2848

***

### popoverTargetAction?

> `optional` **popoverTargetAction**: `"hide"` \| `"show"` \| `"toggle"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2847

***

### prefix?

> `optional` **prefix**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2824

***

### property?

> `optional` **property**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2825

***

### radioGroup?

> `optional` **radioGroup**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2814

***

### rel?

> `optional` **rel**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2826

***

### resource?

> `optional` **resource**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2827

***

### results?

> `optional` **results**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2841

***

### rev?

> `optional` **rev**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2828

***

### role?

> `optional` **role**: `AriaRole`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2817

***

### security?

> `optional` **security**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2842

***

### slot?

> `optional` **slot**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2806

***

### spellCheck?

> `optional` **spellCheck**: `Booleanish`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2807

***

### style?

> `optional` **style**: [`CSSProperties`](CSSProperties.md)

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2808

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2789

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning**: `boolean`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2790

***

### tabIndex?

> `optional` **tabIndex**: `number`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2809

***

### title?

> `optional` **title**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2810

***

### translate?

> `optional` **translate**: `"yes"` \| `"no"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2811

***

### typeof?

> `optional` **typeof**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2829

***

### unselectable?

> `optional` **unselectable**: `"off"` \| `"on"`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2843

***

### vocab?

> `optional` **vocab**: `string`

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:2830
