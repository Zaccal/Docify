interface CreateDocumentCardProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function CreateDocumentCard({ children }: CreateDocumentCardProps) {
  return <section className="bg-card mt-6 rounded-md p-4">{children}</section>
}
