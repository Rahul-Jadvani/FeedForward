
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Wallet, History, ArrowUp, ArrowDown, Users, Award, Coins, RefreshCw, Send } from "lucide-react";

// Mock transaction data
interface Transaction {
  id: string;
  type: "earned" | "spent" | "received";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export default function WalletPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("balance");
  const [isLoading, setIsLoading] = useState(true);
  const [feedCoinBalance, setFeedCoinBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to view your wallet",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate, toast]);

  // Fetch wallet data
  useEffect(() => {
    if (isAuthenticated) {
      // Mock API call to fetch wallet data
      setTimeout(() => {
        setFeedCoinBalance(350);
        setTransactions([
          {
            id: "tx-001",
            type: "earned",
            amount: 50,
            description: "Donation: Corporate Lunch Leftovers",
            date: "2025-04-23",
            status: "completed"
          },
          {
            id: "tx-002",
            type: "earned",
            amount: 30,
            description: "Achievement: First-Time Donor",
            date: "2025-04-20",
            status: "completed"
          },
          {
            id: "tx-003",
            type: "earned",
            amount: 100,
            description: "Weekly bonus: Top Donor",
            date: "2025-04-18",
            status: "completed"
          },
          {
            id: "tx-004",
            type: "spent",
            amount: 200,
            description: "Reward: Eco-Friendly Water Bottle",
            date: "2025-04-15",
            status: "completed"
          },
          {
            id: "tx-005",
            type: "received",
            amount: 75,
            description: "Transfer from Community Fund",
            date: "2025-04-10",
            status: "completed"
          }
        ]);
        setIsLoading(false);
      }, 1200);
    }
  }, [isAuthenticated]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Mock refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Wallet refreshed",
        description: "Your wallet information is up to date",
      });
    }, 1000);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earned":
        return <ArrowDown className="h-4 w-4 text-ff-green" />;
      case "spent":
        return <ArrowUp className="h-4 w-4 text-ff-orange" />;
      case "received":
        return <Users className="h-4 w-4 text-ff-yellow" />;
      default:
        return <History className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "earned":
        return "text-ff-green";
      case "spent":
        return "text-ff-orange";
      case "received":
        return "text-ff-yellow";
      default:
        return "";
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">FeedCoin Wallet</h1>
          <p className="text-muted-foreground">Manage your impact rewards</p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/marketplace')}
          >
            <Award className="h-4 w-4 mr-1" />
            Marketplace
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="md:col-span-2">
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle>FeedCoin Balance</CardTitle>
              <CardDescription>Your current earning and spending power</CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-ff-green/20 flex items-center justify-center">
                      <Coins className="h-8 w-8 text-ff-green" />
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-bold">{feedCoinBalance} FC</div>
                      <div className="text-sm text-muted-foreground">FeedCoin Balance</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <Button className="btn-gradient">
                      <Award className="mr-2 h-4 w-4" />
                      Redeem Rewards
                    </Button>
                    <Button variant="outline">
                      <Send className="mr-2 h-4 w-4" />
                      Send FeedCoins
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6 animate-fade-in" style={{animationDelay: "0.1s"}}>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent FeedCoin activity</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8">
                  <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p>No transactions yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start donating or claiming food to earn FeedCoins
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">{transaction.date}</div>
                        </div>
                      </div>
                      <div className={`font-bold ${getTransactionColor(transaction.type)}`}>
                        {transaction.type !== "spent" ? "+" : "-"}{transaction.amount} FC
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" size="sm" className="w-full">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right column */}
        <div>
          <Card className="animate-fade-in" style={{animationDelay: "0.2s"}}>
            <CardHeader>
              <CardTitle>Earning Opportunities</CardTitle>
              <CardDescription>Ways to increase your FeedCoin balance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md hover:bg-muted transition-colors">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Donate Food</div>
                  <Badge variant="outline" className="bg-ff-green/20 text-ff-green">
                    +30-100 FC
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Create FoodFlags for surplus food
                </p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Donate Now
                </Button>
              </div>
              
              <div className="p-4 border rounded-md hover:bg-muted transition-colors">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Refer Friends</div>
                  <Badge variant="outline" className="bg-ff-yellow/20 text-ff-yellow">
                    +50 FC
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  For each friend who joins and donates
                </p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Invite Friends
                </Button>
              </div>
              
              <div className="p-4 border rounded-md hover:bg-muted transition-colors">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Complete Achievements</div>
                  <Badge variant="outline" className="bg-ff-orange/20 text-ff-orange">
                    +25-200 FC
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Unlock badges and earn rewards
                </p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View Achievements
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 animate-fade-in" style={{animationDelay: "0.3s"}}>
            <CardHeader>
              <CardTitle>FeedCoin Details</CardTitle>
              <CardDescription>About your impact tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">FeedCoin Rate</span>
                <span>1 FC ≈ $0.10 USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Earned</span>
                <span>550 FC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Spent</span>
                <span>200 FC</span>
              </div>
              <Separator />
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">About FeedCoins</h4>
                <p className="text-sm text-muted-foreground">
                  FeedCoins are rewards for your positive impact on food waste reduction. 
                  They can be redeemed for products, services, or donated to causes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
