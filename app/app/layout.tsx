export const metadata = {
  title: "Creovixa LMS",
  description: "Creovixa Language Services Learning Management System",
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
