import DepartmentButtons from "./DepartmentButtons";

export const columns = (onDepartmentDelete) => [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <DepartmentButtons
        _id={row._id}
        onDepartmentDelete={onDepartmentDelete}
      />
    ),
  },
];