import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Camera, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ResultCard from "../components/results/ResultCard";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="px-5 pt-6">
        <div className="flex flex-col items-center py-20 text-center">
          <div className="h-16 w-16 rounded-3xl bg-muted flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">No Results Yet</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            Scan a pill bottle or prescription to see medication analysis and interaction warnings.
          </p>
          <Link to="/Capture">
            <Button className="rounded-2xl h-12 px-6 gap-2 bg-primary hover:bg-primary/90">
              <Camera className="w-5 h-5" />
              Start Scanning
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/Capture")}
          className="h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Analysis Results</h1>
          <p className="text-xs text-muted-foreground">Review medication interactions</p>
        </div>
      </div>

      {/* Result Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <ResultCard result={result} />
      </motion.div>

      {/* Bottom Actions */}
      <div className="flex gap-3 mt-6 pb-4">
        <Link to="/Capture" className="flex-1">
          <Button variant="outline" className="w-full h-12 rounded-2xl gap-2">
            <Camera className="w-4 h-4" />
            Scan Another
          </Button>
        </Link>
        <Link to="/Medications" className="flex-1">
          <Button className="w-full h-12 rounded-2xl gap-2 bg-primary hover:bg-primary/90">
            <Pill className="w-4 h-4" />
            My Medications
          </Button>
        </Link>
      </div>
    </div>
  );
}