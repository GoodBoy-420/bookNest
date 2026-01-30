const Footer = () => {
  return (
    <footer className="mt-auto border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © 2026 BookNest. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <span className="cursor-pointer hover:text-primary">Privacy</span>
          <span className="cursor-pointer hover:text-primary">Terms</span>
          <span className="cursor-pointer hover:text-primary">Support</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
