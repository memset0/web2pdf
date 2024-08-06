export const fakeWindow = {};
export function getWindow() {
  if (typeof unsafeWindow !== 'undefined') {
    return unsafeWindow;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  return fakeWindow;
}
