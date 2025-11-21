export default function Footer() {
  return (
    <footer
      style={{
        padding: '1rem',
        backgroundColor: '#eee',
        textAlign: 'center',
        marginTop: '2rem',
      }}
    >
      &copy; {new Date().getFullYear()} TEACHTUDORCOM
    </footer>
  );
}
