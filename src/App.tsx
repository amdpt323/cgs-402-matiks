import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { SiteShell } from "@/components/site-shell"
import { ThemeProvider } from "@/components/theme-provider"

const HomePage = React.lazy(() => import("@/pages/home-page"))
const SurveyPage = React.lazy(() => import("@/pages/survey-page"))

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="cgs-402-survey-theme">
      <BrowserRouter>
        <SiteShell>
          <React.Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/survey" element={<SurveyPage />} />
            </Routes>
          </React.Suspense>
        </SiteShell>
      </BrowserRouter>
    </ThemeProvider>
  )
}