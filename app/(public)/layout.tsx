export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>Public Header</header>
      <div>{children}</div>
      <footer>Public Footer</footer>
    </>
  );
}
