const Footer = () => {
  return (
    <footer className="py-3 border-top header-theme">
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center fw-normal">
        <div>
          <small>
            &copy; {new Date().getFullYear()} StartMyDev. Licensed under the
            Apache License 2.0. All rights reserved.
          </small>
        </div>
        <div>
          <small>
            Made with ❤️ by{" "}
            <a
              href="https://www.google.com/search?q=mr_ask_chay"
              className="text-decoration-none"
              target="_blank"
              rel="noopener noreferrer"
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
