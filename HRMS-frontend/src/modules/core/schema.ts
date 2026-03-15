import { SortEnum, StatusEnum } from "./constants";

export type TCommonSchema = {
  // PaginatedMetaResponse: {
  //   hasNextPage: boolean;
  //   hasPrevPage: boolean;
  //   limit: number;
  //   nextPage: number | null;
  //   page: number;
  //   pagingCounter: number;
  //   prevPage: number | null;
  //   totalDocs: number;
  //   totalPages: number;
  // };

  PaginationPayload: {
    limit: number;
    page: number;
    status?: StatusEnum;
    search?: string;
  };

  BaseGetAllPayload: {
    sort?: SortEnum;
  };
  BaseApiErrorResponse: {
    statusCode: number;
    message: string;
    error: string;
  };
  BaseApiResponse: {
    success: boolean;
    message: string;
  };
};
