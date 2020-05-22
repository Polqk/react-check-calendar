# react-check-calendar

> Checkbox calendar for react

[![NPM](https://img.shields.io/npm/v/react-check-calendar.svg)](https://www.npmjs.com/package/react-check-calendar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<img src="https://polqk.github.io/react-check-calendar/images/exemple.jpg" alt="React Checkbox Calendar">


## Install

```bash
npm install --save react-check-calendar
```


## Documentation
See [Documentation](https://polqk.github.io/react-check-calendar/)

## Usage

```tsx
import React, { Component } from 'react'

import { CheckCalendar } from 'react-check-calendar'
import 'react-check-calendar/dist/index.css'

class Example extends Component {
  render() {
    return <CheckCalendar />
  }
}
```

## Properties

| Property name | type         | default        | description      |
|---------------|-----------------|-------------|------------------|
| `start`       | `Moment, Date, string` | `moment()` | start date |
| `startWeekDay`| `number`     | `1`            | first calendar column day, 1 = monday  |
| `locale`       | `string` | `en` | moment locale  |
| `max`       | `Moment, Date, string` |  | max calendar limit, disable next button after this date |
| `min`       | `Moment, Date, string` |  | min calendar limit, disable prev button before this date |
| `disableBefore`       | `Moment, Date, string` |  | disable checkboxes before this date |
| `disableAfter`       | `Moment, Date, string` |  | disable checkboxes after this date |
| `disabledDates`       | `[Moment, Date, string]` | `[]` | list of disabled checkboxes dates |
| `checkedDates`       | `[{ start: Date | Moment, end: Date | Moment }]` |  | list of checked checkboxes |
| `hoursIntervals`       | `[{ start: number, end: number }]` | `[{ start: 8, end: 10 }, { start: 10, end: 12 }, { start: 13, end: 15 }, { start: 15, end: 17 }]` | `list of rows, decimals will be converted 12.25 => 12:15 (12 + 0.25 * 60)` |
| `datesFormats`       | `{ fromHour?: string, toHour?: string }` | `{fromHour: '[from] [<strong>]h:mm[</strong>][<small>]a[</small>]', toHour: ' [to] [<strong>]h:mm[</strong>][<small>]a[</small>]' }` | intervals dates format, accepted by moment |
| `hideDays`       | `[number]` | `[0, 6]` | `hide colums, default [sunday, saturday]` |
| `onChange`       | `({ moments: [{ start: Moment, end: Moment}] , dates: [[ start: Date, end: Date}] }) => void` |  | callback on checkbox click, with list of checked dates |
| `onNextClick`       | `() => void` |  | next button click callback, after calendar appear |
| `onPreviousClick`       | `() => void` | `moment()` (`Date`) | start date |
| `leftButton`       | `{ content?: ReactNode, className?: string }` | `{ content: <LeftIcon /> }` | prev button props |
| `rightButton`       | `{ content?: ReactNode, className?: string }` | `{ content: <RightIcon /> }` | next button props |
| `containerClassName`       | `string` | `` | container additional class |
| `tableClassName`       | `string` | `` | 	table additional class |
| `headerClassName`       | `string` | `` | table header additional class |
| `contentClassName`       | `string` | `` | table content additional class |
| `headerRowClassName`       | `string` | `` | row interval additional class |
| `renderColumnHeader`       | `(date: Moment) => ReactElement` |  | callback to render column header |
| `renderRowHeader`       | `	(date: Moment) => ReactElement` |  | callback to render intervals |



## License

MIT © [Polqk](https://github.com/Polqk)
