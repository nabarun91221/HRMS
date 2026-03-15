import { useAuth } from "@/components/auth-handler";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { AcceptedAllFileTypesMimeTypes } from "@/lib/constants";
import { downloadFile } from "@/lib/utils";
import { useGetUserProfile } from "@/modules/auth/hooks";
import { useUploadFile } from "@/modules/fileHandle/hooks";
import { fileSchema } from "@/utils/zod";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import { toast } from "sonner";
import { useUploadEmployeeDocuments } from "../hooks";
import { TProfileSchema } from "../schema";

const EmployeeDocumentsPage = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();

  const [uploadedDocs, setUploadedDocs] = useState<
    TProfileSchema["UploadDocumentsPayload"]["documents"]
  >([]);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const { mutate: uploadFile, isPending: isFileUploadPending } =
    useUploadFile();
  const {
    mutate: uploadEmployeeDocuments,
    isPending: isEmployeeDocumentsUploadPending,
  } = useUploadEmployeeDocuments();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (file) {
      const result = fileSchema("document").safeParse(file);
      if (!result.success) {
        toast.error(result.error.issues?.[0].message);
        return;
      }

      uploadFile(
        { pdf: file },
        {
          onSuccess: (data) => {
            setUploadedDocs((prev) => {
              return [
                ...prev,
                {
                  name: data.name,
                  fileUrl: data.fileUrl,
                  publicId: data.publicId,
                },
              ];
            });
          },
          onError: () => {
            toast.error("Error uploading file");
          },
        },
      );
    }
  };

  const { mutate: getUserProfile, isPending: isUserProfilePending } =
    useGetUserProfile();
  const onFileSubmit = () => {
    uploadEmployeeDocuments(
      {
        documents: uploadedDocs,
      },
      {
        onSuccess: () => {
          toast.success("Documents uploaded successfully");
          setIsUploadModalOpen(false);
          setUploadedDocs([]);
          getUserProfile(undefined, {
            onSuccess: (res) => {
              setLoggedInUser(res.data?.user);
            },
          });
        },
      },
    );
  };
  return (
    <div>
      <div className="p-4 space-y-4">
        {loggedInUser?.role === "EMPLOYEE" && (
          <div className="space-y-2">
            {loggedInUser?.employeeId?.documents?.map((doc) => (
              <Item variant={"outline"} key={doc?._id}>
                <ItemMedia variant="icon">
                  <Icon icon={"lucide:file-text"} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{doc?.name}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <Button
                    size={"icon-lg"}
                    onClick={() => {
                      downloadFile(doc?.fileUrl, doc?.name);
                    }}
                  >
                    <Icon icon={"lucide:download"} />
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </div>
        )}

        <div>
          <Button onClick={() => setIsUploadModalOpen(true)}>
            <Icon icon={"lucide:plus"} />
            Upload Document
          </Button>
        </div>
      </div>

      <AlertDialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Upload Document</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div className="max-h-[300px] space-y-2 overflow-auto ">
              {uploadedDocs?.length ? (
                uploadedDocs?.map((doc) => (
                  <Item variant={"outline"} key={doc?.publicId}>
                    <ItemMedia variant="icon">
                      <Icon icon={"lucide:file-text"} />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{doc?.name}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <Button
                        size={"icon-lg"}
                        onClick={() => {
                          setUploadedDocs((prev) =>
                            prev.filter((d) => d.publicId !== doc.publicId),
                          );
                        }}
                      >
                        <Icon icon={"lucide:x"} />
                      </Button>
                    </ItemActions>
                  </Item>
                ))
              ) : (
                <p className="text-sm text-muted-foreground pl-2">
                  No documents uploaded
                </p>
              )}
            </div>

            <Label
              className={`${buttonVariants()} ${isFileUploadPending ? "cursor-not-allowed pointer-events-none opacity-50" : ""}`}
              htmlFor="documents"
            >
              {isFileUploadPending && <Spinner />}
              Upload
            </Label>
            <Input
              id="documents"
              accept={AcceptedAllFileTypesMimeTypes.join(", ")}
              type="file"
              hidden
              onChange={onFileChange}
            />
          </div>
          <AlertDialogFooter>
            <Button
              variant={"outline"}
              onClick={() => setIsUploadModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={onFileSubmit}
              disabled={
                isUserProfilePending || isEmployeeDocumentsUploadPending
              }
            >
              {(isUserProfilePending || isEmployeeDocumentsUploadPending) && (
                <Spinner />
              )}
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmployeeDocumentsPage;
