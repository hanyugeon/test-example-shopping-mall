import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// my-class란 class가 항상 적용된 컴포넌트를 렌더링
// beforeEach(async () => {
//   await render(<TextField className="my-class" />);
// });

it('className을 prop으로 설정한 css class가 적용된다.', async () => {
  /**
   * Arrange - 테스트를 위한 환경 만들기
   * -> className을 지닌 컴포넌트 렌더링
   * Act - 태스트할 동작 발생
   * -> 렌더링에 대한 검증이기 때문에 이 단계는 생략
   * -> 클릭이나 메서드 호출, prop 변경 등등에 대한 작업이 여기에 해당
   * Assert - 올바른 동작이 실행되었는지 검증
   * -> 렌더링 후 DOM에 해당 class가 존재하는지 검증
   */

  /**
   * render API를 호출 -> 테스트 환경 jsDOM에 리액터 컴포넌트가 렌더링된 DOM 구조가 반영
   * jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 구현
   */
  await render(<TextField className="my-class" />);

  // vitest의 expect 함수를 사용하여 기대 결과를 검증
  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  );

  /**
   * className이란 내부 prop이나 state값을 검증 (X)
   * 렌더링되는 DOM 구조가 올바르게 변경되었는지 확인 (O) -> 최종적으로 사용자가 보는 결과는 DOM
   */
});

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // screen.debug();

    expect(textInput).toBeInTheDocument();
    // 단언(assertion) -> 테스트가 통과하기 위한 조건 -> 검증 실행

    // +a) vitest는 toBeInTheDocument() 처럼 DOM과 관련된 Matcher는 존재하지 않는다!
    // setupTest.js에서 jest-dom을 import하여 Matcher를 확장한 것임.
    // toHaveClass(), toBeInTheDocument(), ... 를 통해 편리하게 단언할 수 있게 됨.
  });

  it('placeholder prop에 따라 placeholder가 변경 된다.', async () => {
    await render(<TextField placeholder={'상품명을 입력해 주세요.'} />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    // screen.debug();

    expect(textInput).toBeInTheDocument();
  });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn(); // 스파이 함수
  // 스파이 함수: 테스트 코드에서 특정 함수가 호출되었는지, 함수의 인자로 어떤것이 넘어왔는지 등 다양한 값들을 저장

  const { user } = await render(<TextField onChange={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'text');

  expect(spy).toHaveBeenCalledWith('text');
});

it('텍스트를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();

  const { user } = await render(<TextField onEnter={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'text{Enter}');

  expect(spy).toHaveBeenCalledWith('text');
});

it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  // 포커스 활성화
  // tab키를 활용해 Input 요소로 포커스 이동
  // Input 요소를 클릭했을 때
  // textInput.focus()로 직접 발생
  const spy = vi.fn();

  const { user } = await render(<TextField onFocus={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);
  // click과 연관 -> focus, mousedown, mouseup 등...

  expect(spy).toHaveBeenCalledWith();
});

it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(textInput).toHaveStyle({
    borderWidth: 2,
    borderColor: 'rgb(25, 118, 210)',
  });
});
