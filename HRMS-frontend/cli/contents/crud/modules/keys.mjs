export const page = ({ camelCaseName, pascalCaseName }) => {
  return `
export enum ${pascalCaseName}QueryKeysEnum {
  getAll${pascalCaseName} = "getAll${pascalCaseName}",
  create${pascalCaseName} = "createDelete${pascalCaseName}",
  delete${pascalCaseName} = "delete${pascalCaseName}",
  update${pascalCaseName} = "update${pascalCaseName}",
  get${pascalCaseName} = "get${pascalCaseName}",
  changeStatus = "${camelCaseName}ChangeStatus",
}
        `;
};

export default page;
