// TODO: Implement with real data for CIT-U ETEEAP business.

export function Footer() {
  return (
    <footer className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
      <div className="container mx-auto px-4 md:px-8">
        {/* Lower section: Copyright */}
        <div className=" text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            Expanded Tertiary Education Equivalency Accreditation (ETEEAP)
            Program, Cebu Institute of Technology - University
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} KARS Stack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
