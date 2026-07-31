interface DocumentFieldCardContentProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function DocumentFieldCardContent({ children }: DocumentFieldCardContentProps) {
  return <div className="space-y-4">{children}</div>
}
