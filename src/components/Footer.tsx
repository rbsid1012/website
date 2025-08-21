import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg alpha-pulse flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">α1</span>
              </div>
              <span className="text-xl font-bold alpha-gradient-text">ALPHA 1</span>
            </div>
            <p className="text-muted-foreground text-sm">
              The future of contactless interaction. Experience seamless NFC technology with the ALPHA 1 smart bracelet.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <div className="space-y-2 text-sm">
              <Link to="/product" className="text-muted-foreground hover:text-primary transition-colors block">
                Features
              </Link>
              <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors block">
                Technology
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors block">
                FAQ
              </Link>
            </div>
          </div>

          {/* Access */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Access</h3>
            <div className="space-y-2 text-sm">
              <Link to="/join-waitlist" className="text-muted-foreground hover:text-primary transition-colors block">
                Join Waitlist
              </Link>
              <Link to="/creator-access" className="text-muted-foreground hover:text-primary transition-colors block">
                Creator Access
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="space-y-2 text-sm">
              <a href="mailto:modnexsolutions@gmail.com" className="text-muted-foreground hover:text-primary transition-colors block">
                modnexsolutions@gmail.com
              </a>
              <div className="text-muted-foreground">
                Building the future, one pulse at a time.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Cosmic Attire. All rights reserved. Redefining interaction.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;