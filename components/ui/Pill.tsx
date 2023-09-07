export function Pill(props: { text: string; color: string }) {
  return (
    <span>
      <span
        className={`inline-flex items-center rounded-full border border-${props.color}-200 bg-${props.color}-100 px-1 py-0.5 text-xs font-medium text-${props.color}-800`}
      >
        {props.text}
      </span>
    </span>
  );
}
