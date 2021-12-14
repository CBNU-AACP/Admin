/* eslint-disable no-param-reassign */
export default function deleteId(data) {
  return data.map(element => {
    element = { ...element }; // 깊은 복사
    delete element.id;
    return element;
  });
}
