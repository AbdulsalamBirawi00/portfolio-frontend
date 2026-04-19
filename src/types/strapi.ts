export interface StrapiResponse<T> {
  data: StrapiData<T> | StrapiData<T>[] | null;
  meta: { pagination?: StrapiPagination };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
      formats: Record<string, { url: string; width: number; height: number }>;
    };
  } | null;
}
