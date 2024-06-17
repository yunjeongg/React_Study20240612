import React, { useState } from 'react';
import styles from './AddUsers.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/Modal/ErrorModal';

const AddUsers = ({ onAddUser }) => {

  // 에러 상태관리 (에러제목, 에러내용)
  const [error, setError] = useState(null); // 처음엔 객체가 없는 상태

  const [userValue, setUserValue] = useState({ // 사용자이름과 사용자나이 관리
    username: '', 
    age: '', 
  });

  const usernameChangeHandler = (e) => {
    setUserValue((prevUserValue) => ({ // 이전값 가져오고 username만 수정
      ...prevUserValue,
      username: e.target.value,
    }));
  };

  const ageChangeHandler = (e) => {
    setUserValue((prevUserValue) => ({ // 이전값 가져오고 age만 수정
      ...prevUserValue,
      age: e.target.value,
    }));
  };

  const userSubmitHandler = (e) => {
    e.preventDefault();

    // 입력값 검증
    if (userValue.username.trim() === '' || userValue.age.trim() === '') {
      setError({
        title: '유효하지 않은 입력값입니다.',
        message: '입력값은 공백으로 작성하면 안됩니다.'
      });
      return; // 이름과 나이가 빈칸이면 return
    }

    if (+userValue.age < 1) {
      setError({
        title: '유효하지 않은 나이범위입니다.',
        message: '나이는 0이나 음수가 될 수 없습니다.'
      });
      return;
    }

    onAddUser(userValue);

    setUserValue({ // 초기화
      username: '',
      age: '',
    });
  };

  // 하위 컴포넌트 ErrorModal 에게 모달을 닫는 조건을 수행하는 함수를 전달
  const modalCloseHandler = () => {
    setError(null);
  }

  return (
    <> 
      { error && <ErrorModal title={error.title} message={error.message} onClose={modalCloseHandler} /> }

      <Card className={styles.input}>
        <form onSubmit={userSubmitHandler}>
          <label htmlFor="username">이름</label>
          <input
            id="username"
            type="text"
            onChange={usernameChangeHandler}
            value={userValue.username}
          />
          <label htmlFor="age">나이</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={userValue.age}
          />
          <Button type="submit">가입하기</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUsers;

