import { TCommonSchema } from '../core/schema';

export type TFileSchema = {
  uploadPayload: { pdf: File };

  uploadResponse: TCommonSchema['BaseApiResponse'] & {
    data: {
      name: string;
      fileUrl: string;
      publicId: string;
    };
  };
};
