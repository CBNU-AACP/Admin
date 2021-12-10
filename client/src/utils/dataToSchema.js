export default function dataToSchema(schemaData) {
  return schemaData.reduce(
    (schema, attribute) => ({ ...schema, [attribute.Field]: "" }),
    [],
  );
}
