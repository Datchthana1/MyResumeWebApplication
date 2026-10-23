/* A small tag for skills / tools. Renders an <li> when used inside a list. */
export default function Pill({ children, as: Tag = "span" }) {
  return <Tag className="pill">{children}</Tag>;
}
