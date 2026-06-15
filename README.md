# Zycel: AI-Powered Non-Invasive Cardiovascular & Lipid Screening

Zycel is an investor-ready, professional medical technology web platform designed to demonstrate non-invasive blood lipid risk screening using **Laser Speckle Contrast Imaging (LSCI)** and machine learning.

The platform processes dynamic microvascular perfusion signals captured from skin layers, extracts physiological metrics, and executes predictive scikit-learn regression models to classify cardiovascular risks into **Low**, **Moderate**, and **High Risk** categories.

---

## 🔬 Scientific & Optical Foundation

Coherent laser light (785nm near-infrared) illuminating dermal tissue backscatters to generate a random interference **speckle pattern**. As red blood cells circulate in the capillary beds, they fluctuate this interference, causing focal blurring on a micro-CCD sensor.

By computing the speckle contrast ($K = \sigma_I / \langle I \rangle$), the system measures capillary blood velocity profiles. Zycel extracts two primary waveforms from this capture:
1. **SPG (Speckle Plethysmography)**: Resolves slow vasomotor oscillations (0.01 - 0.15 Hz) reflecting vascular compliance.
2. **NIR-iPPG (Near-Infrared Imaging Photoplethysmography)**: Resolves pulsatile volume changes in underlying arterioles (0.5 - 4.0 Hz) reflecting direct heartbeat cycles.

---

## ⚙️ The 8-Step Processing Pipeline

1. **Loading LSCI Video**: Resolves uncompressed backscatter frames.
2. **Detecting ROI**: Establishes spatial boundaries to isolate capillary blood flow channels.
3. **Extracting Physiological Signals**: Separates temporal intensity fluctuations from static tissue boundaries.
4. **Generating SPG Waveform**: Computes slow vasomotion velocity metrics.
5. **Generating NIR-iPPG Waveform**: Resolves volumetric heart pulse wave shapes.
6. **Extracting Features**: Calculates time-frequency characteristics (Sample Entropy, Approximate Entropy).
7. **Running AI Models**: Feeds features and patient BMI into trained regression models.
8. **Generating Risk Report**: Maps scores against NCEP ATP-III criteria to classify TG, LDL, HDL, AIP, and HR risks.

---

## 🏗️ Commercial MedTech Architecture

Zycel is architected to transition from a prototype simulation into a production cardiovascular screening endpoint:

```
[ Next.js Client App (Tailwind CSS v4) ]
                   │
                   ▼ (Secure JSON Request)
[ Server API Route: /api/predict ]
                   │
                   ▼ (REST / Child Process Execution)
[ Local Python Script / FastAPI Microservice ]
                   │
                   ▼ (Inference Load)
[ Trained ML Models: Ridge / HistGradientBoosting (joblib) ]
                   │
                   ▼ (Reference Check)
[ NCEP ATP-III Risk Boundaries & Mappings ]
```

---

## 💻 Local Setup & Development

### 1. Requirements
* Node.js v18.0 or higher
* npm v9.0 or higher

### 2. Installation
Clone the repository and install npm packages:
```bash
git clone https://github.com/palitakaewsena-sudo/LSCI_Website.git
cd LSCI_Website
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the interactive console.

---

## 🚀 One-Click Vercel Deployment

Zycel is fully optimized for hosting on **Vercel**:

1. **Import Project**: Log into the [Vercel Dashboard](https://vercel.com) and import the repository: `https://github.com/palitakaewsena-sudo/LSCI_Website.git`
2. **Environment Variables**:
   If linking to an external FastAPI backend in production, define the API endpoint url:
   * `NEXT_PUBLIC_API_URL` = `https://your-fastapi-backend.com`
3. **Deploy**: Click **Deploy**. Vercel will build the static routes and serverless API functions automatically.

*Note: The Next.js API route `/api/predict` handles local child-process Python execution when running on local machines, and automatically falls back to high-fidelity client-side deterministic simulations when deployed to Serverless cloud environments like Vercel.*
