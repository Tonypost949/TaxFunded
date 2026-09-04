import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaxFunded - Grants & Loans for Social Services, NGOs & CoCs",
  description: "Find federal and California tax-funded grants and historical recipient awards for social service organizations, non-profits, CoCs, victim services, legal aid, and activists.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
