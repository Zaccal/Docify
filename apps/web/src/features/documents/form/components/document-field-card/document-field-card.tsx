interface DocumentFieldCardProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function DocumentFieldCard({ children }: DocumentFieldCardProps) {
  return <section className="bg-card mt-6 rounded-md p-4">{children}</section>
}
