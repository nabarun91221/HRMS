export const page = ({ camelCaseName, pascalCaseName }) => {
  return `
  
import ${pascalCaseName}CmsPage from "@/modules/${camelCaseName}/pages/${pascalCaseName}CmsPage";

const Page = () => {
  return <${pascalCaseName}CmsPage />;
};

export default Page;

        `;
};

export default page;
