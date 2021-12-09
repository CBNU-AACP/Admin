const schemaMocks = [
  {
    Field: "name",
    Type: "varchar(20)",
    Null: "NO",
    key: "",
    Default: null,
    Extra: "",
  },
  {
    Field: "courseId",
    Type: "varchar(20)",
    Null: "NO",
    key: "PRI",
    Default: null,
    Extra: "",
  },
  {
    Field: "description",
    Type: "text",
    Null: "YES",
    key: "",
    Default: null,
    Extra: "UNIQUE",
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
    key: "FOR",
    Default: null,
    Extra: "UNIQUE",
  },
];

export default schemaMocks;
