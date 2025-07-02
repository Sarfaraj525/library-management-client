import { useGetBorrowSummaryQuery } from "../redux/features/book.api";

const BorrowSummaryPage = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading)
    return <p className="text-center mt-4">Loading borrow summary...</p>;
  if (isError)
    return <p className="text-center text-red-600 mt-4">Failed to load borrow summary.</p>;

  const borrowSummary = Array.isArray(data) ? data : [];

  return (
    <div className="max-w-5xl mx-auto mt-6 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📊 Borrow Summary</h2>
      {borrowSummary.length === 0 ? (
        <p>No books have been borrowed yet.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 text-left">Title</th>
              <th className="border px-2 py-1 text-left">ISBN</th>
              <th className="border px-2 py-1 text-center">Total Quantity Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {borrowSummary.map((item) => (
              <tr key={item.isbn} className="border-t hover:bg-gray-50">
                <td className="border px-2 py-1">{item.title}</td>
                <td className="border px-2 py-1">{item.isbn}</td>
                <td className="border px-2 py-1 text-center">{item.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowSummaryPage;
