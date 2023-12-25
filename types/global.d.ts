declare interface PaginationParams {
  /**
   * 当前页码
   */
  page: number;
  /**
   * 每页读取条数
   */
  size: number;
}

declare interface ResponsePagination {
  /**
   * 当前页码
   */
  currentPage: number;
  /**
   * 页数
   */
  pageCount: number;
  /**
   * 每页条数
   */
  pageSize: number;
  /**
   * 总数
   */
  total: number;
}

declare interface ResponsePageList<T> extends ResponsePagination {
  items: T[];
}