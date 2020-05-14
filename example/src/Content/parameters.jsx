import React from 'react';
import { Table } from 'antd'
import 'antd/dist/antd.css'

const cols = [
  { title: 'Parameter name', key: 'name', dataIndex: 'name', maxWidth: 150 },
  { title: 'Type', key: 'type', dataIndex: 'type' },
  { title: 'Default', key: 'default', dataIndex: 'default' },
  { title: 'Description', key: 'description', dataIndex: 'description' },
  /*{ title: 'Required', key: 'required', dataIndex: 'required',
    render: (required) => (
      <Checkbox checked={required} disabled={!required} />
    )},*/
]

const dateOrMoment = 'Date | Moment';
const dateMomentString = dateOrMoment + ' | string';
const data = [
  { name: 'start', required: false, type: dateMomentString, default: 'Date.now()', description: 'start date' },
  { name: 'startWeekDay', required: false, type: 'number', default: '1', description: 'first calendar column day, 1 = monday' },
  { name: 'locale', required: false, type: 'string', default: 'en', description: 'moment locale' },
  { name: 'max', required: false, type: dateMomentString, default: '', description: 'max calendar limit, disable next button after this date' },
  { name: 'min', required: false, type: dateMomentString, default: '', description: 'min calendar limit, disable prev button before this date' },
  { name: 'disableBefore', required: false, type: dateMomentString, default: '', description: 'disable checkboxes before this date' },
  { name: 'disableAfter', required: false, type: dateMomentString, default: '', description: 'disable checkboxes after this date' },
  { name: 'disabledDates', required: false, type: `[${dateMomentString}]`, default: '[]', description: 'list of disabled checkboxes dates' },
  {
    name: 'checkedDates',
    required: false,
    type: `
[{
    start: ${dateOrMoment},
    end: ${dateOrMoment}
}]
`,
    default: '',
    description: 'list of checked checkboxes'
  },
  {
    name: 'hoursIntervals',
    required: false,
    type: `
[{
    start: number,
    end: number
}]
`,
    default: (<div>
      <div>[{`{ start: 8, end: 10 },`}</div>
      <div>{`{ start: 10, end: 12 },`}</div>
      <div>{`{ start: 13, end: 15 },`}</div>
      <div>{`{ start: 15, end: 17 }`}]</div>
    </div>),
    description: <div>list of rows, decimals will be converted <br/> 12.25 => 12:15 (12 + 0.25 * 60)</div>
  },
  {
    name: 'datesFormats',
    required: false,
    type: '{ fromHour?: string, toHour?: string }',
    default: (<div>
      {'{'}<br />
      {`fromHour: '[from] [<strong>]h:mm[</strong>][<small>]a[</small>]'`},<br />
      {`toHour: ' [to] [<strong>]h:mm[</strong>][<small>]a[</small>]'`} <br />
    }
    </div>),
    description: 'intervals dates format, accepted by moment'
  },
  { name: 'hideDays', required: false, type: '[number]', default: '[0, 6]', description: 'hide colums, default [sunday, saturday]' },
  { name: 'onChange', required: false, type: `({ moments: [{ start: Moment, end: Moment}] , dates: [[ start: Date, end: Date}] }) => void`, default: '', description: 'callback on checkbox click, with list of checked dates' },
  { name: 'onNextClick', required: false, type: '() => void', default: '', description: 'next button click callback, after calendar appear' },
  { name: 'onPreviousClick', required: false, type: '() => void', default: 'en', description: 'prev button click callbakc, after calendar appear' },
  { name: 'leftButton', required: false, type: '{ content?: ReactNode, className?: string }', default: '{ content: < }', description: 'prev button props' },
  { name: 'leftButton', required: false, type: '{ content?: ReactNode, className?: string }', default: '{ content: > }', description: 'next button props' },
  { name: 'containerClassName', required: false, type: 'string', default: '', description: 'container additional class' },
  { name: 'tableClassName', required: false, type: 'string', default: '', description: 'table additional class' },
  { name: 'headerClassName', required: false, type: 'string', default: '', description: 'table header additional class' },
  { name: 'contentClassName', required: false, type: 'string', default: '', description: 'table content additional class' },
  { name: 'headerRowClassName', required: false, type: 'string', default: '', description: 'row interval additional class' },
  { name: 'renderColumnHeader', required: false, type: '(date: Moment) => ReactElement', default: '', description: 'callback to render column header' },
  { name: 'renderRowHeader', required: false, type: '(date: Moment) => ReactElement', default: '', description: 'callback to render intervals' },
]

const Parameters = () => (
  <section id="parameters">
    <h2>Parameters</h2>
    <Table dataSource={data} columns={cols} pagination={false} />
  </section>
);

export default Parameters;
