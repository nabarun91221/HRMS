export const page = ({ pascalCaseName }) => {
  return `
export enum ${pascalCaseName}QueryKeysEnum {
  update${pascalCaseName} = "update${pascalCaseName}",
  get${pascalCaseName} = "get${pascalCaseName}",
}
        `;
};

export default page;
