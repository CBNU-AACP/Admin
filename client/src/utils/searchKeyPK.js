/* eslint-disable no-param-reassign */
export default function searchKeyPK(schemaKey) {
  let searchPK = "";
  Object.keys(schemaKey).forEach(i => {
    if (schemaKey[i] === "PK") searchPK = i;
  });
  return searchPK;
}
