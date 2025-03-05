
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Phone, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [paymentMethod, setPaymentMethod] = useState<'airtel' | 'mtn' | 'card' | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get('transaction_id');
  const amount = searchParams.get('amount');
  
  useEffect(() => {
    if (transactionId) {
      fetchPaymentDetails();
    }
  }, [transactionId]);
  
  const fetchPaymentDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('transaction_id', transactionId)
        .single();
        
      if (error) throw error;
      setPaymentData(data);
      
      // Check if payment is already completed
      if (data.status === 'COMPLETED' || data.status === 'SUCCESSFUL') {
        setStatus('success');
      } else if (data.status === 'FAILED') {
        setStatus('failed');
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
      toast.error("Impossible de récupérer les détails du paiement");
    }
  };
  
  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Veuillez sélectionner une méthode de paiement");
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real-world scenario, this would connect to a real payment gateway
      // For this demo, we'll simulate a payment process
      
      let endpointName = '';
      
      switch (paymentMethod) {
        case 'airtel':
          endpointName = 'airtel-money';
          break;
        case 'mtn':
          endpointName = 'mtn-momo';
          break;
        case 'card':
          endpointName = 'card-payment';
          break;
      }
      
      // For demo purposes, we'll use a timeout to simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment 80% of the time
      const isSuccessful = Math.random() > 0.2;
      
      if (isSuccessful) {
        // Update payment status in the database
        const { error } = await supabase
          .from('payments')
          .update({ 
            status: 'COMPLETED',
            updated_at: new Date().toISOString()
          })
          .eq('transaction_id', transactionId);
          
        if (error) throw error;
        
        setStatus('success');
        toast.success("Paiement réussi !");
      } else {
        throw new Error("Échec de la simulation de paiement");
      }
    } catch (error) {
      console.error('Payment error:', error);
      setStatus('failed');
      toast.error("Échec du paiement. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleRetry = () => {
    setStatus('pending');
    setPaymentMethod(null);
  };
  
  const navigateToResults = () => {
    navigate('/dashboard/results');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12 pt-24">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">Paiement</h1>
          
          {status === 'pending' && (
            <Card>
              <CardHeader>
                <CardTitle>Finaliser votre achat</CardTitle>
                <CardDescription>
                  Rapport d'orientation personnalisé
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant</span>
                    <span className="font-semibold">{amount || '3500'} FC</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm font-medium">Choisissez une méthode de paiement</p>
                  
                  <div 
                    className={`border rounded-lg p-3 flex items-center cursor-pointer hover:bg-gray-50 transition-colors
                      ${paymentMethod === 'airtel' ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => setPaymentMethod('airtel')}
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <Phone className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Airtel Money</p>
                      <p className="text-sm text-gray-500">Payer avec votre compte Airtel</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-3 flex items-center cursor-pointer hover:bg-gray-50 transition-colors
                      ${paymentMethod === 'mtn' ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => setPaymentMethod('mtn')}
                  >
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <Phone className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-medium">MTN Mobile Money</p>
                      <p className="text-sm text-gray-500">Payer avec votre compte MTN</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-3 flex items-center cursor-pointer hover:bg-gray-50 transition-colors
                      ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <CreditCard className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Carte bancaire</p>
                      <p className="text-sm text-gray-500">Visa, Mastercard, etc.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handlePayment}
                  disabled={!paymentMethod || loading}
                >
                  {loading ? "Traitement en cours..." : "Payer maintenant"}
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {status === 'success' && (
            <Card>
              <CardHeader className="text-center pb-0">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle>Paiement réussi !</CardTitle>
                <CardDescription>
                  Votre paiement a été traité avec succès
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Numéro de transaction</span>
                      <span className="font-mono font-medium">{transactionId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Montant</span>
                      <span className="font-medium">{amount || '3500'} FC</span>
                    </div>
                  </div>
                  
                  <p className="text-center text-sm text-gray-600">
                    Vous pouvez maintenant accéder à votre rapport complet d'orientation
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={navigateToResults}>
                  Voir mon rapport complet
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {status === 'failed' && (
            <Card>
              <CardHeader className="text-center pb-0">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle>Échec du paiement</CardTitle>
                <CardDescription>
                  Votre paiement n'a pas pu être traité
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-center text-sm text-gray-600 mb-4">
                  Nous n'avons pas pu traiter votre paiement. Veuillez vérifier vos informations et réessayer.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleRetry}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Réessayer
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
