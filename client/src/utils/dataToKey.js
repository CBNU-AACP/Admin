export default function dataToKey(schemaData) {
  return schemaData.reduce((schema, column) => {
    if (column.key === "PRI") return { ...schema, [column.Field]: "PK" };
    if (column.key === "MUL") return { ...schema, [column.Field]: "FK" };
    return schema;
  }, {});
}
