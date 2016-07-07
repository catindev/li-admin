import appState from "common/state";
import dates from "./dates";


const form = appState.select([ 'forms', 'searchSMS', 'period' ]);


class searchSMSPeriodActions {

  setDefaults() {
    const selected = dates.getPreviousWeek();

    const startDay = dates.shortDate( selected.start )
        , endDay = dates.shortDate( selected.end )
        ;

    const types = [
      { id: "last_week", title: `Прошлая неделя (c ${ startDay } по ${ endDay })` },
      { id: "custom", title: "Выбрать" }
    ];

    const type = "last_week";

    form.set({ types, type, selected });
  }

  get types() { return form.get().types; }

  get type() { return form.get().type; }
  set type( value ) { form.set( 'type', value);  }

  getPeriod( type ) {
    return form.get().selected[ type ];
  }

  setPeriod( type, date ) {
    form.set( [ 'selected', type ], date);
  }

}

export default searchSMSPeriodActions;
