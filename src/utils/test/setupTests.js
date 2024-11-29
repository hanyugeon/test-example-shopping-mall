import '@testing-library/jest-dom';

/**
 * 모킹한 모듈의 히스토리를 초기화
 * 모든 테스트가 진행된 뒤에
 * 항상 이전에 모킹한 히스토리를 초기화하여
 * 테스트의 독립성을 보장할 수 있다.
 */
afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
});

/**
 * 브라우저가 아닌 node 환경이기때문에
 * 어쩔 수 없이 전역에서 모킹해야할 상황이 있음
 * 예를들어 matchMedia는 jsdom 환경에 존재하지 않아 에러가 발생하는 부분을
 * 테스트 실행을 위해 사전에 matchMedia를 모킹
 */
// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
