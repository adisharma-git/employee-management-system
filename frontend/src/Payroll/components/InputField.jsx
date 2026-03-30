export default function InputField({ label, name, value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="number"
        min="0"
        step="0.01"
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#021f54]"
      />
    </div>
  );
}
