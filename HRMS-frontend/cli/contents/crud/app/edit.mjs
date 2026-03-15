export const page = ({ camelCaseName, pascalCaseName }) => {
  return `
  
import ${pascalCaseName}EditPage from "@/modules/${camelCaseName}/pages/${pascalCaseName}EditPage";

const Page = () => {
  return <${pascalCaseName}EditPage />;
};

export default Page;

        `;
};

export default page;
