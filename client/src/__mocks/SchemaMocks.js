const schemaMocks = [
  {
    Field: "courseId",
    Type: "varchar(20)",
    Null: "NO",
    key: "PRI",
    Default: null,
    Extra: "",
  },
  {
    Field: "name",
    Type: "varchar(20)",
    Null: "NO",
    key: "",
    Default: null,
    Extra: "",
  },
  {
    Field: "description",
    Type: "text",
    Null: "YES",
    key: "UNI",
    Default: null,
    Extra: "",
  },
  {
    Field: "createAt",
    Type: "datetime",
    Null: "NO",
    key: "",
    Default: null,
    Extra: "",
  },
  {
    Field: "updateAt",
    Type: "datetime",
    Null: "NO",
    key: "",
    Default: null,
    Extra: "",
  },
  {
    Field: "userId",
    Type: "varchar(20)",
    Null: "NO",
    key: "MUL",
    Default: null,
    Extra: "",
  },
];

export default schemaMocks;
