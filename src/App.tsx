import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SiteShell } from "@/components/site-shell";
import { ThemeProvider } from "@/components/theme-provider";
import HomePage from "@/pages/home-page";
import SurveyPage from "@/pages/survey-page";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="night-survey-theme">
      <BrowserRouter>
        <SiteShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/survey" element={<SurveyPage />} />
          </Routes>
        </SiteShell>
      </BrowserRouter>
    </ThemeProvider>
  );
}
