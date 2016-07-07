import datepicker from "./datepicker";

const bindings = { start: '<', end: '<', onChange: '&' };

const template = `
  <div>
      <legend>Период</legend>
      <fieldset>
          <ss-datepicker label="Начало"
                         type="start"
                         date="$ctrl.start"
                         error="$ctrl.error.start"
                         on-change="$ctrl.change($event)">
          </ss-datepicker>

          <ss-datepicker label="Конец"
                         type="end"
                         date="$ctrl.end"
                         error="$ctrl.error.end"
                         on-change="$ctrl.change($event)">
          </ss-datepicker>
      </fieldset>
  </div>
`;

/* Helpers */
const toTimestamp = dateStr => new Date( (dateStr.split('.')).reverse() ).getTime();

const isValidPeriod = ( start, end ) => toTimestamp( start ) <= toTimestamp( end );

const errors = {
  start: 'Дата начала периода должна быть раньше даты окончания',
  end: 'Дата конца периода должна быть позже даты начала'
}

class controller {
  
  $onChanges( changes ) {
    changes.start && (this.start = angular.copy( this.start ));
    changes.end && (this.end =  angular.copy( this.end ));
  }
  
  validate( type, value ) {
    this.error = {};
    
    const start = ( type === 'start' ) ? value : this.start;
    const end = ( type === 'end' ) ? value : this.end;
    
    if ( !isValidPeriod( start, end ) ) {
      (type === 'start') ?
        this.error.start = errors[type]
        :
        this.error.end = errors[type];
      return false;
    }
    
    return true;
  }
  
  change({ type, date }) {
    const $event = { type, date };
    this.validate( type, date ) && this.onChange( { $event } );
  }
}

export default angular
  .module('SS.period-form', [ datepicker ])
  .component('ssPeriodForm', { bindings, template, controller })
  .name;
