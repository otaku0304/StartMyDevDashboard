const Footer = () => {
  return (
    <footer className="py-3 border-top header-theme">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-muted">
        <div>
          <small>
            &copy; {new Date().getFullYear()} StartMyDev Generator. All rights
            reserved.
          </small>
        </div>
        <div>
          <small>
            Made with ❤️ by{" "}
            <a
              href="https://github.com/otaku0304"
              className="text-decoration-none"
            >
              mr_ask_chay
            </a>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
