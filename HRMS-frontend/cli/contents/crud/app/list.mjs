export const page = ({ camelCaseName, pascalCaseName }) => {
  return `
  
import ${pascalCaseName}ListPage from "@/modules/${camelCaseName}/pages/${pascalCaseName}ListPage";

const Page = () => {
  return <${pascalCaseName}ListPage />;
};

export default Page;

        `;
};

export default page;
