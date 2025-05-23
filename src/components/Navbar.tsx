
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ConnectWallet } from "./ConnectWallet";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserMenu } from "./nav/UserMenu";
import { NotificationButton } from "./nav/NotificationButton";
import { DisasterAlertButton } from "./DisasterAlertButton";

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex h-16 items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-transform hover:scale-105"
        >
          <span className="font-bold text-2xl gradient-text">FeedForward</span>
        </Link>

        <div className="flex items-center gap-4">
          <DisasterAlertButton />
          <ConnectWallet />
          <ThemeSwitcher />
          <NotificationButton />
          
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Button asChild className="hidden md:inline-flex btn-gradient animate-fade-in">
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
