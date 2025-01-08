export type SynchronousParams = Promise<{ slug: string }>;
export type SynchronousSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;
