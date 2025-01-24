const InputBox = ({placeholder, label}) => {
  return (
    <label className="self-start w-full block">
      <span className="block font-medium text-left text-sm py-2">{label}</span>
      <input
      className="w-full border px-2 py-1 border-slate-200 rounded"
      placeholder={placeholder}
      />
    </label>
  )
}
export default InputBox