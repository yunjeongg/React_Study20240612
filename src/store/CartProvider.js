import React, { useReducer, useState } from 'react';
import CartContext from './cart-context';

const defaultState = {
  items: [], // 장바구니 배열
  // ~배열, 결재상태배열, ... 등등
};

// reducer: 여러가지 복잡한 상태관리를 단순화시키며 중앙집중화한다.
// 리듀서 함수 정의
// state: 업데이트 이전의 상태값
// action: 어떤 업데이트를 하는지 정보와 업데이트에 필요한 값을 가진 객체
const cartReducer = (state, action) => {

  console.log('action', action);
  console.log('업데이트 이전 상태', state);

  if (action.type === 'ADD') { // 장바구니 추가
    // 상태 업데이트 코드
    return { // 새로운 상태
      items: [...state.items, action.value] // 기존것 + 새 아이템 붙이기
    };
  } else if (action.type === 'REMOVE') { // 장바구니 제거

    return null; // 새로운 상태
  } 
  return defaultState; // 새로운 상태
};

const CartProvider = ({ children }) => {

  // Reducer 을 사용하여 상태데이터를 업데이트
  // param1 : Reducer 함수
  // param2 : 초기 상태값
  // return1 : 상태객체를 사용할 수 있는 변수
  // return2 : 상태업데이트를 위한 액션을 취하는 함수
  //const [return1, return2] = useReducer(param1, param2);

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);


  const addItemHandler = item => {
    console.log("장바구니에 데이터 추가 -", item);

    // 액션함수는 지금 어떤 상태를 업데이트할지에 대한 액션이름과 값을 객체로 전달
    // 이 객체는 reducer 함수의 2번째 파라미터인 action 에 전달됨!
    dispatchCartAction({
      type: 'ADD', // 'ADD 임의로 짓기'
      value: item
    });
  }

  // Provider가 실제로 관리할 상태들의 구체적인 내용들
  const cartContext = {
    cartItems: cartState.items, // 상태값
    addItem: addItemHandler,
    removeItem: id => {}, // 상태를 업데이트하는 함수
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;