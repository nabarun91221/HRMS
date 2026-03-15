"use client";
import PageHeader from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeDocumentsPage from "@/modules/profile/components/EmployeeDocumentsPage";

import ProfilePage from "@/modules/profile/components/profilePage";

const Profile = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Profile"
        backButton
        onBackClick={() => window.history.back()}
      />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Documents</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="profile" className="space-y-6">
          <ProfilePage />
        </TabsContent>

        <TabsContent value="password" className="space-y-6">
          {/* <PasswordChange /> */}
          <EmployeeDocumentsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
