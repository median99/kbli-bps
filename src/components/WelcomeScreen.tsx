import { Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const WelcomeScreen = ({ onSendMessage, isLoading }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
      <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">
          Selamat Datang!
        </h2>
        <p className="text-lg text-muted-foreground max-w-md">
          Tanya saya tentang Klasifikasi Baku Lapangan Usaha Indonesia (KBLI), 
          Klasifikasi Baku Jenis Pekerjaan Indonesia (KBJI), atau kode-kode SAKERNAS lainnya.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mt-8">
        <button
          onClick={() => onSendMessage("Apa itu KBLI 2020?")}
          className="p-4 text-left rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
          disabled={isLoading}
        >
          <p className="font-medium text-sm text-foreground">
            Apa itu KBLI 2020?
          </p>
        </button>
        <button
          onClick={() => onSendMessage("Jelaskan kode industri pengolahan")}
          className="p-4 text-left rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
          disabled={isLoading}
        >
          <p className="font-medium text-sm text-foreground">
            Jelaskan kode industri pengolahan
          </p>
        </button>
        <button
          onClick={() => onSendMessage("Apa saja kategori KBJI 2014?")}
          className="p-4 text-left rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
          disabled={isLoading}
        >
          <p className="font-medium text-sm text-foreground">
            Apa saja kategori KBJI 2014?
          </p>
        </button>
        <button
          onClick={() => onSendMessage("Cari kode untuk perdagangan eceran")}
          className="p-4 text-left rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
          disabled={isLoading}
        >
          <p className="font-medium text-sm text-foreground">
            Cari kode untuk perdagangan eceran
          </p>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;