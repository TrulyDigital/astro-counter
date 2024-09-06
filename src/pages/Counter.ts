/**
 * 
 * @description
 * 
 * state
 * 
 */
type CounterStateType = {
  counter: number;
}


/**
 * 
 * @description
 * 
 * Counter Observer Type
 * 
 */
type CounterObserver = {
  update: (state: CounterStateType) => void;
}


/**
 * 
 * @description
 * 
 * Create a Button More Observer
 * 
 */
export function createButtonMoreObserver(
  buttonMore: HTMLButtonElement
): CounterObserver{

  let isDisable: boolean = false;
  
  function update(state: CounterStateType): void{
    enable_and_disable_button(state);
  }

  function enable_and_disable_button(state: CounterStateType): void{

    if(state.counter >= 10){
      isDisable = true;
      buttonMore.classList.remove('_button_enable');
      buttonMore.classList.add('_button_disable');
      buttonMore.disabled = isDisable;
    }

    if(state.counter === 9){
      isDisable = false;
      buttonMore.classList.remove('_button_disable');
      buttonMore.classList.add('_button_enable');
      buttonMore.disabled = isDisable;
    }
  }

  return{
    update,
  }
}

/**
 * 
 * @description
 * 
 * Create a Button Less Observer
 * 
 */
function createButtonLessObserver(
  buttonLess: HTMLButtonElement
): CounterObserver{

  let isDisable: boolean = false;

  function update(state: CounterStateType): void{
    enable_and_disable_button(state);
  }

  function enable_and_disable_button(state: CounterStateType): void{

    if(state.counter <= -10){
      isDisable = true;
      buttonLess.classList.remove('_button_enable');
      buttonLess.classList.add('_button_disable');
      buttonLess.disabled = isDisable;
    }

    if(state.counter === -9){
      isDisable = false;
      buttonLess.classList.remove('_button_disable');
      buttonLess.classList.add('_button_enable');
      buttonLess.disabled = isDisable;
    } 
  }

  return{
    update,
  }
}

/**
 * 
 * @description
 * 
 * Create a Span Counter Observer
 * 
 */
export function createSpanCounterObserver(
  spanCounter: HTMLSpanElement,
): CounterObserver{

  function update(state: CounterStateType): void{
    updateTextCounter(state);
  }

  function updateTextCounter(state: CounterStateType): void{
    spanCounter.textContent = state.counter.toString();
  }

  return{
    update,
  }
}


/**
 * 
 * @description
 * 
 * Create a observable 
 * 
 */

type CounterObservable = {
  subscribe: (observer: CounterObserver) => void;
  notify: () => void;
  get_state: () => CounterStateType;
  handlerIncrement: () => void;
  handlerDecrement: () => void;
}

export function createCounterObservable(): CounterObservable{

  // state
  const state: CounterStateType = {
    counter: 0,
  };

  // observers
  const observers: CounterObserver[] = [];

  // subscribe observers
  function subscribe(observer: CounterObserver): void{
    observers.push(observer);
  }

  // notify observers
  function notify(): void{
    observers.forEach(observer => observer.update(state));
  }

  // get state
  function get_state(): CounterStateType{
    return state;
  }

  // increment
  function handlerIncrement(): void{
    state.counter = state.counter + 1;
    notify();
  }

  // decrement
  function handlerDecrement(): void{
    state.counter = state.counter - 1;
    notify();
  }

  return{
    subscribe,
    notify,
    get_state,
    handlerIncrement,
    handlerDecrement,
  }
}

/**
 * 
 * @description
 * 
 * Inicio del script
 * 
 */
document.addEventListener('DOMContentLoaded', () => {

  // html components
  const idButtonMore: HTMLElement | null = document.getElementById('idButtonMore');
  const idButtonLess: HTMLElement | null = document.getElementById('idButtonLess');
  const idCounter: HTMLElement | null = document.getElementById('idCounter');

  // validation node componentes
  type NodeComponentsType = HTMLElement | null;
  const nodeComponents: NodeComponentsType[] = [];
  nodeComponents.push(idButtonMore);
  nodeComponents.push(idButtonLess);
  nodeComponents.push(idCounter);

  const isOkNodeComponents = nodeComponents.some(node => node !== null);

  if(isOkNodeComponents){

    // observable - state
    const counterObservable = createCounterObservable();

    // add handler methods
    idButtonMore?.addEventListener('click', () => counterObservable.handlerIncrement());
    idButtonLess?.addEventListener('click', () => counterObservable.handlerDecrement());

    // buttonMore Observer
    const buttonMoreObserver = createButtonMoreObserver(
      idButtonMore as HTMLButtonElement, 
    );

    // buttonLess Observer
    const buttonLessObserver = createButtonLessObserver(
      idButtonLess as HTMLButtonElement,
    );

    // spanCounter Observer
    const spanCounterObserver = createSpanCounterObserver(
      idCounter as HTMLSpanElement,
    );

    // attach observers to the observable
    counterObservable.subscribe(buttonMoreObserver);
    counterObservable.subscribe(buttonLessObserver);
    counterObservable.subscribe(spanCounterObserver);
  }
});



