
import {BehaviorSubject} from 'rxjs';

//Creating observables
//If the value exists in local storage, get it. Else, set the value to 0 (total price) or an empty string (order id).
export const totalPrice$ = new BehaviorSubject(window.localStorage.getItem("total-price") || 0);
export const orderId$ = new BehaviorSubject(window.localStorage.getItem("order-id") || '');

export function newTotalPrice(price) {
  //Storing total price in local storage
  //If the new price is null, remove total-price from local storage
  if (!price) {
    window.localStorage.removeItem('total-price');
  } else {
    window.localStorage.setItem('total-price', price); //Local storage only accepts strings!
  }

  //Updating observable
  totalPrice$.next(price);

  //console.log('Price in newTotalPrice:');
  //console.log(price);
}

export function newOrderId(id) {
  if (!id) {
    window.localStorage.removeItem('order-id');
  } else {
    window.localStorage.setItem('order-id', id); //Local storage only accepts strings!
  }

  //Updating observable
  orderId$.next(id);

  //console.log('id in newOrderId:');
  //console.log(id);
}
