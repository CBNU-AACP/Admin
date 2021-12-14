export default function dataToKey(schemaData) {
  const FK = [];
  const schema = schemaData.reduce((schema, column) => {
    if (column.Key === "PRI") return { ...schema, [`${column.Field}`]: "PK" };
    if (column.Key === "MUL") FK.push(column.Field);
    return schema;
  }, {});
  return { ...schema, FK: [...FK] };
}
