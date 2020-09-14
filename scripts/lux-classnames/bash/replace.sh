#!/bin/bash

PROJECT_SRC='path/to/project/folder'
# Please make sure that you provide correct path to your project folder.
# Wrong path might affect other folders / projects

export LC_ALL=C

ARRAY=(
    # Grid
    "a-grid:lux-grid"
    "a-col:lux-col"

    # Activity
    "m-activity:lux-activity"

    # Avatar
    "a-avatar:lux-avatar"

    # Alert
    "m-alert:lux-alert"

    # Badge
    "a-badge:lux-badge"

    # Brand
    "a-brand:lux-brand"

    # Breadcrumb
    "a-breadcrumb:lux-breadcrumb"

    # Button
    "m-btnGroup:lux-button-group"
    "a-btn:lux-button"

    # Card
    "a-card:lux-card"

    # Checkbox
    "a-checkbox:lux-checkbox"

    # Date picker
    "m-datepicker:lux-datepicker"

    # Divider
    "a-divider:lux-divider"

    # Drawer
    "m-drawer:lux-drawer"

    # Dropdown
    "m-dropdown:lux-dropdown"
    
    # Expansion panel
    "m-epanel:lux-epanel"
    "-m-epanel:-lux-epanel"

    # Footer
    "o-footer:lux-footer"

    # Header
    "o-header:lux-header"

    # Icon
    "a-icon:lux-icon"

    # Input
    "a-input:lux-input"

    # Label
    "a-label:lux-label"

    # Modal
    "a-modal:lux-modal"

    # Pagination
    "a-pagination:lux-pagination"

    # Picker
    "m-pickerGroup:lux-picker-group"
    "m-picker:lux-picker"

    "a-picker__checkbox:lux-picker__checkbox"
    "a-picker__radio:lux-picker__radio"
    "a-picker__label:lux-picker__label"
    "a-picker__description:lux-picker__description"
    "a-picker:lux-picker__input"

    # Popover
    "m-popover:lux-popover"

    # Price
    "a-price:lux-price"

    # Radio
    "a-radio:lux-radio"

    # Range slider
    "a-rangeSlider:lux-range-slider"

    # Sidenav
    "m-sidenav:lux-sidenav"
    "a-sidenav:lux-sidenav"

    # Spinner
    "a-spinner:lux-spinner"

    # Steps
    "a-steps:lux-steps"

    # Table
    "a-table:lux-table"

    # Tabs
    "a-tabs:lux-tabs"

    # Toggle switch
    "a-switch:lux-switch"

    # Tooltip
    "a-tooltip:lux-tooltip"

    # Typography
    "a-h1:-text--h1"
    "a-h2:-text--h2"
    "a-h3:-text--h3"
    "a-h4:-text--h4"
    "a-h5:-text--h5"
    "a-h6:-text--h6"
    "-text--smaller:-text--xs"
    "-text-sm--smaller:-text-sm--xs"
    "-text-md--smaller:-text-md--xs"
    "-text-lg--smaller:-text-lg--xs"
    "-text-xl--smaller:-text-xl--xs"
    "-text--small:-text--sm"
    "-text-sm--small:-text-sm--sm"
    "-text-md--small:-text-md--sm"
    "-text-lg--small:-text-lg--sm"
    "-text-xl--small:-text-xl--sm"
    "-text--large:-text--lg"
    "-text-sm--large:-text-sm--lg"
    "-text-md--large:-text-md--lg"
    "-text-lg--large:-text-lg--lg"
    "-text-xl--large:-text-xl--lg"
    "-text--larger:-text--xl"
    "-text-sm--larger:-text-sm--xl"
    "-text-md--larger:-text-md--xl"
    "-text-lg--larger:-text-lg--xl"
    "-text-xl--larger:-text-xl--xl"
    "a-blockquote:lux-blockquote"
    "a-abbr:lux-abbr"
    "a-code:lux-code"
    "a-blockquote:lux-blockquote"
    "a-abbr:lux-abbr"
    "a-code:lux-code"

    # Backdrop
    "a-backdrop:lux-backdrop"
    "m-backdrop:lux-backdrop"

    "a-arrow:lux-arrow"
    "-bgInverse:-bg--inverse" # Docu only
    "m-input__wrapper:lux-input__wrapper"
    "m-inputNumber:lux-number-input -expanded"
    "m-form__item:lux-form__item"
    "m-label__wrapper:lux-label__wrapper"
    "m-avatarGroup:lux-avatar-group"
    "-noGutter:-no-gutter"
    "-borderless:-no-border"
    "-noBorder:-no-border"
    "-notFluid:-no-fluid"
    "-hasLabel:-label"
    "-floatingLabel:-floating-label"
    "-horizontalLabels:-horizontal-label"
    "-nostyle:-no-style"
    "-activeAlt:-active-alt"
    "-disableScroll:-disable-scroll"
    "-hasActive:-has-active"
    "a-sliding-border:lux-sliding-border"
    "m-example:lux-example"
    "a-collection__title:lux-collection__title" # Docu only
    "a-tab__description:lux-tab__description" # Docu only
)

for className in "${ARRAY[@]}" ; do
    REGEX='\([^a-zA-Z0-9]\)'"${className%%:*}"'\([^a-zA-Z0-9]\)'
    CHANGE="s/${REGEX}/\1${className##*:}\2/g"
    REGEXNL='\([^a-zA-Z0-9]\)'"${className%%:*}"'$'
    CHANGENL="s/${REGEXNL}/\1${className##*:}/g"

    find ${PROJECT_SRC} -type f -exec sed -i '' "${CHANGE};${CHANGENL}" '{}' +
    echo $'\e[1;31m' ${className%%:*} $'\e[1;32m' ${className##*:}
done

