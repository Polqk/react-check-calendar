export var defaultProps = {
    startWeekDay: 1,
    checkedDates: [],
    disabledDates: [],
    locale: 'en',
    hoursIntervals: [
        { start: 8, end: 10 },
        { start: 10, end: 12 },
        { start: 13, end: 15 },
        { start: 15, end: 17 }
    ],
    hideDays: [0, 6]
};
export var defaultContext = {
    props: defaultProps
};
export var defaultDatesFormats = {
    fromHour: '[from] [<strong>]h:mm[</strong>][<small>]a[</small>]',
    toHour: ' [to] [<strong>]h:mm[</strong>][<small>]a[</small>]'
};
//# sourceMappingURL=defaults.js.map