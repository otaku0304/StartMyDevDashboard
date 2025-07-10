const Footer = () => {
  return (
    <footer className="py-3 border-top header-theme">
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center text-muted">
        <div>
          <small>
            &copy; {new Date().getFullYear()} StartMyDev All rights
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
