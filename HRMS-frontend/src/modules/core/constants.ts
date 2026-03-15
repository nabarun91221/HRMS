export enum StatusEnum {
  Active = "active",
  Inactive = "inactive",
}

export const StatusValueLabelMap = {
  [StatusEnum.Active]: "Active",
  [StatusEnum.Inactive]: "Inactive",
};

export const StatusStyles = {
  [StatusEnum.Active]:
    "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
  [StatusEnum.Inactive]:
    "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
};

export const StatusOptions = [
  {
    label: StatusValueLabelMap[StatusEnum.Active],
    value: StatusEnum.Active,
  },
  {
    label: StatusValueLabelMap[StatusEnum.Inactive],
    value: StatusEnum.Inactive,
  },
];

export enum SortEnum {
  Ascending = "asc",
  Descending = "desc",
}

export const SortValueLabelMap = {
  [SortEnum.Ascending]: "Ascending",
  [SortEnum.Descending]: "Descending",
};

export const SortOptions = [
  {
    label: SortValueLabelMap[SortEnum.Ascending],
    value: SortEnum.Ascending,
  },
  {
    label: SortValueLabelMap[SortEnum.Descending],
    value: SortEnum.Descending,
  },
];
