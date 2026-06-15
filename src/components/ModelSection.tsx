import React from "react";
import { Cpu, ArrowRight, FolderKanban, Terminal } from "lucide-react";

export default function ModelSection() {
  const pipelineFlow = [
    {
      step: "1. LSCI Video Capture",
      desc: "Captures 20 FPS raw speckle contrast intensity backscatter over a 15-second duration.",
    },
    {
      step: "2. Waveform Extraction",
      desc: "Resolves SPG (capillary flow) and iPPG (arteriole pulse volume) waveforms.",
    },
    {
      step: "3. Feature Generation",
      desc: "Calculates entropy dynamics and frequency-domain density peaks, incorporating patient BMI.",
    },
    {
      step: "4. AIP Risk Prediction",
      desc: "Ensemble Ridge & Histogram Gradient Boosting models classify risk levels against clinical bands.",
    },
  ];

  const modelLocals = [
    { name: "hdl_c", type: "Random Forest Regressor", file: "trained_model.joblib" },
    { name: "ldl_c", type: "Gradient Boosting Regressor", file: "trained_model.joblib" },
    { name: "sdldl_c", type: "Extra Trees Regressor", file: "trained_model.joblib" },
    { name: "total_cholesterol", type: "Ridge Linear Regression", file: "trained_model.joblib" },
    { name: "triglyceride", type: "Hist Gradient Boosting", file: "trained_model.joblib" },
  ];

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-8 text-slate-900">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <Cpu className="w-6 h-6 text-sky-500" />
          <span>Zycel AI Model Architecture</span>
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          The platform predicts cardiovascular and lipid risk categories by processing raw speckle backscatter frames into time-frequency features, executing them against serialized regressors locally.
        </p>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {pipelineFlow.map((node, idx) => (
          <div key={node.step} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between space-y-2 relative">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
                {node.step}
              </span>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{node.desc}</p>
            </div>
            {idx < 3 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-1 text-slate-400 shadow-sm">
                <ArrowRight className="w-3 h-3" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Model Registry Path Information */}
      <div className="border-t border-slate-200 pt-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="space-y-4 lg:w-1/2">
            <h4 className="text-sm font-bold text-slate-950 flex items-center space-x-1.5">
              <FolderKanban className="w-4 h-4 text-sky-500" />
              <span>Model Registry Directory structure</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Serialized regression pipelines are stored as binary workspaces. The Next.js API service endpoint connects securely to locally hosted Python workers to retrieve inference telemetry:
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 overflow-x-auto text-[11px] font-mono text-emerald-400 space-y-1 leading-snug shadow-inner">
              <span className="text-slate-500"># Local python model registry paths:</span>
              <div>Lipid_Signal_VS_Code/lipid_model_training/models/</div>
              <div className="pl-4">├── hdl_c/           ← trained_model.joblib & metadata.joblib</div>
              <div className="pl-4">├── ldl_c/           ← trained_model.joblib & metadata.joblib</div>
              <div className="pl-4">├── sdldl_c/         ← trained_model.joblib & metadata.joblib (used for AIP estimation)</div>
              <div className="pl-4">├── total_cholesterol/</div>
              <div className="pl-4">└── triglyceride/</div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full space-y-4">
            <h4 className="text-sm font-bold text-slate-950 flex items-center space-x-1.5">
              <Terminal className="w-4 h-4 text-teal-500" />
              <span>Registry Reference Table</span>
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs bg-white">
              <table className="w-full text-left">
                <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Target Profile</th>
                    <th className="p-3">Best Model Architecture</th>
                    <th className="p-3">Deployment File</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600 font-mono">
                  {modelLocals.map((m) => (
                    <tr key={m.name} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-800 font-sans">{m.name}</td>
                      <td className="p-3">{m.type}</td>
                      <td className="p-3 text-emerald-600">{m.file}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
