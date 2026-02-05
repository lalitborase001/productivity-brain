export const metadata: Metadata = {
  title: "Personal Productivity Brain",
  description: "AI-powered productivity app with generative UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}