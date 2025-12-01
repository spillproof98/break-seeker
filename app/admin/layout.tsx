export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="space-y-4">{children}</section>;
}
