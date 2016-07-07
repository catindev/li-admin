const shortDate = dateString => {
  let dateArray = dateString.split( '.' );
  return `${ dateArray[ 0 ] }.${ dateArray[ 1 ] }`
};

const getPreviousWeek = () => {
  let beforeOneWeek = new Date( new Date().getTime() - 60 * 60 * 24 * 7 * 1000 )
    , day = beforeOneWeek.getDay()
    , diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
    , start = new Date( beforeOneWeek.setDate( diffToMonday ) ).toLocaleDateString()
    , end = new Date( beforeOneWeek.setDate( diffToMonday + 6 ) ).toLocaleDateString()
    ;
  return { start, end };
};

export default { shortDate, getPreviousWeek }
