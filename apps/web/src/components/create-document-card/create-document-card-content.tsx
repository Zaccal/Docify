interface CreateDocumentCardContentProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function CreateDocumentCardContent({ children }: CreateDocumentCardContentProps) {
  return <div className="space-y-4">{children}</div>
}
