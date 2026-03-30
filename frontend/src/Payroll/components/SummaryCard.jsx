export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold text-[#021f54] mt-1">{value}</p>
    </div>
  );
}
