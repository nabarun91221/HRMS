import PageHeader from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PasswordChange from "../components/PasswordChange";
import ProfilePage from "../components/profilePage";

export default function SettingsHomePage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Settings"
        backButton
        onBackClick={() => window.history.back()}
      />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="profile" className="space-y-6">
          <ProfilePage />
        </TabsContent>

        <TabsContent value="password" className="space-y-6">
          <PasswordChange />
        </TabsContent>
      </Tabs>
    </div>
  );
}
