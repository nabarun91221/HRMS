export const page = ({ camelCaseName, pascalCaseName }) => {
  return `
  
import ${pascalCaseName}CreatePage from "@/modules/${camelCaseName}/pages/${pascalCaseName}CreatePage";

const Page = () => {
  return <${pascalCaseName}CreatePage />;
};

export default Page;

        `;
};

export default page;
