namespace api.Helpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50;
        public string SearchQuery { get; set; } = "";
        public string OrderBy { get; set; } = "Id";
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}