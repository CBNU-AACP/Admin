/* eslint-disable no-param-reassign */
export default function deleteKey(data, string) {
  return data.map(element => {
    element = { ...element }; // 깊은 복사
    string.forEach(key => delete element[key]);

    return element;
  });
}
