export default function dataToKey(schemaData) {
  return schemaData.reduce((schema, column) => {
    if (column.Key === "PRI") return { ...schema, [`${column.Field}`]: "PK" };
    if (column.Key === "MUL") return { ...schema, [`${column.Field}`]: "FK" };
    return schema;
  }, {});
}
