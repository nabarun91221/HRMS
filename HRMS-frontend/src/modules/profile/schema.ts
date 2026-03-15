export type TProfileSchema = {
  UploadDocumentsPayload: {
    documents: {
      name: string;
      fileUrl: string;
      publicId: string;
    }[];
  };
};
