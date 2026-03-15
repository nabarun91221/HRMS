export const page = ({ camelCaseName, pascalCaseName }) => {
  return `
  
import ${pascalCaseName}ViewPage from "@/modules/${camelCaseName}/pages/${pascalCaseName}ViewPage";

const Page = () => {
  return <${pascalCaseName}ViewPage />;
};

export default Page;

        `;
};

export default page;
