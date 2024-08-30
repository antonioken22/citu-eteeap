// TODO: Implement with real data for CIT-U ETEEAP business.

export function Footer() {
  return (
    <footer className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
      <div className="container mx-auto px-4 md:px-8">
        {/* Upper section: Links and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6">
            <a
              href="/"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary"
            >
              About Us
            </a>
            <a
              href="/services"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary"
            >
              Services
            </a>
            <a
              href="/contact"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary"
            >
              Contact
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary"
            >
              {/* Replace with actual social media icon */}
              <svg width="20" height="20" fill="currentColor">
                {/* SVG for Facebook */}
              </svg>
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-primary"
            >
              {/* Replace with actual social media icon */}
              <svg width="20" height="20" fill="currentColor">
                {/* SVG for Twitter */}
              </svg>
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary"
            >
              {/* Replace with actual social media icon */}
              <svg width="20" height="20" fill="currentColor">
                {/* SVG for Instagram */}
              </svg>
            </a>
          </div>
        </div>

        {/* Lower section: Copyright */}
        <div className="border-t border-muted-foreground pt-4 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            Expanded Tertiary Education Equivalency Accreditation (ETEEAP)
            Program
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cebu Institute of Technology -
            University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
