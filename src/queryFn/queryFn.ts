import { request, RequestDocument, Variables } from 'graphql-request';

export interface QueryOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface QueryFnParams {
  document: RequestDocument;
  variables?: Variables;
  options?: QueryOptions;
}

export const queryFn = async ({ document, variables = {}, options = {} }: QueryFnParams) => {
  try {
    let baseUrl = process.env.NEXT_PUBLIC_URL;
    if (typeof window !== 'undefined') {
      baseUrl = window.location.origin;
    }

    const url = new URL('/api/graphql', baseUrl).toString();
    const response = await request(url as string, document, variables, {
      ...options,
    });
    return response;
  } catch (error) {
    console.error('Error in queryFn:', error);
    throw error;
  }
};

export const getNextPageParam = <T>(lastPage: T[], allPages: T[][]): number | undefined => {
  if (lastPage.length === 0) {
    return undefined;
  }
  return allPages.length;
};

export const getPreviousPageParam = <T>(firstPage: T[], allPages: T[][]): number | undefined => {
  if (allPages.length <= 1) {
    return undefined;
  }
  return allPages.length - 2;
};
